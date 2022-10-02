import { IResolvers } from "mercurius";
import { DateTimeResolver } from "graphql-scalars";
import {
  createGameResolver,
  createLocalGameResolver,
  gameResolver,
  gamesResolver,
  updateHoleResolver,
} from "./game";
import { userResolver, createUserResolver, updateUserResolver } from "./user";
import { getUsersByIds } from "../dataSources/user";

export const resolvers: IResolvers = {
  DateTime: DateTimeResolver,
  User: {
    id: (user) => user._id.toString(),
    name: (user) => user.name,
    email: (user) => user.email,
    emoji: (user) => user.emoji,
  },
  Game: {
    id: (game) => game._id.toString(),
    local: (game) => game.local,
    title: (game) => game.title,
    location: (game) => game.location,
    date: (game) => game.date,
    complete: (game) => game.complete,
    players: (game) =>
      game.local
        ? game.localPlayers.map((player) => ({
            ...player,
            email: "",
          }))
        : getUsersByIds(game.playerIds),
    holes: (game) => game.holes,
  },
  Hole: {
    id: (hole) => hole._id.toString(),
    number: (hole) => hole.number,
    par: (hole) => hole.par,
    scores: (hole) => hole.scores,
  },
  Query: {
    game: gameResolver,
    games: gamesResolver,
    user: userResolver,
  },
  Mutation: {
    createUser: createUserResolver,
    updateUser: updateUserResolver,
    createGame: createGameResolver,
    createLocalGame: createLocalGameResolver,
    updateHole: updateHoleResolver,
  },
};
