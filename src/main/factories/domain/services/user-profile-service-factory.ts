import {
  IUserProfile,
  ICreateUserProfile,
  IFindUserProfile,
  IUpdateUserProfile,
} from '@/domain/interfaces/services';
import {
  CreateUserProfileService,
  FindUserProfileService,
  UpdateUserProfileService,
} from '@/domain/services';
import {
  makeUsersProfilesRepository,
  makeUsersRepository,
} from '@/main/factories/domain/repositories';
import {
  makeSupabaseStorageFactory,
  makeLogging,
} from '@/main/factories/infra';

const createUserProfile = (): ICreateUserProfile => {
  return new CreateUserProfileService(
    makeLogging(),
    makeUsersProfilesRepository(),
    makeUsersRepository(),
    makeSupabaseStorageFactory(),
  );
};

const findUserProfile = (): IFindUserProfile => {
  return new FindUserProfileService(
    makeLogging(),
    makeUsersProfilesRepository(),
  );
};

const updateUserProfile = (): IUpdateUserProfile => {
  return new UpdateUserProfileService(
    makeLogging(),
    makeUsersProfilesRepository(),
    makeSupabaseStorageFactory(),
  );
};

const services = {
  createUserProfile,
  findUserProfile,
  updateUserProfile,
};

export const makeUserProfileService = (
  serviceName: IUserProfile.UserProfileServicesNames,
): IUserProfile.UserProfileServices => {
  return services[serviceName];
};
