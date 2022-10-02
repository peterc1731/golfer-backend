import { Schema, model, Types, isValidObjectId } from "mongoose";
import { getUsersByIds } from "./user";

interface DBHole {
  _id: Types.ObjectId;
  number: number;
  par: number;
  scores: {
    playerId: string;
    score: number;
  }[];
}

interface DBGame {
  _id: Types.ObjectId;
  local: boolean;
  title: string;
  location: string;
  date: string;
  complete: boolean;
  playerIds: string[];
  localPlayers: { name: string; emoji: string; _id: Types.ObjectId }[];
  holes: DBHole[];
}

export type DataSourceGame = DBGame;
export type DataSourceHole = DBHole;

const holeSchema = new Schema<DBHole>({
  number: { type: Number, required: true },
  par: { type: Number, required: true },
  scores: {
    type: [
      new Schema({
        playerId: { type: String, required: true },
        score: { type: Number, required: true },
      }),
    ],
    required: true,
  },
});

const gameSchema = new Schema<DBGame>({
  local: { type: Boolean, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  complete: { type: Boolean, required: true, default: false },
  playerIds: { type: [String] },
  localPlayers: {
    type: [
      new Schema({
        name: { type: String, required: true },
        emoji: { type: String, required: true },
      }),
    ],
  },
  holes: { type: [holeSchema], required: true },
});

const GameModel = model<DBGame>("Game", gameSchema);

interface SaveParams {
  title: string;
  location: string;
  date: Date;
  playerIds: string[];
}

interface SaveLocalParams {
  title: string;
  location: string;
  date: Date;
  players: { name: string; emoji: string }[];
}

interface UpdateHoleParams {
  gameId: string;
  playerId: string;
  hole: number;
  score: number;
}

export const saveGame = async (params: SaveParams): Promise<DataSourceGame> => {
  if (!params.playerIds.length) {
    throw new Error("Invalid Player ID");
  }

  const users = await getUsersByIds(params.playerIds);

  if (users.length !== params.playerIds.length) {
    throw new Error("Invalid Player ID");
  }

  const game = new GameModel({
    ...params,
    date: params.date.toISOString(),
    local: false,
    holes: [
      {
        number: 1,
        par: 0,
        scores: params.playerIds.map((id) => ({ playerId: id, score: 0 })),
      },
    ],
  });
  const doc = await game.save();
  return doc.toObject();
};

export const saveLocalGame = async (
  params: SaveLocalParams
): Promise<DataSourceGame> => {
  const players = params.players.map((player) => ({
    ...player,
    _id: new Types.ObjectId(),
  }));

  const game = new GameModel({
    ...params,
    date: params.date.toISOString(),
    localPlayers: players,
    local: true,
    holes: [
      {
        number: 1,
        par: 0,
        scores: players.map(({ _id }) => ({ playerId: _id, score: 0 })),
      },
    ],
  });

  const doc = await game.save();
  return doc.toObject();
};

export const getGameById = async (
  id: string
): Promise<DataSourceGame | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  const game = await GameModel.findById(id).exec();
  return game?.toObject() || null;
};

export const getGamesByPlayerId = async (
  id: string
): Promise<DataSourceGame[]> => {
  if (!isValidObjectId(id)) {
    return [];
  }

  const games = await GameModel.find({ playerIds: id });
  return games.map(doc => doc.toObject());
};

export const updateHole = async (
  params: UpdateHoleParams
): Promise<DataSourceGame | null> => {
  if (!isValidObjectId(params.gameId) || !isValidObjectId(params.playerId)) {
    return null;
  }

  const game = await GameModel.findById(params.gameId).exec();

  if (!game) {
    return null;
  }

  const updatedHoles = game.toObject().holes.map((hole) => ({
    ...hole,
    scores:
      hole.number === params.hole
        ? hole.scores.map((score) => ({
            playerId: score.playerId,
            score:
              score.playerId === params.playerId ? params.score : score.score,
          }))
        : hole.scores,
  }));

  const newGame = await GameModel.findByIdAndUpdate(params.gameId, {
    holes: updatedHoles,
  });

  return newGame?.toObject() || null;
};

export const joinGame = async (
  gameId: string,
  userId: string
): Promise<DataSourceGame | null> => {
  if (!isValidObjectId(gameId) || !isValidObjectId(userId)) {
    return null;
  }

  const game = await GameModel.findById(gameId).exec();

  if (!game || game.local || game.playerIds.includes(userId)) {
    return null;
  }

  const updatedHoles = game.toObject().holes.map((hole) => ({
    ...hole,
    scores: [...hole.scores, { playerId: userId, score: 0 }],
  }));

  const updatedPlayerIds = [...game.playerIds, userId];

  const newGame = await GameModel.findByIdAndUpdate(gameId, {
    holes: updatedHoles,
    playerIds: updatedPlayerIds,
  });

  return newGame?.toObject() || null;
};
