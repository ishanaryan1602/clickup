import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { createLogger, format, transports } = winston;

winston.addColors({
    info: 'green',
    warn: 'yellow',
    error: 'red',
    debug: 'gray',
});

const loggerFormat = format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
);

const logger = createLogger({
    level: 'info',
    format: loggerFormat,
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.printf(
                    ({ level, message, timestamp, stack }) =>
                        `[${timestamp}] [${level}]:${stack || message}`
                )
            ),
        }),
    ],
    // exitOnError: false,
});

export default logger;
