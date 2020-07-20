export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
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

export interface Bundle {
  readonly __typename?: 'Bundle';
  readonly ethPrice: Scalars['BigDecimal'];
  readonly id: Scalars['ID'];
}

export interface Burn {
  readonly __typename?: 'Burn';
  readonly amount0?: Maybe<Scalars['BigDecimal']>;
  readonly amount1?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  readonly feeTo?: Maybe<Scalars['Bytes']>;
  readonly id: Scalars['ID'];
  readonly liquidity: Scalars['BigDecimal'];
  readonly logIndex?: Maybe<Scalars['BigInt']>;
  readonly pair: Pair;
  readonly sender?: Maybe<Scalars['Bytes']>;
  readonly timestamp: Scalars['BigInt'];
  readonly to?: Maybe<Scalars['Bytes']>;
  readonly transaction: Transaction;
}

export interface LiquidityPosition {
  readonly __typename?: 'LiquidityPosition';
  readonly id: Scalars['ID'];
  readonly liquidityTokenBalance: Scalars['BigDecimal'];
  readonly pair: Pair;
  readonly poolOwnership?: Maybe<Scalars['BigDecimal']>;
  readonly user: User;
}

export interface Mint {
  readonly __typename?: 'Mint';
  readonly amount0?: Maybe<Scalars['BigDecimal']>;
  readonly amount1?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  readonly feeTo?: Maybe<Scalars['Bytes']>;
  readonly id: Scalars['ID'];
  readonly liquidity: Scalars['BigDecimal'];
  readonly logIndex?: Maybe<Scalars['BigInt']>;
  readonly pair: Pair;
  readonly sender?: Maybe<Scalars['Bytes']>;
  readonly timestamp: Scalars['BigInt'];
  readonly to: Scalars['Bytes'];
  readonly transaction: Transaction;
}

export interface Pair {
  readonly __typename?: 'Pair';
  readonly burns?: Maybe<ReadonlyArray<Burn>>;
  readonly createdAtBlockNumber: Scalars['BigInt'];
  readonly createdAtTimestamp: Scalars['BigInt'];
  readonly factory: UniswapFactory;
  readonly id: Scalars['ID'];
  readonly liquidityPositions?: Maybe<ReadonlyArray<LiquidityPosition>>;
  readonly mints?: Maybe<ReadonlyArray<Mint>>;
  readonly reserve0: Scalars['BigDecimal'];
  readonly reserve1: Scalars['BigDecimal'];
  readonly reserveETH: Scalars['BigDecimal'];
  readonly reserveUSD: Scalars['BigDecimal'];
  readonly swaps?: Maybe<ReadonlyArray<Swap>>;
  readonly token0: Token;
  readonly token0Price: Scalars['BigDecimal'];
  readonly token1: Token;
  readonly token1Price: Scalars['BigDecimal'];
  readonly totalSupply: Scalars['BigDecimal'];
  readonly trackedReserveETH: Scalars['BigDecimal'];
  readonly txCount: Scalars['BigInt'];
  readonly volumeToken0: Scalars['BigDecimal'];
  readonly volumeToken1: Scalars['BigDecimal'];
  readonly volumeUSD: Scalars['BigDecimal'];
}


export interface PairBurnsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Burn_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Burn_Filter>;
}


export interface PairLiquidityPositionsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidityPosition_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidityPosition_Filter>;
}


export interface PairMintsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Mint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Mint_Filter>;
}


export interface PairSwapsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
}

export interface PairDayData {
  readonly __typename?: 'PairDayData';
  readonly dailyTxns: Scalars['BigInt'];
  readonly dailyVolumeToken0: Scalars['BigDecimal'];
  readonly dailyVolumeToken1: Scalars['BigDecimal'];
  readonly dailyVolumeUSD: Scalars['BigDecimal'];
  readonly date: Scalars['Int'];
  readonly id: Scalars['ID'];
  readonly pairAddress: Scalars['Bytes'];
  readonly reserve0: Scalars['BigDecimal'];
  readonly reserve1: Scalars['BigDecimal'];
  readonly reserveUSD: Scalars['BigDecimal'];
  readonly token0: Token;
  readonly token1: Token;
}

export interface Query {
  readonly __typename?: 'Query';
  readonly bundle?: Maybe<Bundle>;
  readonly bundles: ReadonlyArray<Bundle>;
  readonly burn?: Maybe<Burn>;
  readonly burns: ReadonlyArray<Burn>;
  readonly liquidityPosition?: Maybe<LiquidityPosition>;
  readonly liquidityPositions: ReadonlyArray<LiquidityPosition>;
  readonly mint?: Maybe<Mint>;
  readonly mints: ReadonlyArray<Mint>;
  readonly pair?: Maybe<Pair>;
  readonly pairDayData?: Maybe<PairDayData>;
  readonly pairDayDatas: ReadonlyArray<PairDayData>;
  readonly pairs: ReadonlyArray<Pair>;
  readonly swap?: Maybe<Swap>;
  readonly swaps: ReadonlyArray<Swap>;
  readonly token?: Maybe<Token>;
  readonly tokenDayData?: Maybe<TokenDayData>;
  readonly tokenDayDatas: ReadonlyArray<TokenDayData>;
  readonly tokens: ReadonlyArray<Token>;
  readonly transaction?: Maybe<Transaction>;
  readonly transactions: ReadonlyArray<Transaction>;
  readonly uniswapDayData?: Maybe<UniswapDayData>;
  readonly uniswapDayDatas: ReadonlyArray<UniswapDayData>;
  readonly uniswapFactories: ReadonlyArray<UniswapFactory>;
  readonly uniswapFactory?: Maybe<UniswapFactory>;
  readonly user?: Maybe<User>;
  readonly users: ReadonlyArray<User>;
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


export interface QueryBurnArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryBurnsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Burn_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Burn_Filter>;
}


export interface QueryLiquidityPositionArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryLiquidityPositionsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidityPosition_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidityPosition_Filter>;
}


export interface QueryMintArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryMintsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Mint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Mint_Filter>;
}


export interface QueryPairArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryPairDayDataArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryPairDayDatasArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairDayData_Filter>;
}


export interface QueryPairsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pair_Filter>;
}


export interface QuerySwapArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QuerySwapsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
}


export interface QueryTokenArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryTokenDayDataArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryTokenDayDatasArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TokenDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TokenDayData_Filter>;
}


export interface QueryTokensArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Token_Filter>;
}


export interface QueryTransactionArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryTransactionsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Transaction_Filter>;
}


export interface QueryUniswapDayDataArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryUniswapDayDatasArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UniswapDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UniswapDayData_Filter>;
}


export interface QueryUniswapFactoriesArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UniswapFactory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UniswapFactory_Filter>;
}


export interface QueryUniswapFactoryArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryUserArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface QueryUsersArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<User_Filter>;
}

export interface Subscription {
  readonly __typename?: 'Subscription';
  readonly bundle?: Maybe<Bundle>;
  readonly bundles: ReadonlyArray<Bundle>;
  readonly burn?: Maybe<Burn>;
  readonly burns: ReadonlyArray<Burn>;
  readonly liquidityPosition?: Maybe<LiquidityPosition>;
  readonly liquidityPositions: ReadonlyArray<LiquidityPosition>;
  readonly mint?: Maybe<Mint>;
  readonly mints: ReadonlyArray<Mint>;
  readonly pair?: Maybe<Pair>;
  readonly pairDayData?: Maybe<PairDayData>;
  readonly pairDayDatas: ReadonlyArray<PairDayData>;
  readonly pairs: ReadonlyArray<Pair>;
  readonly swap?: Maybe<Swap>;
  readonly swaps: ReadonlyArray<Swap>;
  readonly token?: Maybe<Token>;
  readonly tokenDayData?: Maybe<TokenDayData>;
  readonly tokenDayDatas: ReadonlyArray<TokenDayData>;
  readonly tokens: ReadonlyArray<Token>;
  readonly transaction?: Maybe<Transaction>;
  readonly transactions: ReadonlyArray<Transaction>;
  readonly uniswapDayData?: Maybe<UniswapDayData>;
  readonly uniswapDayDatas: ReadonlyArray<UniswapDayData>;
  readonly uniswapFactories: ReadonlyArray<UniswapFactory>;
  readonly uniswapFactory?: Maybe<UniswapFactory>;
  readonly user?: Maybe<User>;
  readonly users: ReadonlyArray<User>;
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


export interface SubscriptionBurnArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionBurnsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Burn_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Burn_Filter>;
}


export interface SubscriptionLiquidityPositionArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionLiquidityPositionsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidityPosition_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidityPosition_Filter>;
}


export interface SubscriptionMintArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionMintsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Mint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Mint_Filter>;
}


export interface SubscriptionPairArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionPairDayDataArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionPairDayDatasArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairDayData_Filter>;
}


export interface SubscriptionPairsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pair_Filter>;
}


export interface SubscriptionSwapArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionSwapsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
}


export interface SubscriptionTokenArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionTokenDayDataArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionTokenDayDatasArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TokenDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TokenDayData_Filter>;
}


export interface SubscriptionTokensArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Token_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Token_Filter>;
}


export interface SubscriptionTransactionArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionTransactionsArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Transaction_Filter>;
}


export interface SubscriptionUniswapDayDataArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionUniswapDayDatasArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UniswapDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UniswapDayData_Filter>;
}


export interface SubscriptionUniswapFactoriesArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UniswapFactory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UniswapFactory_Filter>;
}


export interface SubscriptionUniswapFactoryArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionUserArgs {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
}


export interface SubscriptionUsersArgs {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<User_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<User_Filter>;
}

export interface Swap {
  readonly __typename?: 'Swap';
  readonly amount0In: Scalars['BigDecimal'];
  readonly amount0Out: Scalars['BigDecimal'];
  readonly amount1In: Scalars['BigDecimal'];
  readonly amount1Out: Scalars['BigDecimal'];
  readonly amountUSD: Scalars['BigDecimal'];
  readonly id: Scalars['ID'];
  readonly logIndex?: Maybe<Scalars['BigInt']>;
  readonly pair: Pair;
  readonly sender: Scalars['Bytes'];
  readonly timestamp: Scalars['BigInt'];
  readonly to: Scalars['Bytes'];
  readonly transaction: Transaction;
}

export interface Token {
  readonly __typename?: 'Token';
  readonly allPairs?: Maybe<ReadonlyArray<Pair>>;
  readonly decimals: Scalars['BigInt'];
  readonly derivedETH?: Maybe<Scalars['BigDecimal']>;
  readonly id: Scalars['ID'];
  readonly mostLiquidPairs: ReadonlyArray<Maybe<PairDayData>>;
  readonly name: Scalars['String'];
  readonly symbol: Scalars['String'];
  readonly totalLiquidity: Scalars['BigDecimal'];
  readonly tradeVolume: Scalars['BigDecimal'];
  readonly tradeVolumeUSD: Scalars['BigDecimal'];
  readonly txCount: Scalars['BigInt'];
}


export interface TokenAllPairsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pair_Filter>;
}


export interface TokenMostLiquidPairsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairDayData_Filter>;
}

export interface TokenDayData {
  readonly __typename?: 'TokenDayData';
  readonly dailyTxns: Scalars['BigInt'];
  readonly dailyVolumeETH: Scalars['BigDecimal'];
  readonly dailyVolumeToken: Scalars['BigDecimal'];
  readonly dailyVolumeUSD: Scalars['BigDecimal'];
  readonly date: Scalars['Int'];
  readonly id: Scalars['ID'];
  readonly maxStored: Scalars['Int'];
  readonly mostLiquidPairs: ReadonlyArray<PairDayData>;
  readonly priceUSD: Scalars['BigDecimal'];
  readonly token: Token;
  readonly totalLiquidityETH: Scalars['BigDecimal'];
  readonly totalLiquidityToken: Scalars['BigDecimal'];
  readonly totalLiquidityUSD: Scalars['BigDecimal'];
}


export interface TokenDayDataMostLiquidPairsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PairDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PairDayData_Filter>;
}

export interface Transaction {
  readonly __typename?: 'Transaction';
  readonly blockNumber: Scalars['BigInt'];
  readonly burns: ReadonlyArray<Maybe<Burn>>;
  readonly id: Scalars['ID'];
  readonly mints: ReadonlyArray<Maybe<Mint>>;
  readonly swaps: ReadonlyArray<Maybe<Swap>>;
  readonly timestamp: Scalars['BigInt'];
}


export interface TransactionBurnsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Burn_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Burn_Filter>;
}


export interface TransactionMintsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Mint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Mint_Filter>;
}


export interface TransactionSwapsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Swap_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Swap_Filter>;
}

export interface UniswapDayData {
  readonly __typename?: 'UniswapDayData';
  readonly dailyVolumeETH: Scalars['BigDecimal'];
  readonly dailyVolumeUSD: Scalars['BigDecimal'];
  readonly date: Scalars['Int'];
  readonly id: Scalars['ID'];
  readonly maxStored?: Maybe<Scalars['Int']>;
  readonly mostLiquidTokens: ReadonlyArray<TokenDayData>;
  readonly totalLiquidityETH: Scalars['BigDecimal'];
  readonly totalLiquidityUSD: Scalars['BigDecimal'];
  readonly totalVolumeETH: Scalars['BigDecimal'];
  readonly totalVolumeUSD: Scalars['BigDecimal'];
  readonly txCount: Scalars['BigInt'];
}


export interface UniswapDayDataMostLiquidTokensArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TokenDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TokenDayData_Filter>;
}

export interface UniswapFactory {
  readonly __typename?: 'UniswapFactory';
  readonly id: Scalars['ID'];
  readonly mostLiquidTokens: ReadonlyArray<TokenDayData>;
  readonly pairCount: Scalars['Int'];
  readonly pairs: ReadonlyArray<Maybe<Pair>>;
  readonly totalLiquidityETH: Scalars['BigDecimal'];
  readonly totalLiquidityUSD: Scalars['BigDecimal'];
  readonly totalVolumeETH: Scalars['BigDecimal'];
  readonly totalVolumeUSD: Scalars['BigDecimal'];
  readonly txCount: Scalars['BigInt'];
}


export interface UniswapFactoryMostLiquidTokensArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TokenDayData_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TokenDayData_Filter>;
}


export interface UniswapFactoryPairsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pair_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Pair_Filter>;
}

export interface User {
  readonly __typename?: 'User';
  readonly id: Scalars['ID'];
  readonly liquidityPositions?: Maybe<ReadonlyArray<LiquidityPosition>>;
}


export interface UserLiquidityPositionsArgs {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LiquidityPosition_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<LiquidityPosition_Filter>;
}

export enum Bundle_OrderBy {
  EthPrice = 'ethPrice',
  Id = 'id'
}

export enum Burn_OrderBy {
  Amount0 = 'amount0',
  Amount1 = 'amount1',
  AmountUsd = 'amountUSD',
  FeeLiquidity = 'feeLiquidity',
  FeeTo = 'feeTo',
  Id = 'id',
  Liquidity = 'liquidity',
  LogIndex = 'logIndex',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Transaction = 'transaction'
}

export enum LiquidityPosition_OrderBy {
  Id = 'id',
  LiquidityTokenBalance = 'liquidityTokenBalance',
  Pair = 'pair',
  PoolOwnership = 'poolOwnership',
  User = 'user'
}

export enum Mint_OrderBy {
  Amount0 = 'amount0',
  Amount1 = 'amount1',
  AmountUsd = 'amountUSD',
  FeeLiquidity = 'feeLiquidity',
  FeeTo = 'feeTo',
  Id = 'id',
  Liquidity = 'liquidity',
  LogIndex = 'logIndex',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Transaction = 'transaction'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum PairDayData_OrderBy {
  DailyTxns = 'dailyTxns',
  DailyVolumeToken0 = 'dailyVolumeToken0',
  DailyVolumeToken1 = 'dailyVolumeToken1',
  DailyVolumeUsd = 'dailyVolumeUSD',
  Date = 'date',
  Id = 'id',
  PairAddress = 'pairAddress',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveUsd = 'reserveUSD',
  Token0 = 'token0',
  Token1 = 'token1'
}

export enum Pair_OrderBy {
  Burns = 'burns',
  CreatedAtBlockNumber = 'createdAtBlockNumber',
  CreatedAtTimestamp = 'createdAtTimestamp',
  Factory = 'factory',
  Id = 'id',
  LiquidityPositions = 'liquidityPositions',
  Mints = 'mints',
  Reserve0 = 'reserve0',
  Reserve1 = 'reserve1',
  ReserveEth = 'reserveETH',
  ReserveUsd = 'reserveUSD',
  Swaps = 'swaps',
  Token0 = 'token0',
  Token0Price = 'token0Price',
  Token1 = 'token1',
  Token1Price = 'token1Price',
  TotalSupply = 'totalSupply',
  TrackedReserveEth = 'trackedReserveETH',
  TxCount = 'txCount',
  VolumeToken0 = 'volumeToken0',
  VolumeToken1 = 'volumeToken1',
  VolumeUsd = 'volumeUSD'
}

export enum Swap_OrderBy {
  Amount0In = 'amount0In',
  Amount0Out = 'amount0Out',
  Amount1In = 'amount1In',
  Amount1Out = 'amount1Out',
  AmountUsd = 'amountUSD',
  Id = 'id',
  LogIndex = 'logIndex',
  Pair = 'pair',
  Sender = 'sender',
  Timestamp = 'timestamp',
  To = 'to',
  Transaction = 'transaction'
}

export enum TokenDayData_OrderBy {
  DailyTxns = 'dailyTxns',
  DailyVolumeEth = 'dailyVolumeETH',
  DailyVolumeToken = 'dailyVolumeToken',
  DailyVolumeUsd = 'dailyVolumeUSD',
  Date = 'date',
  Id = 'id',
  MaxStored = 'maxStored',
  MostLiquidPairs = 'mostLiquidPairs',
  PriceUsd = 'priceUSD',
  Token = 'token',
  TotalLiquidityEth = 'totalLiquidityETH',
  TotalLiquidityToken = 'totalLiquidityToken',
  TotalLiquidityUsd = 'totalLiquidityUSD'
}

export enum Token_OrderBy {
  AllPairs = 'allPairs',
  Decimals = 'decimals',
  DerivedEth = 'derivedETH',
  Id = 'id',
  MostLiquidPairs = 'mostLiquidPairs',
  Name = 'name',
  Symbol = 'symbol',
  TotalLiquidity = 'totalLiquidity',
  TradeVolume = 'tradeVolume',
  TradeVolumeUsd = 'tradeVolumeUSD',
  TxCount = 'txCount'
}

export enum Transaction_OrderBy {
  BlockNumber = 'blockNumber',
  Burns = 'burns',
  Id = 'id',
  Mints = 'mints',
  Swaps = 'swaps',
  Timestamp = 'timestamp'
}

export enum UniswapDayData_OrderBy {
  DailyVolumeEth = 'dailyVolumeETH',
  DailyVolumeUsd = 'dailyVolumeUSD',
  Date = 'date',
  Id = 'id',
  MaxStored = 'maxStored',
  MostLiquidTokens = 'mostLiquidTokens',
  TotalLiquidityEth = 'totalLiquidityETH',
  TotalLiquidityUsd = 'totalLiquidityUSD',
  TotalVolumeEth = 'totalVolumeETH',
  TotalVolumeUsd = 'totalVolumeUSD',
  TxCount = 'txCount'
}

export enum UniswapFactory_OrderBy {
  Id = 'id',
  MostLiquidTokens = 'mostLiquidTokens',
  PairCount = 'pairCount',
  Pairs = 'pairs',
  TotalLiquidityEth = 'totalLiquidityETH',
  TotalLiquidityUsd = 'totalLiquidityUSD',
  TotalVolumeEth = 'totalVolumeETH',
  TotalVolumeUsd = 'totalVolumeUSD',
  TxCount = 'txCount'
}

export enum User_OrderBy {
  Id = 'id',
  LiquidityPositions = 'liquidityPositions'
}

export interface Block_Height {
  readonly hash?: Maybe<Scalars['Bytes']>;
  readonly number?: Maybe<Scalars['Int']>;
}

export interface Bundle_Filter {
  readonly ethPrice?: Maybe<Scalars['BigDecimal']>;
  readonly ethPrice_gt?: Maybe<Scalars['BigDecimal']>;
  readonly ethPrice_gte?: Maybe<Scalars['BigDecimal']>;
  readonly ethPrice_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly ethPrice_lt?: Maybe<Scalars['BigDecimal']>;
  readonly ethPrice_lte?: Maybe<Scalars['BigDecimal']>;
  readonly ethPrice_not?: Maybe<Scalars['BigDecimal']>;
  readonly ethPrice_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
}

export interface Burn_Filter {
  readonly amount0?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_gt?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_gte?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount0_lt?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_lte?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_not?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount1?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_gt?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_gte?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount1_lt?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_lte?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_not?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amountUSD?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amountUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_gt?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_gte?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly feeLiquidity_lt?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_lte?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_not?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly feeTo?: Maybe<Scalars['Bytes']>;
  readonly feeTo_contains?: Maybe<Scalars['Bytes']>;
  readonly feeTo_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly feeTo_not?: Maybe<Scalars['Bytes']>;
  readonly feeTo_not_contains?: Maybe<Scalars['Bytes']>;
  readonly feeTo_not_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly liquidity?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_gt?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_gte?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly liquidity_lt?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_lte?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_not?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly logIndex?: Maybe<Scalars['BigInt']>;
  readonly logIndex_gt?: Maybe<Scalars['BigInt']>;
  readonly logIndex_gte?: Maybe<Scalars['BigInt']>;
  readonly logIndex_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly logIndex_lt?: Maybe<Scalars['BigInt']>;
  readonly logIndex_lte?: Maybe<Scalars['BigInt']>;
  readonly logIndex_not?: Maybe<Scalars['BigInt']>;
  readonly logIndex_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly pair?: Maybe<Scalars['String']>;
  readonly pair_contains?: Maybe<Scalars['String']>;
  readonly pair_ends_with?: Maybe<Scalars['String']>;
  readonly pair_gt?: Maybe<Scalars['String']>;
  readonly pair_gte?: Maybe<Scalars['String']>;
  readonly pair_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pair_lt?: Maybe<Scalars['String']>;
  readonly pair_lte?: Maybe<Scalars['String']>;
  readonly pair_not?: Maybe<Scalars['String']>;
  readonly pair_not_contains?: Maybe<Scalars['String']>;
  readonly pair_not_ends_with?: Maybe<Scalars['String']>;
  readonly pair_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pair_not_starts_with?: Maybe<Scalars['String']>;
  readonly pair_starts_with?: Maybe<Scalars['String']>;
  readonly sender?: Maybe<Scalars['Bytes']>;
  readonly sender_contains?: Maybe<Scalars['Bytes']>;
  readonly sender_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly sender_not?: Maybe<Scalars['Bytes']>;
  readonly sender_not_contains?: Maybe<Scalars['Bytes']>;
  readonly sender_not_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly timestamp?: Maybe<Scalars['BigInt']>;
  readonly timestamp_gt?: Maybe<Scalars['BigInt']>;
  readonly timestamp_gte?: Maybe<Scalars['BigInt']>;
  readonly timestamp_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_lt?: Maybe<Scalars['BigInt']>;
  readonly timestamp_lte?: Maybe<Scalars['BigInt']>;
  readonly timestamp_not?: Maybe<Scalars['BigInt']>;
  readonly timestamp_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly to?: Maybe<Scalars['Bytes']>;
  readonly to_contains?: Maybe<Scalars['Bytes']>;
  readonly to_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly to_not?: Maybe<Scalars['Bytes']>;
  readonly to_not_contains?: Maybe<Scalars['Bytes']>;
  readonly to_not_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
}

export interface LiquidityPosition_Filter {
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly liquidityTokenBalance?: Maybe<Scalars['BigDecimal']>;
  readonly liquidityTokenBalance_gt?: Maybe<Scalars['BigDecimal']>;
  readonly liquidityTokenBalance_gte?: Maybe<Scalars['BigDecimal']>;
  readonly liquidityTokenBalance_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly liquidityTokenBalance_lt?: Maybe<Scalars['BigDecimal']>;
  readonly liquidityTokenBalance_lte?: Maybe<Scalars['BigDecimal']>;
  readonly liquidityTokenBalance_not?: Maybe<Scalars['BigDecimal']>;
  readonly liquidityTokenBalance_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly pair?: Maybe<Scalars['String']>;
  readonly pair_contains?: Maybe<Scalars['String']>;
  readonly pair_ends_with?: Maybe<Scalars['String']>;
  readonly pair_gt?: Maybe<Scalars['String']>;
  readonly pair_gte?: Maybe<Scalars['String']>;
  readonly pair_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pair_lt?: Maybe<Scalars['String']>;
  readonly pair_lte?: Maybe<Scalars['String']>;
  readonly pair_not?: Maybe<Scalars['String']>;
  readonly pair_not_contains?: Maybe<Scalars['String']>;
  readonly pair_not_ends_with?: Maybe<Scalars['String']>;
  readonly pair_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pair_not_starts_with?: Maybe<Scalars['String']>;
  readonly pair_starts_with?: Maybe<Scalars['String']>;
  readonly poolOwnership?: Maybe<Scalars['BigDecimal']>;
  readonly poolOwnership_gt?: Maybe<Scalars['BigDecimal']>;
  readonly poolOwnership_gte?: Maybe<Scalars['BigDecimal']>;
  readonly poolOwnership_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly poolOwnership_lt?: Maybe<Scalars['BigDecimal']>;
  readonly poolOwnership_lte?: Maybe<Scalars['BigDecimal']>;
  readonly poolOwnership_not?: Maybe<Scalars['BigDecimal']>;
  readonly poolOwnership_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly user?: Maybe<Scalars['String']>;
  readonly user_contains?: Maybe<Scalars['String']>;
  readonly user_ends_with?: Maybe<Scalars['String']>;
  readonly user_gt?: Maybe<Scalars['String']>;
  readonly user_gte?: Maybe<Scalars['String']>;
  readonly user_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly user_lt?: Maybe<Scalars['String']>;
  readonly user_lte?: Maybe<Scalars['String']>;
  readonly user_not?: Maybe<Scalars['String']>;
  readonly user_not_contains?: Maybe<Scalars['String']>;
  readonly user_not_ends_with?: Maybe<Scalars['String']>;
  readonly user_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly user_not_starts_with?: Maybe<Scalars['String']>;
  readonly user_starts_with?: Maybe<Scalars['String']>;
}

export interface Mint_Filter {
  readonly amount0?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_gt?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_gte?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount0_lt?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_lte?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_not?: Maybe<Scalars['BigDecimal']>;
  readonly amount0_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount1?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_gt?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_gte?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount1_lt?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_lte?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_not?: Maybe<Scalars['BigDecimal']>;
  readonly amount1_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amountUSD?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amountUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly feeLiquidity?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_gt?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_gte?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly feeLiquidity_lt?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_lte?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_not?: Maybe<Scalars['BigDecimal']>;
  readonly feeLiquidity_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly feeTo?: Maybe<Scalars['Bytes']>;
  readonly feeTo_contains?: Maybe<Scalars['Bytes']>;
  readonly feeTo_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly feeTo_not?: Maybe<Scalars['Bytes']>;
  readonly feeTo_not_contains?: Maybe<Scalars['Bytes']>;
  readonly feeTo_not_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly liquidity?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_gt?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_gte?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly liquidity_lt?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_lte?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_not?: Maybe<Scalars['BigDecimal']>;
  readonly liquidity_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly logIndex?: Maybe<Scalars['BigInt']>;
  readonly logIndex_gt?: Maybe<Scalars['BigInt']>;
  readonly logIndex_gte?: Maybe<Scalars['BigInt']>;
  readonly logIndex_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly logIndex_lt?: Maybe<Scalars['BigInt']>;
  readonly logIndex_lte?: Maybe<Scalars['BigInt']>;
  readonly logIndex_not?: Maybe<Scalars['BigInt']>;
  readonly logIndex_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly pair?: Maybe<Scalars['String']>;
  readonly pair_contains?: Maybe<Scalars['String']>;
  readonly pair_ends_with?: Maybe<Scalars['String']>;
  readonly pair_gt?: Maybe<Scalars['String']>;
  readonly pair_gte?: Maybe<Scalars['String']>;
  readonly pair_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pair_lt?: Maybe<Scalars['String']>;
  readonly pair_lte?: Maybe<Scalars['String']>;
  readonly pair_not?: Maybe<Scalars['String']>;
  readonly pair_not_contains?: Maybe<Scalars['String']>;
  readonly pair_not_ends_with?: Maybe<Scalars['String']>;
  readonly pair_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pair_not_starts_with?: Maybe<Scalars['String']>;
  readonly pair_starts_with?: Maybe<Scalars['String']>;
  readonly sender?: Maybe<Scalars['Bytes']>;
  readonly sender_contains?: Maybe<Scalars['Bytes']>;
  readonly sender_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly sender_not?: Maybe<Scalars['Bytes']>;
  readonly sender_not_contains?: Maybe<Scalars['Bytes']>;
  readonly sender_not_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly timestamp?: Maybe<Scalars['BigInt']>;
  readonly timestamp_gt?: Maybe<Scalars['BigInt']>;
  readonly timestamp_gte?: Maybe<Scalars['BigInt']>;
  readonly timestamp_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_lt?: Maybe<Scalars['BigInt']>;
  readonly timestamp_lte?: Maybe<Scalars['BigInt']>;
  readonly timestamp_not?: Maybe<Scalars['BigInt']>;
  readonly timestamp_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly to?: Maybe<Scalars['Bytes']>;
  readonly to_contains?: Maybe<Scalars['Bytes']>;
  readonly to_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly to_not?: Maybe<Scalars['Bytes']>;
  readonly to_not_contains?: Maybe<Scalars['Bytes']>;
  readonly to_not_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
}

export interface PairDayData_Filter {
  readonly dailyTxns?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_gt?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_gte?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly dailyTxns_lt?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_lte?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_not?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly dailyVolumeToken0?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken0_gt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken0_gte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken0_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeToken0_lt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken0_lte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken0_not?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken0_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeToken1?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken1_gt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken1_gte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken1_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeToken1_lt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken1_lte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken1_not?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken1_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly date?: Maybe<Scalars['Int']>;
  readonly date_gt?: Maybe<Scalars['Int']>;
  readonly date_gte?: Maybe<Scalars['Int']>;
  readonly date_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly date_lt?: Maybe<Scalars['Int']>;
  readonly date_lte?: Maybe<Scalars['Int']>;
  readonly date_not?: Maybe<Scalars['Int']>;
  readonly date_not_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly pairAddress?: Maybe<Scalars['Bytes']>;
  readonly pairAddress_contains?: Maybe<Scalars['Bytes']>;
  readonly pairAddress_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly pairAddress_not?: Maybe<Scalars['Bytes']>;
  readonly pairAddress_not_contains?: Maybe<Scalars['Bytes']>;
  readonly pairAddress_not_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
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
  readonly reserveUSD?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly reserveUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly reserveUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
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

export interface Pair_Filter {
  readonly createdAtBlockNumber?: Maybe<Scalars['BigInt']>;
  readonly createdAtBlockNumber_gt?: Maybe<Scalars['BigInt']>;
  readonly createdAtBlockNumber_gte?: Maybe<Scalars['BigInt']>;
  readonly createdAtBlockNumber_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly createdAtBlockNumber_lt?: Maybe<Scalars['BigInt']>;
  readonly createdAtBlockNumber_lte?: Maybe<Scalars['BigInt']>;
  readonly createdAtBlockNumber_not?: Maybe<Scalars['BigInt']>;
  readonly createdAtBlockNumber_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly createdAtTimestamp?: Maybe<Scalars['BigInt']>;
  readonly createdAtTimestamp_gt?: Maybe<Scalars['BigInt']>;
  readonly createdAtTimestamp_gte?: Maybe<Scalars['BigInt']>;
  readonly createdAtTimestamp_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly createdAtTimestamp_lt?: Maybe<Scalars['BigInt']>;
  readonly createdAtTimestamp_lte?: Maybe<Scalars['BigInt']>;
  readonly createdAtTimestamp_not?: Maybe<Scalars['BigInt']>;
  readonly createdAtTimestamp_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
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
  readonly reserveETH?: Maybe<Scalars['BigDecimal']>;
  readonly reserveETH_gt?: Maybe<Scalars['BigDecimal']>;
  readonly reserveETH_gte?: Maybe<Scalars['BigDecimal']>;
  readonly reserveETH_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly reserveETH_lt?: Maybe<Scalars['BigDecimal']>;
  readonly reserveETH_lte?: Maybe<Scalars['BigDecimal']>;
  readonly reserveETH_not?: Maybe<Scalars['BigDecimal']>;
  readonly reserveETH_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
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
  readonly totalSupply?: Maybe<Scalars['BigDecimal']>;
  readonly totalSupply_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalSupply_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalSupply_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalSupply_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalSupply_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalSupply_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalSupply_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly trackedReserveETH?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveETH_gt?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveETH_gte?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveETH_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly trackedReserveETH_lt?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveETH_lte?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveETH_not?: Maybe<Scalars['BigDecimal']>;
  readonly trackedReserveETH_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly txCount?: Maybe<Scalars['BigInt']>;
  readonly txCount_gt?: Maybe<Scalars['BigInt']>;
  readonly txCount_gte?: Maybe<Scalars['BigInt']>;
  readonly txCount_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly txCount_lt?: Maybe<Scalars['BigInt']>;
  readonly txCount_lte?: Maybe<Scalars['BigInt']>;
  readonly txCount_not?: Maybe<Scalars['BigInt']>;
  readonly txCount_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
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

export interface Swap_Filter {
  readonly amount0In?: Maybe<Scalars['BigDecimal']>;
  readonly amount0In_gt?: Maybe<Scalars['BigDecimal']>;
  readonly amount0In_gte?: Maybe<Scalars['BigDecimal']>;
  readonly amount0In_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount0In_lt?: Maybe<Scalars['BigDecimal']>;
  readonly amount0In_lte?: Maybe<Scalars['BigDecimal']>;
  readonly amount0In_not?: Maybe<Scalars['BigDecimal']>;
  readonly amount0In_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount0Out?: Maybe<Scalars['BigDecimal']>;
  readonly amount0Out_gt?: Maybe<Scalars['BigDecimal']>;
  readonly amount0Out_gte?: Maybe<Scalars['BigDecimal']>;
  readonly amount0Out_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount0Out_lt?: Maybe<Scalars['BigDecimal']>;
  readonly amount0Out_lte?: Maybe<Scalars['BigDecimal']>;
  readonly amount0Out_not?: Maybe<Scalars['BigDecimal']>;
  readonly amount0Out_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount1In?: Maybe<Scalars['BigDecimal']>;
  readonly amount1In_gt?: Maybe<Scalars['BigDecimal']>;
  readonly amount1In_gte?: Maybe<Scalars['BigDecimal']>;
  readonly amount1In_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount1In_lt?: Maybe<Scalars['BigDecimal']>;
  readonly amount1In_lte?: Maybe<Scalars['BigDecimal']>;
  readonly amount1In_not?: Maybe<Scalars['BigDecimal']>;
  readonly amount1In_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount1Out?: Maybe<Scalars['BigDecimal']>;
  readonly amount1Out_gt?: Maybe<Scalars['BigDecimal']>;
  readonly amount1Out_gte?: Maybe<Scalars['BigDecimal']>;
  readonly amount1Out_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amount1Out_lt?: Maybe<Scalars['BigDecimal']>;
  readonly amount1Out_lte?: Maybe<Scalars['BigDecimal']>;
  readonly amount1Out_not?: Maybe<Scalars['BigDecimal']>;
  readonly amount1Out_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amountUSD?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly amountUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly amountUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly logIndex?: Maybe<Scalars['BigInt']>;
  readonly logIndex_gt?: Maybe<Scalars['BigInt']>;
  readonly logIndex_gte?: Maybe<Scalars['BigInt']>;
  readonly logIndex_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly logIndex_lt?: Maybe<Scalars['BigInt']>;
  readonly logIndex_lte?: Maybe<Scalars['BigInt']>;
  readonly logIndex_not?: Maybe<Scalars['BigInt']>;
  readonly logIndex_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly pair?: Maybe<Scalars['String']>;
  readonly pair_contains?: Maybe<Scalars['String']>;
  readonly pair_ends_with?: Maybe<Scalars['String']>;
  readonly pair_gt?: Maybe<Scalars['String']>;
  readonly pair_gte?: Maybe<Scalars['String']>;
  readonly pair_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pair_lt?: Maybe<Scalars['String']>;
  readonly pair_lte?: Maybe<Scalars['String']>;
  readonly pair_not?: Maybe<Scalars['String']>;
  readonly pair_not_contains?: Maybe<Scalars['String']>;
  readonly pair_not_ends_with?: Maybe<Scalars['String']>;
  readonly pair_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pair_not_starts_with?: Maybe<Scalars['String']>;
  readonly pair_starts_with?: Maybe<Scalars['String']>;
  readonly sender?: Maybe<Scalars['Bytes']>;
  readonly sender_contains?: Maybe<Scalars['Bytes']>;
  readonly sender_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly sender_not?: Maybe<Scalars['Bytes']>;
  readonly sender_not_contains?: Maybe<Scalars['Bytes']>;
  readonly sender_not_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly timestamp?: Maybe<Scalars['BigInt']>;
  readonly timestamp_gt?: Maybe<Scalars['BigInt']>;
  readonly timestamp_gte?: Maybe<Scalars['BigInt']>;
  readonly timestamp_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_lt?: Maybe<Scalars['BigInt']>;
  readonly timestamp_lte?: Maybe<Scalars['BigInt']>;
  readonly timestamp_not?: Maybe<Scalars['BigInt']>;
  readonly timestamp_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly to?: Maybe<Scalars['Bytes']>;
  readonly to_contains?: Maybe<Scalars['Bytes']>;
  readonly to_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly to_not?: Maybe<Scalars['Bytes']>;
  readonly to_not_contains?: Maybe<Scalars['Bytes']>;
  readonly to_not_in?: Maybe<ReadonlyArray<Scalars['Bytes']>>;
}

export interface TokenDayData_Filter {
  readonly dailyTxns?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_gt?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_gte?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly dailyTxns_lt?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_lte?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_not?: Maybe<Scalars['BigInt']>;
  readonly dailyTxns_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly dailyVolumeETH?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_gt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_gte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeETH_lt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_lte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_not?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeToken?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken_gt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken_gte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeToken_lt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken_lte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken_not?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeToken_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly date?: Maybe<Scalars['Int']>;
  readonly date_gt?: Maybe<Scalars['Int']>;
  readonly date_gte?: Maybe<Scalars['Int']>;
  readonly date_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly date_lt?: Maybe<Scalars['Int']>;
  readonly date_lte?: Maybe<Scalars['Int']>;
  readonly date_not?: Maybe<Scalars['Int']>;
  readonly date_not_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly maxStored?: Maybe<Scalars['Int']>;
  readonly maxStored_gt?: Maybe<Scalars['Int']>;
  readonly maxStored_gte?: Maybe<Scalars['Int']>;
  readonly maxStored_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly maxStored_lt?: Maybe<Scalars['Int']>;
  readonly maxStored_lte?: Maybe<Scalars['Int']>;
  readonly maxStored_not?: Maybe<Scalars['Int']>;
  readonly maxStored_not_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly mostLiquidPairs?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidPairs_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidPairs_not?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidPairs_not_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly priceUSD?: Maybe<Scalars['BigDecimal']>;
  readonly priceUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly priceUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly priceUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly priceUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly priceUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly priceUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly priceUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly token?: Maybe<Scalars['String']>;
  readonly token_contains?: Maybe<Scalars['String']>;
  readonly token_ends_with?: Maybe<Scalars['String']>;
  readonly token_gt?: Maybe<Scalars['String']>;
  readonly token_gte?: Maybe<Scalars['String']>;
  readonly token_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly token_lt?: Maybe<Scalars['String']>;
  readonly token_lte?: Maybe<Scalars['String']>;
  readonly token_not?: Maybe<Scalars['String']>;
  readonly token_not_contains?: Maybe<Scalars['String']>;
  readonly token_not_ends_with?: Maybe<Scalars['String']>;
  readonly token_not_in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly token_not_starts_with?: Maybe<Scalars['String']>;
  readonly token_starts_with?: Maybe<Scalars['String']>;
  readonly totalLiquidityETH?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidityETH_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidityToken?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityToken_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityToken_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityToken_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidityToken_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityToken_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityToken_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityToken_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidityUSD?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidityUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
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
  readonly derivedETH?: Maybe<Scalars['BigDecimal']>;
  readonly derivedETH_gt?: Maybe<Scalars['BigDecimal']>;
  readonly derivedETH_gte?: Maybe<Scalars['BigDecimal']>;
  readonly derivedETH_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly derivedETH_lt?: Maybe<Scalars['BigDecimal']>;
  readonly derivedETH_lte?: Maybe<Scalars['BigDecimal']>;
  readonly derivedETH_not?: Maybe<Scalars['BigDecimal']>;
  readonly derivedETH_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly mostLiquidPairs?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidPairs_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidPairs_not?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidPairs_not_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
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
  readonly totalLiquidity?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidity_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidity_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidity_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidity_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidity_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidity_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidity_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly tradeVolume?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolumeUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly tradeVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolumeUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly tradeVolume_gt?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolume_gte?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolume_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly tradeVolume_lt?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolume_lte?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolume_not?: Maybe<Scalars['BigDecimal']>;
  readonly tradeVolume_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly txCount?: Maybe<Scalars['BigInt']>;
  readonly txCount_gt?: Maybe<Scalars['BigInt']>;
  readonly txCount_gte?: Maybe<Scalars['BigInt']>;
  readonly txCount_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly txCount_lt?: Maybe<Scalars['BigInt']>;
  readonly txCount_lte?: Maybe<Scalars['BigInt']>;
  readonly txCount_not?: Maybe<Scalars['BigInt']>;
  readonly txCount_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
}

export interface Transaction_Filter {
  readonly blockNumber?: Maybe<Scalars['BigInt']>;
  readonly blockNumber_gt?: Maybe<Scalars['BigInt']>;
  readonly blockNumber_gte?: Maybe<Scalars['BigInt']>;
  readonly blockNumber_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly blockNumber_lt?: Maybe<Scalars['BigInt']>;
  readonly blockNumber_lte?: Maybe<Scalars['BigInt']>;
  readonly blockNumber_not?: Maybe<Scalars['BigInt']>;
  readonly blockNumber_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly burns?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly burns_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly burns_not?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly burns_not_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly mints?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mints_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mints_not?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mints_not_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly swaps?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly swaps_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly swaps_not?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly swaps_not_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly timestamp?: Maybe<Scalars['BigInt']>;
  readonly timestamp_gt?: Maybe<Scalars['BigInt']>;
  readonly timestamp_gte?: Maybe<Scalars['BigInt']>;
  readonly timestamp_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timestamp_lt?: Maybe<Scalars['BigInt']>;
  readonly timestamp_lte?: Maybe<Scalars['BigInt']>;
  readonly timestamp_not?: Maybe<Scalars['BigInt']>;
  readonly timestamp_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
}

export interface UniswapDayData_Filter {
  readonly dailyVolumeETH?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_gt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_gte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeETH_lt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_lte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_not?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeETH_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly dailyVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly dailyVolumeUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly date?: Maybe<Scalars['Int']>;
  readonly date_gt?: Maybe<Scalars['Int']>;
  readonly date_gte?: Maybe<Scalars['Int']>;
  readonly date_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly date_lt?: Maybe<Scalars['Int']>;
  readonly date_lte?: Maybe<Scalars['Int']>;
  readonly date_not?: Maybe<Scalars['Int']>;
  readonly date_not_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly maxStored?: Maybe<Scalars['Int']>;
  readonly maxStored_gt?: Maybe<Scalars['Int']>;
  readonly maxStored_gte?: Maybe<Scalars['Int']>;
  readonly maxStored_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly maxStored_lt?: Maybe<Scalars['Int']>;
  readonly maxStored_lte?: Maybe<Scalars['Int']>;
  readonly maxStored_not?: Maybe<Scalars['Int']>;
  readonly maxStored_not_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly mostLiquidTokens?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidTokens_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidTokens_not?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidTokens_not_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly totalLiquidityETH?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidityETH_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidityUSD?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidityUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalVolumeETH?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalVolumeETH_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly txCount?: Maybe<Scalars['BigInt']>;
  readonly txCount_gt?: Maybe<Scalars['BigInt']>;
  readonly txCount_gte?: Maybe<Scalars['BigInt']>;
  readonly txCount_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly txCount_lt?: Maybe<Scalars['BigInt']>;
  readonly txCount_lte?: Maybe<Scalars['BigInt']>;
  readonly txCount_not?: Maybe<Scalars['BigInt']>;
  readonly txCount_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
}

export interface UniswapFactory_Filter {
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly mostLiquidTokens?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidTokens_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidTokens_not?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly mostLiquidTokens_not_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pairCount?: Maybe<Scalars['Int']>;
  readonly pairCount_gt?: Maybe<Scalars['Int']>;
  readonly pairCount_gte?: Maybe<Scalars['Int']>;
  readonly pairCount_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly pairCount_lt?: Maybe<Scalars['Int']>;
  readonly pairCount_lte?: Maybe<Scalars['Int']>;
  readonly pairCount_not?: Maybe<Scalars['Int']>;
  readonly pairCount_not_in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly pairs?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pairs_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pairs_not?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly pairs_not_contains?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly totalLiquidityETH?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidityETH_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityETH_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidityUSD?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalLiquidityUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalLiquidityUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalVolumeETH?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalVolumeETH_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeETH_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalVolumeUSD?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_gt?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_gte?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly totalVolumeUSD_lt?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_lte?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_not?: Maybe<Scalars['BigDecimal']>;
  readonly totalVolumeUSD_not_in?: Maybe<ReadonlyArray<Scalars['BigDecimal']>>;
  readonly txCount?: Maybe<Scalars['BigInt']>;
  readonly txCount_gt?: Maybe<Scalars['BigInt']>;
  readonly txCount_gte?: Maybe<Scalars['BigInt']>;
  readonly txCount_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly txCount_lt?: Maybe<Scalars['BigInt']>;
  readonly txCount_lte?: Maybe<Scalars['BigInt']>;
  readonly txCount_not?: Maybe<Scalars['BigInt']>;
  readonly txCount_not_in?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
}

export interface User_Filter {
  readonly id?: Maybe<Scalars['ID']>;
  readonly id_gt?: Maybe<Scalars['ID']>;
  readonly id_gte?: Maybe<Scalars['ID']>;
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: Maybe<Scalars['ID']>;
  readonly id_lte?: Maybe<Scalars['ID']>;
  readonly id_not?: Maybe<Scalars['ID']>;
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>;
}




export type PairsVolumeQueryVariables = Exact<{
  limit: Scalars['Int'];
  pairIds: ReadonlyArray<Scalars['ID']>;
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
  & Pick<Token, 'id' | 'symbol' | 'name'>
);

export type TopPairsQueryVariables = Exact<{
  limit: Scalars['Int'];
  excludeTokenIds: ReadonlyArray<Scalars['String']>;
}>;


export type TopPairsQuery = (
  { readonly __typename?: 'Query' }
  & { readonly pairs: ReadonlyArray<(
    { readonly __typename?: 'Pair' }
    & Pick<Pair, 'id' | 'reserve0' | 'reserve1' | 'volumeToken0' | 'volumeToken1'>
    & { readonly token0: (
      { readonly __typename?: 'Token' }
      & TokenInfoFragment
    ), readonly token1: (
      { readonly __typename?: 'Token' }
      & TokenInfoFragment
    ) }
  )> }
);

export type PairReservesQueryVariables = Exact<{
  token0: Scalars['String'];
  token1: Scalars['String'];
}>;


export type PairReservesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly pairs: ReadonlyArray<(
    { readonly __typename?: 'Pair' }
    & Pick<Pair, 'reserve0' | 'reserve1'>
  )> }
);

export type SwapsByPairQueryVariables = Exact<{
  skip: Scalars['Int'];
  timestamp: Scalars['BigInt'];
  pairAddress: Scalars['String'];
}>;


export type SwapsByPairQuery = (
  { readonly __typename?: 'Query' }
  & { readonly swaps: ReadonlyArray<(
    { readonly __typename?: 'Swap' }
    & Pick<Swap, 'id' | 'timestamp' | 'amount0In' | 'amount0Out' | 'amount1In' | 'amount1Out'>
  )> }
);

export type SwapsByTokensQueryVariables = Exact<{
  token0: Scalars['String'];
  token1: Scalars['String'];
}>;


export type SwapsByTokensQuery = (
  { readonly __typename?: 'Query' }
  & { readonly pairs: ReadonlyArray<(
    { readonly __typename?: 'Pair' }
    & Pick<Pair, 'id'>
  )> }
);
