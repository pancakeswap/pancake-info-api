import BigNumber from "bignumber.js";
import { BLACKLIST } from "./constants/blacklist";
import { client } from "./apollo/client";
import { TOP_PAIRS, PAIRS_VOLUME_QUERY, TOKEN_BY_ADDRESS } from "./apollo/queries";
import { getBlockFromTimestamp } from "./blocks/queries";
import {
  PairsVolumeQuery,
  PairsVolumeQueryVariables,
  TokenQuery,
  TokenQueryVariables,
  TopPairsQuery,
  TopPairsQueryVariables,
} from "./generated/subgraph";

const TOP_PAIR_LIMIT = 1000;
export type Token = TokenQuery["token"];
export type Pair = TopPairsQuery["pairs"][number];

export interface MappedDetailedPair extends Pair {
  price: string;
  previous24hVolumeToken0: string;
  previous24hVolumeToken1: string;
}

export async function getTokenByAddress(address: string): Promise<Token> {
  const {
    data: { token },
    errors: tokenErrors,
  } = await client.query<TokenQuery, TokenQueryVariables>({
    query: TOKEN_BY_ADDRESS,
    variables: {
      id: address,
    },
    fetchPolicy: "cache-first",
  });

  if (tokenErrors && tokenErrors.length > 0) {
    throw new Error("Failed to fetch token from subgraph");
  }

  return token;
}

export async function getTopPairs(): Promise<MappedDetailedPair[]> {
  const epochSecond = Math.round(new Date().getTime() / 1000);
  const firstBlock = await getBlockFromTimestamp(epochSecond - 86400);

  if (!firstBlock) {
    throw new Error("Failed to fetch blocks from the subgraph");
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
    throw new Error("Failed to fetch pairs from the subgraph");
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
