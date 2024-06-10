import { ICreateUserProfile, IFindUserProfile, IUpdateUserProfile } from '.';

export namespace IUserProfile {
  export type UserProfileServicesNames =
    | 'createUserProfile'
    | 'findUserProfile'
    | 'updateUserProfile';

  export type UserProfileServices = () =>
    | ICreateUserProfile
    | IFindUserProfile
    | IUpdateUserProfile;
}
