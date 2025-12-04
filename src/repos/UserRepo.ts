import { IUser, User } from '@src/models/User';

async function getAll(): Promise<IUser[]> {
  const users = await User.find();
  return users;
}

export default {
  getAll,
} as const;
