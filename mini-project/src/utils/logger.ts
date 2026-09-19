import winston from "winston";

const { combine, timestamp, printf } = winston.format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}] ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});