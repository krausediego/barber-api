import { BaseService } from '@/application/helpers';
import {
  HealthCheck,
  LoggingManager,
  ManagerPrisma,
} from '@/domain/interfaces';

export class HealthCheckService extends BaseService implements HealthCheck {
  constructor(
    protected readonly logger: LoggingManager,
    private readonly prismaManager: ManagerPrisma,
  ) {
    super(logger);
  }

  async run({ traceId }: HealthCheck.Params): Promise<HealthCheck.Response> {
    this.traceId = traceId;

    const connections = {
      postgresql: false,
    };

    this.log('info', 'Check healths.');

    const postgresqlConnection = await this.prismaManager.checkConnection();
    connections.postgresql = postgresqlConnection;
    this.log('info', 'Postgresql', { postgresqlConnection });

    return connections;
  }
}
