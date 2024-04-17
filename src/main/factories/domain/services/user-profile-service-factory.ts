import {
  IUserProfile,
  ICreateUserProfile,
  IFindUserProfile,
} from '@/domain/interfaces/services';
import {
  CreateUserProfileService,
  FindUserProfileService,
} from '@/domain/services';
import {
  makeUsersProfilesRepository,
  makeUsersRepository,
} from '@/main/factories/domain/repositories';
import { makeGCPStorage, makeLogging } from '@/main/factories/infra';

const createUserProfile = (): ICreateUserProfile => {
  return new CreateUserProfileService(
    makeLogging(),
    makeUsersProfilesRepository(),
    makeUsersRepository(),
    makeGCPStorage(),
  );
};

const findUserProfile = (): IFindUserProfile => {
  return new FindUserProfileService(
    makeLogging(),
    makeUsersProfilesRepository(),
  );
};

const services = {
  createUserProfile,
  findUserProfile,
};

export const makeUserProfileService = (
  serviceName: IUserProfile.UserProfileServicesNames,
): IUserProfile.UserProfileServices => {
  return services[serviceName];
};
