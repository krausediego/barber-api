import { ICreateUserProfile, IFindUserProfile } from '.';

export namespace IUserProfile {
  export type UserProfileServicesNames =
    | 'createUserProfile'
    | 'findUserProfile';

  export type UserProfileServices = () => ICreateUserProfile | IFindUserProfile;
}
