import { IAuthSignIn } from './auth-sign-in';
import { IAuthSignUp } from './auth-sign-up';

export namespace IAuth {
  export type AuthServicesNames = 'authSignIn' | 'authSignUp';

  export type AuthServices = () => IAuthSignIn | IAuthSignUp;
}
