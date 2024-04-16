import { ICreateOperationTime } from './create-operation-time';

export namespace IOperationTime {
  export type OperationTimeServicesNames = 'createOperationTime';

  export type OperationTimeServices = () => ICreateOperationTime;
}
