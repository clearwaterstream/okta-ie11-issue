import StringUtil from "Util/StringUtil";

class WebStorageHelper {

    static isSessionStorageAvailable() {
        return this._storageAvailable(window.sessionStorage);
    }

    static isLocalStorageAvailable() {
        return this._storageAvailable(window.localStorage);
    }

    static _composeKey(area, key) {
        if (StringUtil.isNullOrEmpty(area)) {
            return key;
        }

        return `${area}_${key}`;
    }

    static setItem(area, key, value) {
        if (!this.isSessionStorageAvailable()) {
            return;
        }

        const compositeKey = this._composeKey(area, key);

        window.sessionStorage.setItem(compositeKey, value);
    }

    static setItemToDisk(area, key, value) {
        if (!this.isLocalStorageAvailable()) {
            return;
        }

        const compositeKey = this._composeKey(area, key);

        window.localStorage.setItem(compositeKey, value);
    }


    static getItem(area, key) {
        if (!this.isSessionStorageAvailable()) {
            return;
        }

        const compositeKey = this._composeKey(area, key);

        const val = window.sessionStorage.getItem(compositeKey);

        return val;
    }

    static removeItem(area, key) {
        if (!this.isSessionStorageAvailable()) {
            return;
        }

        const compositeKey = this._composeKey(area, key);

        window.sessionStorage.removeItem(compositeKey);
    }

    static getItemFromDisk(area, key) {
        if (!this.isLocalStorageAvailable()) {
            return;
        }

        const compositeKey = this._composeKey(area, key);

        const val = window.localStorage.getItem(compositeKey);

        return val;
    }

    static removeFromDisk(area, key) {
        if (!this.isLocalStorageAvailable()) {
            return;
        }

        const compositeKey = this._composeKey(area, key);

        window.localStorage.removeItem(compositeKey);
    }

    static clearAll() {
        if (!this.isSessionStorageAvailable()) {
            return;
        }

        window.sessionStorage.clear();
    }

    static _storageAvailable(storage) {

        if (StringUtil.isNullOrEmpty(storage)) {
            return false;
        }

        try {
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            const errorStoring = e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);

            return errorStoring;
        }
    }
}

export default WebStorageHelper;