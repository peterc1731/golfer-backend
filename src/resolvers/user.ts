import { IResolvers } from "mercurius";
import { getUserById, saveUser, updateUser } from "../dataSources/user";

export const userResolver: Required<IResolvers>["Query"]["user"] = async (
  _root,
  { id },
  _ctx,
  _info
) => {
  const user = await getUserById(id);
  return user;
};

export const createUserResolver: Required<IResolvers>["Mutation"]["createUser"] =
  async (_root, { user: userToSave }, _ctx, _info) => {
    const user = await saveUser(userToSave);
    return user;
  };

export const updateUserResolver: Required<IResolvers>["Mutation"]["updateUser"] =
  async (_root, { user: userToUpdate }, _ctx, _info) => {
    const user = await updateUser(userToUpdate);
    return user;
  };
