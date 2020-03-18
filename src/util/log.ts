import { createLogger, transports, format } from 'winston';

// By default, log to two different files
const log = createLogger({
  level: 'info', // defines the minimum level that should be logged
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.File({
      /**
       * Anything below error level will not be logged
       */
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({
      /**
       * Since the default level is info, anything below level
       * (including debug) will not be logged to combined
       */
      filename: 'logs/combined.log',
    }),
  ],
});

// If environment isn't production, log to console
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  /**
   * Only console transport will log debug
   */
  log.add(new transports.Console({
    level: 'debug',
    format: format.combine(
      format.timestamp(),
      format.prettyPrint(),
    ),
  }));
}

export default log;
