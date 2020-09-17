import 'winston-daily-rotate-file';
import winston, { Logger } from 'winston';

// import logConfig from '../../config/development/log.json';


// class ApplicationLogger  {
//
//   constructor (logConfig) {
//     console.log(JSON.stringify(logConfig));
//     // super({
//     //   transports: [
//     //     new (winston.transports.Console)(logConfig.console),
//     //     new (winston.transports.DailyRotateFile)(logConfig.file)
//     //   ]
//     // });
//
//
//
//   }
// }


export function getLogger(logConfig){

  const applicationLogger = winston.createLogger({
    transports: [
      new winston.transports.Console()
    ]
  });

  applicationLogger.configure(logConfig.console);

  return applicationLogger;


}


// export default ApplicationLogger;

