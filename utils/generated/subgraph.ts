export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
}



export interface Block_Height {
  readonly hash?: Maybe<Scalars['Bytes']>;
  readonly number?: Maybe<Scalars['Int']>;
}


export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export interface Pair {
  readonly __typename?: 'Pair';
  readonly id: Scalars['ID'];
  readonly reserve0: Scalars['BigDecimal'];
  readonly reserve1: Scalars['BigDecimal'];
  readonly reserveBNB: Scalars['BigDecimal'];
  readonly reserveUSD: Scalars['BigDecimal'];
  readonly token0: Token;
  readonly token0Price: Scalars['BigDecimal'];
  readonly token1: Token;
  readonly token1Price: Scalars['BigDecimal'];
  readonly trackedReserveBNB: Scalars['BigDecimal'];
  readonly trackedReserveUSD: Scalars['BigDecimal'];
  readonly untrackedReserveBNB: Scalars['BigDecimal'];
  readonly untrackedReserveUSD: Scalars['BigDecimal'];
  readonly volumeToken0: Scalars['BigDecimal'];
  readonly volumeToken1: Scalars['BigDecimal'];
  readonly volumeBNB: Scalars['BigDecimal'];
  readonly volumeUSD: Scalars['BigDecimal'];
}

export interface Pair_Filter {
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly reserve0?: Maybe<Scalars['BigDecimal']>;
  readonly reserve0_gt?: Maybe<Scalars['BigDecimal']>;
  readonly reserve0_gte?: Maybe<Scalars['BigDecimal']>;
  readonly reserve0_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly reserve0_lt?: Maybe<Scalars['BigDecimal']>;
  readonly reserve0_lte?: Maybe<Scalars['BigDecimal']>;
  readonly reserve0_not?: Maybe<Scalars['BigDecimal']>;
  readonly reserve0_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly reserve1?: Maybe<Scalars['BigDecimal']>;
  readonly reserve1_gt?: Maybe<Scalars['BigDecimal']>;
  readonly reserve1_gte?: Maybe<Scalars['BigDecimal']>;
  readonly reserve1_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly reserve1_lt?: Maybe<Scalars['BigDecimal']>;
  readonly reserve1_lte?: Maybe<Scalars['BigDecimal']>;
  readonly reserve1_not?: Maybe<Scalars['BigDecimal']>;
  readonly reserve1_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly reserveBNB?: Maybe<Scalars['BigDecimal']>;
  readonly reserveBNB_gt?: Maybe<Scalars['BigDecimal']>;
  readonly reserveBNB_gte?: Maybe<Scalars['BigDecimal']>;
  readonly reserveBNB_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly reserveBNB_lt?: Maybe<Scalars['BigDecimal']>;
  readonly reserveBNB_lte?: Maybe<Scalars['BigDecimal']>;
  readonly reserveBNB_not?: Maybe<Scalars['BigDecimal']>;
  readonly reserveBNB_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly reserveUSD?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly reserveUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly token0?: Maybe<Scalars['String']>;
  readonly token0Price?: Maybe<Scalars['BigDecimal']>;
  readonly token0Price_gt?: Maybe<Scalars['BigDecimal']>;
  readonly token0Price_gte?: Maybe<Scalars['BigDecimal']>;
  readonly token0Price_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly token0Price_lt?: Maybe<Scalars['BigDecimal']>;
  readonly token0Price_lte?: Maybe<Scalars['BigDecimal']>;
  readonly token0Price_not?: Maybe<Scalars['BigDecimal']>;
  readonly token0Price_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly token0_contains?: Maybe<Scalars['String']>;
  readonly token0_ends_with?: Maybe<Scalars['String']>;
  readonly token0_gt?: Maybe<Scalars['String']>;
  readonly token0_gte?: Maybe<Scalars['String']>;
  readonly token0_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly token0_lt?: Maybe<Scalars['String']>;
  readonly token0_lte?: Maybe<Scalars['String']>;
  readonly token0_not?: Maybe<Scalars['String']>;
  readonly token0_not_contains?: Maybe<Scalars['String']>;
  readonly token0_not_ends_with?: Maybe<Scalars['String']>;
  readonly token0_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly token0_not_starts_with?: Maybe<Scalars['String']>;
  readonly token0_starts_with?: Maybe<Scalars['String']>;
  readonly token1?: Maybe<Scalars['String']>;
  readonly token1Price?: Maybe<Scalars['BigDecimal']>;
  readonly token1Price_gt?: Maybe<Scalars['BigDecimal']>;
  readonly token1Price_gte?: Maybe<Scalars['BigDecimal']>;
  readonly token1Price_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly token1Price_lt?: Maybe<Scalars['BigDecimal']>;
  readonly token1Price_lte?: Maybe<Scalars['BigDecimal']>;
  readonly token1Price_not?: Maybe<Scalars['BigDecimal']>;
  readonly token1Price_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly token1_contains?: Maybe<Scalars['String']>;
  readonly token1_ends_with?: Maybe<Scalars['String']>;
  readonly token1_gt?: Maybe<Scalars['String']>;
  readonly token1_gte?: Maybe<Scalars['String']>;
  readonly token1_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly token1_lt?: Maybe<Scalars['String']>;
  readonly token1_lte?: Maybe<Scalars['String']>;
  readonly token1_not?: Maybe<Scalars['String']>;
  readonly token1_not_contains?: Maybe<Scalars['String']>;
  readonly token1_not_ends_with?: Maybe<Scalars['String']>;
  readonly token1_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly token1_not_starts_with?: Maybe<Scalars['String']>;
  readonly token1_starts_with?: Maybe<Scalars['String']>;
  readonly trackedReserveBNB?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveBNB_gt?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveBNB_gte?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveBNB_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly trackedReserveBNB_lt?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveBNB_lte?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveBNB_not?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveBNB_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly trackedReserveUSD?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly trackedReserveUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly untrackedReserveBNB?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveBNB_gt?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveBNB_gte?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveBNB_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly untrackedReserveBNB_lt?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveBNB_lte?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveBNB_not?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveBNB_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly untrackedReserveUSD?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly untrackedReserveUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedReserveUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly volumeToken0?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken0_gt?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken0_gte?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken0_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly volumeToken0_lt?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken0_lte?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken0_not?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken0_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly volumeToken1?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken1_gt?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken1_gte?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken1_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly volumeToken1_lt?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken1_lte?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken1_not?: Maybe<Scalars['BigDecimal']>;
  readonly volumeToken1_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly volumeBNB?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_gt?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_gte?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly volumeBNB_lt?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_lte?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_not?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly volumeUSD?: Maybe<Scalars['BigDecimal']>;
  readonly volumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly volumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly volumeUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly volumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly volumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly volumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly volumeUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
}

export enum Pair_OrderBy {
  Id = 'id',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveBnb = 'reserveBNB',
  ReserveUsd = 'reserveUSD',
  Token0 = 'token0',
  Token0Price = 'token0Price',
  Token1 = 'token1',
  Token1Price = 'token1Price',
  TrackedReserveBnb = 'trackedReserveBNB',
  TrackedReserveUsd = 'trackedReserveUSD',
  UntrackedReserveBnb = 'untrackedReserveBNB',
  UntrackedReserveUsd = 'untrackedReserveUSD',
  VolumeToken0 = 'volumeToken0',
  VolumeToken1 = 'volumeToken1',
  VolumeBnb = 'volumeBNB',
  VolumeUsd = 'volumeUSD'
}

export interface Query {
  readonly __typename?: 'Query';
  readonly pair?: Maybe<Pair>;
  readonly pairs: ReadonlyArray<Pair>;
  readonly token?: Maybe<Token>;
  readonly tokens: ReadonlyArray<Token>;
}


export interface QueryPairArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryPairsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pair_Filter>;
}


export interface QueryTokenArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryTokensArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Token_Filter>;
}

export interface Subscription {
  readonly __typename?: 'Subscription';
  readonly pair?: Maybe<Pair>;
  readonly pairs: ReadonlyArray<Pair>;
  readonly token?: Maybe<Token>;
  readonly tokens: ReadonlyArray<Token>;
}


export interface SubscriptionPairArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionPairsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pair_Filter>;
}


export interface SubscriptionTokenArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionTokensArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Token_Filter>;
}

export interface Token {
  readonly __typename?: 'Token';
  readonly allPairs?: Maybe<ReadonlyArray<Pair>>;
  readonly decimals: Scalars['BigInt'];
  readonly derivedBNB: Scalars['BigDecimal'];
  readonly derivedUSD: Scalars['BigDecimal'];
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly symbol: Scalars['String'];
}


export interface TokenAllPairsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pair_Filter>;
}

export interface Token_Filter {
  readonly allPairs?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly allPairs_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly allPairs_not?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly allPairs_not_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly decimals?: Maybe<Scalars['BigInt']>;
  readonly decimals_gt?: Maybe<Scalars['BigInt']>;
  readonly decimals_gte?: Maybe<Scalars['BigInt']>;
  readonly decimals_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly decimals_lt?: Maybe<Scalars['BigInt']>;
  readonly decimals_lte?: Maybe<Scalars['BigInt']>;
  readonly decimals_not?: Maybe<Scalars['BigInt']>;
  readonly decimals_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly derivedBNB?: Maybe<Scalars['BigDecimal']>;
  readonly derivedBNB_gt?: Maybe<Scalars['BigDecimal']>;
  readonly derivedBNB_gte?: Maybe<Scalars['BigDecimal']>;
  readonly derivedBNB_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly derivedBNB_lt?: Maybe<Scalars['BigDecimal']>;
  readonly derivedBNB_lte?: Maybe<Scalars['BigDecimal']>;
  readonly derivedBNB_not?: Maybe<Scalars['BigDecimal']>;
  readonly derivedBNB_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly derivedUSD?: Maybe<Scalars['BigDecimal']>;
  readonly derivedUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly derivedUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly derivedUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly derivedUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly derivedUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly derivedUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly derivedUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly name?: Maybe<Scalars['String']>;
  readonly name_contains?: Maybe<Scalars['String']>;
  readonly name_ends_with?: Maybe<Scalars['String']>;
  readonly name_gt?: Maybe<Scalars['String']>;
  readonly name_gte?: Maybe<Scalars['String']>;
  readonly name_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly name_lt?: Maybe<Scalars['String']>;
  readonly name_lte?: Maybe<Scalars['String']>;
  readonly name_not?: Maybe<Scalars['String']>;
  readonly name_not_contains?: Maybe<Scalars['String']>;
  readonly name_not_ends_with?: Maybe<Scalars['String']>;
  readonly name_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly name_not_starts_with?: Maybe<Scalars['String']>;
  readonly name_starts_with?: Maybe<Scalars['String']>;
  readonly symbol?: Maybe<Scalars['String']>;
  readonly symbol_contains?: Maybe<Scalars['String']>;
  readonly symbol_ends_with?: Maybe<Scalars['String']>;
  readonly symbol_gt?: Maybe<Scalars['String']>;
  readonly symbol_gte?: Maybe<Scalars['String']>;
  readonly symbol_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly symbol_lt?: Maybe<Scalars['String']>;
  readonly symbol_lte?: Maybe<Scalars['String']>;
  readonly symbol_not?: Maybe<Scalars['String']>;
  readonly symbol_not_contains?: Maybe<Scalars['String']>;
  readonly symbol_not_ends_with?: Maybe<Scalars['String']>;
  readonly symbol_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly symbol_not_starts_with?: Maybe<Scalars['String']>;
  readonly symbol_starts_with?: Maybe<Scalars['String']>;
}

export enum Token_OrderBy {
  AllPairs = 'allPairs',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  Decimals = 'decimals',
  DerivedBnb = 'derivedBNB',
  DerivedUsd = 'derivedUSD'
}

export type PairsVolumeQueryVariables = Exact<{
  limit: Scalars['Int'];
  pairIds: ReadonlyArray<Scalars['ID']> | Scalars['ID'];
  blockNumber: Scalars['Int'];
}>;


export type PairsVolumeQuery = (
  { readonly __typename?: 'Query' }
  & { readonly pairVolumes: ReadonlyArray<(
    { readonly __typename?: 'Pair' }
    & Pick<Pair, 'id' | 'volumeToken0' | 'volumeToken1'>
  )> }
);

export type TokenInfoFragment = (
  { readonly __typename?: 'Token' }
  & Pick<Token, 'id' | 'name' | 'symbol' | 'derivedBNB' | 'derivedUSD'>
);

export type TopPairsQueryVariables = Exact<{
  limit: Scalars['Int'];
  excludeTokenIds: ReadonlyArray<Scalars['String']> | Scalars['String'];
}>;


export type TopPairsQuery = (
  { readonly __typename?: 'Query' }
  & { readonly pairs: ReadonlyArray<(
    { readonly __typename?: 'Pair' }
    & Pick<Pair, 'id' | 'reserve0' | 'reserve1' | 'volumeToken0' | 'volumeToken1' | 'reserveBNB' | 'reserveUSD'>
    & { readonly token0: (
      { readonly __typename?: 'Token' }
      & TokenInfoFragment
    ), readonly token1: (
      { readonly __typename?: 'Token' }
      & TokenInfoFragment
    ) }
  )> }
);
