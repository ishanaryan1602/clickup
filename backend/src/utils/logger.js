import winston from 'winston';
import path from 'path';

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
        new transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
        }),
        new transports.File({
            filename: path.join('logs', 'combined.log'),
        }),
    ],
    exceptionHandlers: [
        new transports.File({ filename: path.join('logs', 'exceptions.log') }),
    ],
    rejectionHandlers: [
        new transports.File({ filename: path.join('logs', 'rejections.log') }),
    ],
});

export default logger;
