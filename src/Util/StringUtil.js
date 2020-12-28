class StringUtil {
    static isEqual(text, other) {
        if (this.isNullOrEmpty(text) && this.isNullOrEmpty(other))
            return true;

        if ((typeof text === 'string' || text instanceof String) && (typeof other === 'string' || other instanceof String)) {
            const r = text.localeCompare(other, undefined, { sensitivity: 'base' });

            return r === 0;
        }

        return false;
    }

    static isEither(text, ...args) {
        if (this.isNullOrEmpty(text)) {
            return false;
        }

        if (args === null || typeof args === typeof undefined) {
            return false;
        }

        for (var v of args) {
            if (this.isEqual(text, v)) {
                return true;
            }
        }

        return false;
    }

    static contains(text, other) {
        if (this.isNullOrEmpty(text))
            return false;

        if ((typeof text === 'string' || text instanceof String) && (typeof other === 'string' || other instanceof String)) {
            const r = text.toLowerCase().includes(other.toLowerCase());

            return r;
        }

        return false;
    }

    static containsAny(text, ...otherArr) {
        if (this.isNullOrEmpty(text))
            return false;

        if (this.isNullOrEmpty(otherArr) || otherArr.length === 0)
            return false;

        for (const other of otherArr) {
            const res = this.contains(text, other);

            if (res === true) {
                return res; // BREAK!!!
            }
        }

        return false;
    }

    static isNullOrEmpty(text) {
        if (text === undefined || typeof (text) === typeof (undefined) || text === 'undefined')
            return true;

        if (text === null)
            return true;

        if (text === '')
            return true;

        return false;
    }

    static isNullEmptyOrWhiteSpace(text) {
        const result = this.isNullOrEmpty(text);

        if (result)
            return result;

        if (text.trim && text.trim() === '')
            return true;

        return false;
    }

    static extractDigits(text) {
        if (this.isNullOrEmpty(text)) {
            return text;
        }

        const cleanValue = text.replace(/[^\d]/g, "");

        return cleanValue;
    }

    static startsWith(text, other) {
        if (this.isNullOrEmpty(text))
            return false;

        if ((typeof text === 'string' || text instanceof String) && (typeof other === 'string' || other instanceof String)) {
            const r = text.toLowerCase().startsWith(other.toLowerCase());

            return r;
        }

        return false;
    }

    static endsWith(text, other) {
        if (this.isNullOrEmpty(text))
            return false;

        if ((typeof text === 'string' || text instanceof String) && (typeof other === 'string' || other instanceof String)) {
            const r = text.toLowerCase().endsWith(other.toLowerCase());

            return r;
        }

        return false;
    }

    static compareOrdinality(a, b) {

        if ((a === undefined || typeof (a) === typeof (undefined) || a === 'undefined') &&
            (b === undefined || typeof (b) === typeof (undefined) || b === 'undefined'))
            return 0;


        if (a === undefined || typeof (a) === typeof (undefined) || a === 'undefined')
            return -1;

        if (b === undefined || typeof (b) === typeof (undefined) || b === 'undefined')
            return 1;

        let _a, _b;

        if (!(typeof a === 'string' || a instanceof String))
            _a = a.toString();
        else
            _a = a.toLowerCase();

        if (!(typeof b === 'string' || b instanceof String))
            _b = b.toString();
        else
            _b = b.toLowerCase()

        let comparison = 0;
        if (_a > _b)
            comparison = 1;
        else if (_a < _b)
            comparison = -1;

        return comparison;
    }
}

export default StringUtil;