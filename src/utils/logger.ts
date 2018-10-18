import { createLogger, format, transports } from "winston";

export const logger = createLogger();

if (process.env.NODE_ENV !== "production") {
    logger.add(new transports.Console({
        format: format.cli(),
    }));
}
