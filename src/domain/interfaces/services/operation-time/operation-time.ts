import { ICreateOperationTime } from '.';

export namespace IOperationTime {
  export type OperationTimeServicesNames = 'createOperationTime';

  export type OperationTimeServices = () => ICreateOperationTime;
}
