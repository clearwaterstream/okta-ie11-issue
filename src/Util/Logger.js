import StringUtil from "Util/StringUtil";

class Logger
{
    _name = '';
    _level = '';
    static DefaultLevel = 'debug'
    static MinLogLevel = 'debug';

    constructor(name, level) {
        this._name = name;
        this._level = level;

        if(StringUtil.isNullOrEmpty(level)) {
            this._level = Logger.DefaultLevel;
        }
    }

    _padding(n) {
		return n < 10 ? '0' + n : '' + n;
	}

	_ts() {
		const dt = new Date();
		return (
			[this._padding(dt.getMinutes()), this._padding(dt.getSeconds())].join(
				':'
			) +
			'.' +
			dt.getMilliseconds()
		);
    }
    
    _constructMessage(message)
    {
        const formatted = `[${this._level}] ${this._ts()} ${this._name} - ${message}`;

        return formatted;
    }

    trace(message, ...optionalParams) {
        const msgToLog = this._constructMessage(message);
        
        console.trace(msgToLog, ...optionalParams);
    }

    debug(message, ...optionalParams) {
        const msgToLog = this._constructMessage(message);
        
        console.debug(msgToLog, ...optionalParams);
    }

    info(message, ...optionalParams) {
        const msgToLog = this._constructMessage(message);
        
        console.info(msgToLog, ...optionalParams);
    }

    warn(message, ...optionalParams)
    {
        const msgToLog = this._constructMessage(message);
        
        console.warn(msgToLog, ...optionalParams);
    }

    error(message, ...optionalParams)
    {
        const msgToLog = this._constructMessage(message);
        
        console.error(msgToLog, ...optionalParams);
    }
}

export default Logger;