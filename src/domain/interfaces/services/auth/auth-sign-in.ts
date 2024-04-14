export interface IAuthSignIn {
  run(params: IAuthSignIn.Params): Promise<IAuthSignIn.Response>;
}

export namespace IAuthSignIn {
  export type Params = {
    email: string;
    password: string;
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: any;
  };

  export interface Response {
    token: string;
  }
}
