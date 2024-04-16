export interface IOperationsTimesRepository {
  create(
    data: IOperationsTimesRepository.CreateOperationTime,
  ): Promise<IOperationsTimesRepository.OperationTime>;
  findByCompanyId(
    data: IOperationsTimesRepository.FindByCompanyId,
  ): Promise<IOperationsTimesRepository.OperationTime | null>;
}

export namespace IOperationsTimesRepository {
  export interface OperationTime {
    id: string;
    startMorning: string;
    endMorning: string | null;
    startAfternoon: string | null;
    endAfternoon: string;
    createdAt: Date;
    updatedAt: Date | null;
  }

  export interface CreateOperationTime {
    startMorning: string;
    endAfternoon: string;
    companyId: string;
    endMorning: string | null;
    startAfternoon: string | null;
  }

  export interface FindByCompanyId {
    companyId: string;
  }
}
