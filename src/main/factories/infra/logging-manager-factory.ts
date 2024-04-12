import { LoggingManager } from '@/domain/interfaces';
import { PinoLoggingAdapter } from '@/infra/logging';

export const makeLogging = (): LoggingManager => {
  return new PinoLoggingAdapter();
};
