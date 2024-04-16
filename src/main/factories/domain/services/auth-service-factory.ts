import { IAuth, IAuthSignIn, IAuthSignUp } from '@/domain/interfaces/services';
import { AuthSignInService, AuthSignUpService } from '@/domain/services';
import { makeUsersRepository } from '@/main/factories/domain/repositories';
import { makeHash, makeLogging, makeToken } from '@/main/factories/infra';

const authSignIn = (): IAuthSignIn => {
  return new AuthSignInService(
    makeLogging(),
    makeUsersRepository(),
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

const services = {
  authSignIn,
  authSignUp,
};

export const makeAuthService = (
  serviceName: IAuth.AuthServicesNames,
): IAuth.AuthServices => {
  return services[serviceName];
};
