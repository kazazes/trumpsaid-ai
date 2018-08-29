import moment from "moment";
import winston from "winston";

const Logger = winston.Logger;
const config = winston.config;

const level = process.env.NODE_ENV === "development" ? "silly" : "debug";

// tslint:disable-next-line:no-var-requires
const LoggingWinston = require("@google-cloud/logging-winston").LoggingWinston;
const loggingWinston = new LoggingWinston();

const consoleLogging = new winston.transports.Console({
  timestamp() {
    return Date.now();
  },
  formatter(options) {
    const ts = moment().toISOString();
    return `${ts}   ${config.colorize(
      options.level,
      options.level.toUpperCase()
    )}   ${options.message ? options.message : ""} ${
      options.meta && Object.keys(options.meta).length
        ? "\n\t" + JSON.stringify(options.meta)
        : ""
    }
    `;
  }
});

const logger = new Logger({
  level,
  transports: [loggingWinston, consoleLogging]
});

export default logger;
