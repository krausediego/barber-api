import { IAuthSignIn, IAuthSignOut, IAuthSignUp } from '.';

export namespace IAuth {
  export type AuthServicesNames = 'authSignIn' | 'authSignUp' | 'authSignOut';
  export type AuthServices = () => IAuthSignIn | IAuthSignUp | IAuthSignOut;
}
