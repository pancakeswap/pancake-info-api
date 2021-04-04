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

export interface Bundle {
  readonly __typename?: 'Bundle';
  readonly bnbPrice: Scalars['BigDecimal'];
  readonly id: Scalars['ID'];
}

export interface Bundle_Filter {
  readonly bnbPrice?: Maybe<Scalars['BigDecimal']>;
  readonly bnbPrice_gt?: Maybe<Scalars['BigDecimal']>;
  readonly bnbPrice_gte?: Maybe<Scalars['BigDecimal']>;
  readonly bnbPrice_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly bnbPrice_lt?: Maybe<Scalars['BigDecimal']>;
  readonly bnbPrice_lte?: Maybe<Scalars['BigDecimal']>;
  readonly bnbPrice_not?: Maybe<Scalars['BigDecimal']>;
  readonly bnbPrice_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
}

export enum Bundle_OrderBy {
  BnbPrice = 'bnbPrice',
  Id = 'id'
}


export interface Factory {
  readonly __typename?: 'Factory';
  readonly id: Scalars['ID'];
  readonly pairCount: Scalars['BigInt'];
}

export interface Factory_Filter {
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly pairCount?: Maybe<Scalars['BigInt']>;
  readonly pairCount_gt?: Maybe<Scalars['BigInt']>;
  readonly pairCount_gte?: Maybe<Scalars['BigInt']>;
  readonly pairCount_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly pairCount_lt?: Maybe<Scalars['BigInt']>;
  readonly pairCount_lte?: Maybe<Scalars['BigInt']>;
  readonly pairCount_not?: Maybe<Scalars['BigInt']>;
  readonly pairCount_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
}

export enum Factory_OrderBy {
  Id = 'id',
  PairCount = 'pairCount'
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
  readonly untrackedVolumeBNB: Scalars['BigDecimal'];
  readonly untrackedVolumeUSD: Scalars['BigDecimal'];
  readonly volumeBNB: Scalars['BigDecimal'];
  readonly volumeToken0: Scalars['BigDecimal'];
  readonly volumeToken1: Scalars['BigDecimal'];
  readonly volumeUSD: Scalars['BigDecimal'];
}

export interface PairSimple {
  readonly __typename?: 'PairSimple';
  readonly address: Scalars['Bytes'];
  readonly id: Scalars['ID'];
  readonly token0: Token;
  readonly token1: Token;
}

export interface PairSimple_Filter {
  readonly address?: Maybe<Scalars['Bytes']>;
  readonly address_contains?: Maybe<Scalars['Bytes']>;
  readonly address_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly address_not?: Maybe<Scalars['Bytes']>;
  readonly address_not_contains?: Maybe<Scalars['Bytes']>;
  readonly address_not_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly token0?: Maybe<Scalars['String']>;
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
}

export enum PairSimple_OrderBy {
  Address = 'address',
  Id = 'id',
  Token0 = 'token0',
  Token1 = 'token1'
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
  readonly untrackedVolumeBNB?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeBNB_gt?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeBNB_gte?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeBNB_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly untrackedVolumeBNB_lt?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeBNB_lte?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeBNB_not?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeBNB_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly untrackedVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly untrackedVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly untrackedVolumeUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly volumeBNB?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_gt?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_gte?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly volumeBNB_lt?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_lte?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_not?: Maybe<Scalars['BigDecimal']>;
  readonly volumeBNB_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
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
  UntrackedVolumeBnb = 'untrackedVolumeBNB',
  UntrackedVolumeUsd = 'untrackedVolumeUSD',
  VolumeBnb = 'volumeBNB',
  VolumeToken0 = 'volumeToken0',
  VolumeToken1 = 'volumeToken1',
  VolumeUsd = 'volumeUSD'
}

export interface Query {
  readonly __typename?: 'Query';
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly bundle?: Maybe<Bundle>;
  readonly bundles: ReadonlyArray<Bundle>;
  readonly factories: ReadonlyArray<Factory>;
  readonly factory?: Maybe<Factory>;
  readonly pair?: Maybe<Pair>;
  readonly pairSimple?: Maybe<PairSimple>;
  readonly pairSimples: ReadonlyArray<PairSimple>;
  readonly pairs: ReadonlyArray<Pair>;
  readonly token?: Maybe<Token>;
  readonly tokens: ReadonlyArray<Token>;
}


export interface Query_MetaArgs {
  block?: Maybe<Block_Height>;
}


export interface QueryBundleArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryBundlesArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bundle_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bundle_Filter>;
}


export interface QueryFactoriesArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Factory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Factory_Filter>;
}


export interface QueryFactoryArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryPairArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryPairSimpleArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryPairSimplesArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairSimple_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairSimple_Filter>;
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
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly bundle?: Maybe<Bundle>;
  readonly bundles: ReadonlyArray<Bundle>;
  readonly factories: ReadonlyArray<Factory>;
  readonly factory?: Maybe<Factory>;
  readonly pair?: Maybe<Pair>;
  readonly pairSimple?: Maybe<PairSimple>;
  readonly pairSimples: ReadonlyArray<PairSimple>;
  readonly pairs: ReadonlyArray<Pair>;
  readonly token?: Maybe<Token>;
  readonly tokens: ReadonlyArray<Token>;
}


export interface Subscription_MetaArgs {
  block?: Maybe<Block_Height>;
}


export interface SubscriptionBundleArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionBundlesArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Bundle_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Bundle_Filter>;
}


export interface SubscriptionFactoriesArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Factory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Factory_Filter>;
}


export interface SubscriptionFactoryArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionPairArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionPairSimpleArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionPairSimplesArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairSimple_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairSimple_Filter>;
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
  readonly decimals: Scalars['BigInt'];
  readonly derivedBNB: Scalars['BigDecimal'];
  readonly derivedUSD: Scalars['BigDecimal'];
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
  readonly symbol: Scalars['String'];
}

export interface Token_Filter {
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
  Decimals = 'decimals',
  DerivedBnb = 'derivedBNB',
  DerivedUsd = 'derivedUSD',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol'
}

export interface _Block_ {
  readonly __typename?: '_Block_';
  /** The hash of the block */
  readonly hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  readonly number: Scalars['Int'];
}

/** The type for the top-level _meta field */
export interface _Meta_ {
  readonly __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  readonly block: _Block_;
  /** The deployment ID */
  readonly deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  readonly hasIndexingErrors: Scalars['Boolean'];
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
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

export type TokenQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TokenQuery = (
  { readonly __typename?: 'Query' }
  & { readonly token?: Maybe<(
    { readonly __typename?: 'Token' }
    & Pick<Token, 'id' | 'name' | 'symbol' | 'derivedBNB' | 'derivedUSD'>
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
