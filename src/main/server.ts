import '@/main/config/dotenv';

import { App } from '@/main/config/app';
import env from '@/main/config/environments/application';
import { makeLogging } from '@/main/factories/infra';

class ServerSetup {
  private logger = makeLogging();

  private app!: App;

  async start(): Promise<void> {
    this.logger.info('Initialing setup of services...');
    this.app = (await import('./config/app')).default;
    this.app.listen(env.port);
  }

  async stop(): Promise<void> {
    this.logger.debug('Initialing graceful shutdown...');
    await this.app.disconnect();
    this.logger.debug('Finished graceful shutdown...');
    process.exitCode = 1;
  }
}

const serviceSetup = new ServerSetup();
serviceSetup.start();

process.on('SIGTERM', async () => {
  await serviceSetup.stop();
});
