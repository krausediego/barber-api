import { UserProfileController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { IUserProfile } from '@/domain/interfaces';
import { makeUserProfileService } from '@/main/factories/domain/services';

export const makeUserProfileController = (
  serviceName: IUserProfile.UserProfileServicesNames,
): Controller => {
  return new UserProfileController(
    serviceName,
    makeUserProfileService(serviceName),
  );
};
