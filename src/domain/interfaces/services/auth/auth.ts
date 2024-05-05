import { IAuthSignIn } from './auth-sign-in';
import { IAuthSignOut } from './auth-sign-out';
import { IAuthSignUp } from './auth-sign-up';

export namespace IAuth {
  export type AuthServicesNames = 'authSignIn' | 'authSignUp' | 'authSignOut';
  export type AuthServices = () => IAuthSignIn | IAuthSignUp | IAuthSignOut;
}
