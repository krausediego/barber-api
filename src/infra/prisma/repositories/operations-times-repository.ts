import { IOperationsTimesRepository, ManagerPrisma } from '@/domain/interfaces';

export class OperationsTimesRepository implements IOperationsTimesRepository {
  constructor(private readonly prismaManager: ManagerPrisma) {}

  async create(
    data: IOperationsTimesRepository.CreateOperationTime,
  ): Promise<IOperationsTimesRepository.OperationTime> {
    return this.prismaManager.getPrisma().operationTime.create({ data });
  }

  async findByCompanyId({
    companyId,
  }: IOperationsTimesRepository.FindByCompanyId): Promise<IOperationsTimesRepository.OperationTime | null> {
    return this.prismaManager
      .getPrisma()
      .operationTime.findUnique({ where: { companyId } });
  }
}
