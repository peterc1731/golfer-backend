import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import type { DataSourceUser } from "../dataSources/user";
import type { DataSourceGame, DataSourceHole } from "../dataSources/game";
import type { MercuriusContext } from "mercurius";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) =>
  | Promise<import("mercurius-codegen").DeepPartial<TResult>>
  | import("mercurius-codegen").DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  _FieldSet: any;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  emoji: Scalars["String"];
};

export type Score = {
  __typename?: "Score";
  playerId: Scalars["ID"];
  score: Scalars["Int"];
};

export type Hole = {
  __typename?: "Hole";
  id: Scalars["ID"];
  number: Scalars["Int"];
  par: Scalars["Int"];
  scores: Array<Score>;
};

export type Game = {
  __typename?: "Game";
  id: Scalars["ID"];
  local: Scalars["Boolean"];
  title: Scalars["String"];
  location: Scalars["String"];
  date: Scalars["DateTime"];
  complete: Scalars["Boolean"];
  players: Array<User>;
  holes: Array<Hole>;
};

export type CreateUserParams = {
  name: Scalars["String"];
  email: Scalars["String"];
  emoji: Scalars["String"];
};

export type UpdateUserParams = {
  id: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  emoji?: InputMaybe<Scalars["String"]>;
};

export type CreateGameParams = {
  title: Scalars["String"];
  location: Scalars["String"];
  date: Scalars["DateTime"];
  playerIds: Array<Scalars["String"]>;
};

export type LocalPlayer = {
  name: Scalars["String"];
  emoji: Scalars["String"];
};

export type CreateLocalGameParams = {
  title: Scalars["String"];
  location: Scalars["String"];
  date: Scalars["DateTime"];
  players: Array<LocalPlayer>;
};

export type UpdateHoleParams = {
  gameId: Scalars["String"];
  playerId: Scalars["String"];
  hole: Scalars["Int"];
  score: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  game?: Maybe<Game>;
  games: Array<Game>;
};

export type QueryuserArgs = {
  id: Scalars["String"];
};

export type QuerygameArgs = {
  id: Scalars["String"];
};

export type QuerygamesArgs = {
  playerId: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  updateUser?: Maybe<User>;
  createGame: Game;
  createLocalGame: Game;
  updateHole?: Maybe<Game>;
  joinGame?: Maybe<Game>;
};

export type MutationcreateUserArgs = {
  user: CreateUserParams;
};

export type MutationupdateUserArgs = {
  user: UpdateUserParams;
};

export type MutationcreateGameArgs = {
  game: CreateGameParams;
};

export type MutationcreateLocalGameArgs = {
  game: CreateLocalGameParams;
};

export type MutationupdateHoleArgs = {
  hole: UpdateHoleParams;
};

export type MutationjoinGameArgs = {
  gameId: Scalars["String"];
  userId: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  DateTime: ResolverTypeWrapper<string>;
  User: ResolverTypeWrapper<DataSourceUser>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Score: ResolverTypeWrapper<Score>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Hole: ResolverTypeWrapper<DataSourceHole>;
  Game: ResolverTypeWrapper<DataSourceGame>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  CreateUserParams: CreateUserParams;
  UpdateUserParams: UpdateUserParams;
  CreateGameParams: CreateGameParams;
  LocalPlayer: LocalPlayer;
  CreateLocalGameParams: CreateLocalGameParams;
  UpdateHoleParams: UpdateHoleParams;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  DateTime: string;
  User: DataSourceUser;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Score: Score;
  Int: Scalars["Int"];
  Hole: DataSourceHole;
  Game: DataSourceGame;
  Boolean: Scalars["Boolean"];
  CreateUserParams: CreateUserParams;
  UpdateUserParams: UpdateUserParams;
  CreateGameParams: CreateGameParams;
  LocalPlayer: LocalPlayer;
  CreateLocalGameParams: CreateLocalGameParams;
  UpdateHoleParams: UpdateHoleParams;
  Query: {};
  Mutation: {};
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type UserResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  emoji?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScoreResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Score"] = ResolversParentTypes["Score"]
> = {
  playerId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  score?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HoleResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Hole"] = ResolversParentTypes["Hole"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  number?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  par?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  scores?: Resolver<Array<ResolversTypes["Score"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Game"] = ResolversParentTypes["Game"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  local?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  location?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  date?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  complete?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  holes?: Resolver<Array<ResolversTypes["Hole"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryuserArgs, "id">
  >;
  game?: Resolver<
    Maybe<ResolversTypes["Game"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygameArgs, "id">
  >;
  games?: Resolver<
    Array<ResolversTypes["Game"]>,
    ParentType,
    ContextType,
    RequireFields<QuerygamesArgs, "playerId">
  >;
};

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateUserArgs, "user">
  >;
  updateUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationupdateUserArgs, "user">
  >;
  createGame?: Resolver<
    ResolversTypes["Game"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateGameArgs, "game">
  >;
  createLocalGame?: Resolver<
    ResolversTypes["Game"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateLocalGameArgs, "game">
  >;
  updateHole?: Resolver<
    Maybe<ResolversTypes["Game"]>,
    ParentType,
    ContextType,
    RequireFields<MutationupdateHoleArgs, "hole">
  >;
  joinGame?: Resolver<
    Maybe<ResolversTypes["Game"]>,
    ParentType,
    ContextType,
    RequireFields<MutationjoinGameArgs, "gameId" | "userId">
  >;
};

export type Resolvers<ContextType = MercuriusContext> = {
  DateTime?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Score?: ScoreResolvers<ContextType>;
  Hole?: HoleResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};

export type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import("fastify").FastifyReply;
  }
) => Promise<Array<import("mercurius-codegen").DeepPartial<TReturn>>>;
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = import("mercurius").MercuriusContext & {
    reply: import("fastify").FastifyReply;
  }
> {
  User?: {
    id?: LoaderResolver<Scalars["ID"], User, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], User, {}, TContext>;
    email?: LoaderResolver<Scalars["String"], User, {}, TContext>;
    emoji?: LoaderResolver<Scalars["String"], User, {}, TContext>;
  };

  Score?: {
    playerId?: LoaderResolver<Scalars["ID"], Score, {}, TContext>;
    score?: LoaderResolver<Scalars["Int"], Score, {}, TContext>;
  };

  Hole?: {
    id?: LoaderResolver<Scalars["ID"], Hole, {}, TContext>;
    number?: LoaderResolver<Scalars["Int"], Hole, {}, TContext>;
    par?: LoaderResolver<Scalars["Int"], Hole, {}, TContext>;
    scores?: LoaderResolver<Array<Score>, Hole, {}, TContext>;
  };

  Game?: {
    id?: LoaderResolver<Scalars["ID"], Game, {}, TContext>;
    local?: LoaderResolver<Scalars["Boolean"], Game, {}, TContext>;
    title?: LoaderResolver<Scalars["String"], Game, {}, TContext>;
    location?: LoaderResolver<Scalars["String"], Game, {}, TContext>;
    date?: LoaderResolver<Scalars["DateTime"], Game, {}, TContext>;
    complete?: LoaderResolver<Scalars["Boolean"], Game, {}, TContext>;
    players?: LoaderResolver<Array<User>, Game, {}, TContext>;
    holes?: LoaderResolver<Array<Hole>, Game, {}, TContext>;
  };
}
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
