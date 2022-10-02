import { IResolvers } from "mercurius";
import {
  getGameById,
  getGamesByPlayerId,
  saveGame,
  saveLocalGame,
  updateHole,
  joinGame,
} from "../dataSources/game";

export const gameResolver: Required<IResolvers>["Query"]["game"] = async (
  _root,
  { id },
  _ctx,
  _info
) => {
  const game = await getGameById(id);
  return game;
};

export const gamesResolver: Required<IResolvers>["Query"]["games"] = async (
  _root,
  { playerId },
  _ctx,
  _info
) => {
  const games = await getGamesByPlayerId(playerId);
  return games;
};

export const createGameResolver: Required<IResolvers>["Mutation"]["createGame"] =
  async (_root, { game }, _ctx, _info) => {
    const saved = await saveGame(game);
    return saved;
  };

export const createLocalGameResolver: Required<IResolvers>["Mutation"]["createLocalGame"] =
  async (_root, { game }, _ctx, _info) => {
    const saved = await saveLocalGame(game);
    return saved;
  };

export const updateHoleResolver: Required<IResolvers>["Mutation"]["updateHole"] =
  async (_root, { hole }, _ctx, _info) => {
    const game = await updateHole(hole);
    return game;
  };

export const joinGameResolver: Required<IResolvers>["Mutation"]["joinGame"] =
  async (_root, { gameId, userId }, _ctx, _info) => {
    const game = await joinGame(gameId, userId);
    return game;
  };
