import { gql } from "mercurius-codegen";

export const schema = gql`
  scalar DateTime

  type User {
    id: ID!
    name: String!
    email: String!
    emoji: String!
  }

  type Score {
    playerId: ID!
    score: Int!
  }

  type Hole {
    id: ID!
    number: Int!
    par: Int!
    scores: [Score!]!
  }

  type Game {
    id: ID!
    local: Boolean!
    title: String!
    location: String!
    date: DateTime!
    complete: Boolean!
    players: [User!]!
    holes: [Hole!]!
  }

  input CreateUserParams {
    name: String!
    email: String!
    emoji: String!
  }

  input UpdateUserParams {
    id: String!
    name: String
    email: String
    emoji: String
  }

  input CreateGameParams {
    title: String!
    location: String!
    date: DateTime!
    playerIds: [String!]!
  }

  input LocalPlayer {
    name: String!
    emoji: String!
  }

  input CreateLocalGameParams {
    title: String!
    location: String!
    date: DateTime!
    players: [LocalPlayer!]!
  }

  input UpdateHoleParams {
    gameId: String!
    playerId: String!
    hole: Int!
    score: Int!
  }

  type Query {
    user(id: String!): User
    game(id: String!): Game
    games(playerId: String!): [Game!]!
  }

  type Mutation {
    createUser(user: CreateUserParams!): User!
    updateUser(user: UpdateUserParams!): User
    createGame(game: CreateGameParams!): Game!
    createLocalGame(game: CreateLocalGameParams!): Game!
    updateHole(hole: UpdateHoleParams!): Game
    joinGame(gameId: String!, userId: String!): Game
  }
`;
