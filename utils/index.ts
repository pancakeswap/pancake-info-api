import BigNumber from "bignumber.js";
import { BLACKLIST } from "./constants/blacklist";

import { client } from "./apollo/client";
import { PAIR_RESERVES_BY_TOKENS, TOP_PAIRS, PAIRS_VOLUME_QUERY } from "./apollo/queries";
import { getBlockFromTimestamp } from "./blocks/queries";
import {
  PairReservesQuery,
  PairReservesQueryVariables,
  PairsVolumeQuery,
  PairsVolumeQueryVariables,
  TopPairsQuery,
  TopPairsQueryVariables,
} from "./generated/subgraph";

const TOP_PAIR_LIMIT = 1000;
export type Pair = TopPairsQuery["pairs"][number];

export interface MappedDetailedPair extends Pair {
  price: string;
  previous24hVolumeToken0: string;
  previous24hVolumeToken1: string;
}

export async function getTopPairs(): Promise<MappedDetailedPair[]> {
  const epochSecond = Math.floor(new Date().getTime() / 1000);
  const firstBlock = await getBlockFromTimestamp(epochSecond - 86400);

  if (!firstBlock) {
    throw new Error("first block was not fetched");
  }

  const {
    data: { pairs },
    errors: topPairsErrors,
  } = await client.query<TopPairsQuery, TopPairsQueryVariables>({
    query: TOP_PAIRS,
    variables: {
      limit: TOP_PAIR_LIMIT,
      excludeTokenIds: BLACKLIST,
    },
    fetchPolicy: "cache-first",
  });

  if (topPairsErrors && topPairsErrors.length > 0) {
    throw new Error("Failed to fetch top pairs from the subgraph");
  }

  const {
    data: { pairVolumes },
    errors: yesterdayVolumeErrors,
  } = await client.query<PairsVolumeQuery, PairsVolumeQueryVariables>({
    query: PAIRS_VOLUME_QUERY,
    variables: {
      limit: TOP_PAIR_LIMIT,
      pairIds: pairs.map((pair) => pair.id),
      blockNumber: +firstBlock,
    },
    fetchPolicy: "cache-first",
  });

  if (yesterdayVolumeErrors && yesterdayVolumeErrors.length > 0) {
    throw new Error(`Failed to get volume info for 24h ago from the subgraph`);
  }

  const yesterdayVolumeIndex =
    pairVolumes?.reduce<{
      [pairId: string]: { volumeToken0: BigNumber; volumeToken1: BigNumber };
    }>((memo, pair) => {
      memo[pair.id] = {
        volumeToken0: new BigNumber(pair.volumeToken0),
        volumeToken1: new BigNumber(pair.volumeToken1),
      };
      return memo;
    }, {}) ?? {};

  return (
    pairs?.map(
      (pair): MappedDetailedPair => {
        const yesterday = yesterdayVolumeIndex[pair.id];
        if (yesterday) {
          if (yesterday.volumeToken0.gt(pair.volumeToken0)) {
            throw new Error(
              `Invalid subgraph response: pair ${pair.id} returned volumeToken0 < yesterday.volumeToken0`
            );
          }
          if (yesterday.volumeToken1.gt(pair.volumeToken1)) {
            throw new Error(
              `Invalid subgraph response: pair ${pair.id} returned volumeToken1 < yesterday.volumeToken1`
            );
          }
        }

        return {
          ...pair,
          price:
            pair.reserve0 !== "0" && pair.reserve1 !== "0"
              ? new BigNumber(pair.reserve1).dividedBy(pair.reserve0).toString()
              : "0",
          previous24hVolumeToken0:
            pair.volumeToken0 && yesterday?.volumeToken0
              ? new BigNumber(pair.volumeToken0).minus(yesterday.volumeToken0).toString()
              : new BigNumber(pair.volumeToken0).toString(),
          previous24hVolumeToken1:
            pair.volumeToken1 && yesterday?.volumeToken1
              ? new BigNumber(pair.volumeToken1).minus(yesterday.volumeToken1).toString()
              : new BigNumber(pair.volumeToken1).toString(),
        };
      }
    ) ?? []
  );
}

function isSorted(tokenA: string, tokenB: string): boolean {
  return tokenA.toLowerCase() < tokenB.toLowerCase();
}

function sortedFormatted(tokenA: string, tokenB: string): [string, string] {
  return isSorted(tokenA, tokenB)
    ? [tokenA.toLowerCase(), tokenB.toLowerCase()]
    : [tokenB.toLowerCase(), tokenA.toLowerCase()];
}

// returns reserves of token a and b in the order they are queried
export async function getReserves(tokenA: string, tokenB: string): Promise<[string, string]> {
  const [token0, token1] = sortedFormatted(tokenA, tokenB);
  return client
    .query<PairReservesQuery, PairReservesQueryVariables>({
      query: PAIR_RESERVES_BY_TOKENS,
      variables: {
        token0,
        token1,
      },
    })
    .then(({ data: { pairs: [{ reserve0, reserve1 }] } }): [string, string] =>
      tokenA.toLowerCase() === token0 ? [reserve0, reserve1] : [reserve1, reserve0]
    );
}
