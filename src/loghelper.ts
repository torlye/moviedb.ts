export const LOG_DEBUG = 10;
export const LOG_INFO = 20;
export const LOG_WARN = 30;
export const LOG_ERROR = 40;

export type LOG_DEBUG = typeof LOG_DEBUG;
export type LOG_INFO = typeof LOG_INFO;
export type LOG_WARN = typeof LOG_WARN;
export type LOG_ERROR = typeof LOG_ERROR;

export type LogLevel = LOG_DEBUG|LOG_INFO|LOG_WARN|LOG_ERROR;

function getCurrentLogLevel() :LogLevel
{
    return LOG_WARN;
}

export function log(message: string, level:LogLevel) {
    const currentLogLevel = getCurrentLogLevel();
    if (level >= currentLogLevel) {
        if (level >= LOG_ERROR) {
            console.error(message);
        }
        else if (level >= LOG_WARN) {
            console.warn(message);
        }
        else {
            console.log(message);
        }
    }
}