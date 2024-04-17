import { ICreateUserProfile } from './create-user-profile';
import { IFindUserProfile } from './find-user-profile';

export namespace IUserProfile {
  export type UserProfileServicesNames =
    | 'createUserProfile'
    | 'findUserProfile';

  export type UserProfileServices = () => ICreateUserProfile | IFindUserProfile;
}
