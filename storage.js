define([], function () {
    'use strict';



    /*
     interface for local storage

     */
    var sStorage = 'sessionStorage',
        lStorage = 'localStorage',
        supports = {
            sessionStorage: window[sStorage] || null,
            localStorage: window[lStorage] || null,
            JSON: window['JSON'] && window['JSON'].stringify && window['JSON'].parse
        };

    function setToStorage(storageType, key, value) {
        if (supports[storageType] && key && value) {
            // save as object or string
            window[storageType][key] = (typeof value === 'object') ? JSON.stringify(value) : value.toString();
        }
        return window[storageType][key];
    }

    function getFromStorage(storageType, key) {
        var getValue,
            tempValue;
        if (supports[storageType] && key && window[storageType][key]) {
            tempValue = window[storageType][key];

            try {
                getValue = JSON.parse(tempValue);
            } catch (e) {
                getValue = tempValue;
            }

        }
        return getValue;
    }

    function removeFromStorage(storageType, key) {
        window[storageType].removeItem(key);
        return window[storageType][key];
    }

    return {
        session: {
            set: function (key, value) {
                key = key || null;
                value = value || null;
                return setToStorage(sStorage, key, value);

            },
            get: function (key) {
                key = key || null;
                return getFromStorage(sStorage, key);
            },
            remove: function (key) {
                key = key || null;
                return removeFromStorage(sStorage, key);
            }
        },
        local: {
            set: function (key, value) {
                key = key || null;
                value = value || null;
                return setToStorage(lStorage, key, value);

            },
            get: function (key) {
                key = key || null;
                return getFromStorage(lStorage, key);
            },
            remove: function (key) {
                key = key || null;
                return removeFromStorage(lStorage, key);
            }
        }
    };


});