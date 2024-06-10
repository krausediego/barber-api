export interface HealthCheck {
  run(params: HealthCheck.Params): Promise<HealthCheck.Response>;
}

export namespace HealthCheck {
  export interface Params {
    traceId?: string;
  }

  export type Response = {
    postgresql: boolean;
  };
}
