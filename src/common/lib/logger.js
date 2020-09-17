import winston from 'winston';

export function getLogger() {

  const applicationLogger = winston.createLogger({
    "colorize": true,
    "timestamp": true,
    "level": "info",
    "stderrLevels": [
      "error",
      "debug",
      "info"
    ],
    transports: [
      new winston.transports.Console()
    ]
  });

  return applicationLogger;


}

