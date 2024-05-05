import {
  IAuth,
  IAuthSignIn,
  IAuthSignOut,
  IAuthSignUp,
} from '@/domain/interfaces/services';
import {
  AuthSignInService,
  AuthSignOutService,
  AuthSignUpService,
} from '@/domain/services';
import {
  makeCompaniesUsersRepository,
  makeUsersRepository,
} from '@/main/factories/domain/repositories';
import { makeHash, makeLogging, makeToken } from '@/main/factories/infra';

const authSignIn = (): IAuthSignIn => {
  return new AuthSignInService(
    makeLogging(),
    makeUsersRepository(),
    makeCompaniesUsersRepository(),
    makeHash(),
    makeToken(),
  );
};

const authSignUp = (): IAuthSignUp => {
  return new AuthSignUpService(
    makeLogging(),
    makeUsersRepository(),
    makeHash(),
  );
};

const authSignOut = (): IAuthSignOut => {
  return new AuthSignOutService(makeLogging());
};

const services = {
  authSignIn,
  authSignUp,
  authSignOut,
};

export const makeAuthService = (
  serviceName: IAuth.AuthServicesNames,
): IAuth.AuthServices => {
  return services[serviceName];
};
