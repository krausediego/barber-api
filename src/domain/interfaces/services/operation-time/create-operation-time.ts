import { IOperationsTimesRepository } from '@/domain/interfaces';

export interface ICreateOperationTime {
  run(
    params: ICreateOperationTime.Params,
  ): Promise<ICreateOperationTime.Response>;
}

export namespace ICreateOperationTime {
  export type Params = IOperationsTimesRepository.CreateOperationTime & {
    traceId?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: any;
  };

  export interface Response {
    operationTime: IOperationsTimesRepository.OperationTime;
  }
}
