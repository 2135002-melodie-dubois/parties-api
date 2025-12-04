import { IUser } from '@src/models/User';
import UserRepo from '@src/repos/UserRepo';

/******************************************************************************
                                Functions
******************************************************************************/

function getAll(): Promise<IUser[]> {
  return UserRepo.getAll();
}

export default {
  getAll,
} as const;
