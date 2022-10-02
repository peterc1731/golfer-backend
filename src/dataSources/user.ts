import { Schema, model, Types, isValidObjectId } from "mongoose";

interface DBUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  emoji: string;
}

export type DataSourceUser = DBUser;

const userSchema = new Schema<DBUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  emoji: { type: String, required: true },
});

const UserModel = model<DBUser>("User", userSchema);

interface SaveUserParams {
  name: string;
  email: string;
  emoji: string;
}

interface UpdateUserParams {
  id: string;
  name?: string;
  email?: string;
  emoji?: string;
}

export const saveUser = async (
  params: SaveUserParams
): Promise<DataSourceUser> => {
  const user = new UserModel(params);
  const doc = await user.save();
  return doc.toObject();
};

export const getUserById = async (
  id: string
): Promise<DataSourceUser | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  const user = await UserModel.findById(id).exec();
  return user?.toObject() || null;
};

export const getUsersByIds = async (
  ids: string[]
): Promise<DataSourceUser[]> => {
  if (!ids.every((id) => isValidObjectId(id))) {
    return [];
  }

  const users = await UserModel.find({ _id: { $in: ids } }).exec();
  return users.map(doc => doc.toObject());
};

export const updateUser = async ({
  id,
  ...params
}: UpdateUserParams): Promise<DataSourceUser | null> => {
  const user = await UserModel.findByIdAndUpdate(id, params);
  return user?.toObject() || null;
};
