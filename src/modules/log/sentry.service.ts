import { SENTRY_DSN } from '../../common/constants/index';
import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

@Injectable()
export class SentryService {
  constructor() {
    Sentry.init({
      dsn: SENTRY_DSN,
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
    });
  }
}