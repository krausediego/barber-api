import { IUserProfile, ICreateUserProfile } from '@/domain/interfaces/services';
import { CreateUserProfileService } from '@/domain/services';
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

const services = {
  createUserProfile,
};

export const makeUserProfileService = (
  serviceName: IUserProfile.UserProfileServicesNames,
): IUserProfile.UserProfileServices => {
  return services[serviceName];
};
