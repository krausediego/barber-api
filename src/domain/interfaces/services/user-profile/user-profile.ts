import { ICreateUserProfile } from './create-user-profile';

export namespace IUserProfile {
  export type UserProfileServicesNames = 'createUserProfile';

  export type UserProfileServices = () => ICreateUserProfile;
}
