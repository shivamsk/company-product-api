import winston from 'winston';

export const logger = winston.createLogger({
    colorize: true,
    timestamp: true,
    level: 'info',
    stderrLevels: [
      'error',
      'debug',
      'info',
    ],
    transports: [
      new winston.transports.Console(),
    ],
});

