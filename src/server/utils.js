/*
 * Chat
 * Copyright (C) 2013-2015 Denis Meyer, CallToPower Software
 * 
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License version 3, 29 June 2007, as published by the Free Software Foundation.
 * 
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

var loggingEnabled = true;

/**
 * returns the suffix of the pathname
 * @param pathname
 *      name of the path of the file
 * @return
 *      the suffix of the pathname when the file has a suffix, "" else
 */
function getSuffix(pathname) {
    var liod = pathname.lastIndexOf(".");
    if (liod != -1) {
        return pathname.substr(pathname.lastIndexOf(".") + 1, pathname.length);
    } else {
        return "";
    }
}

/**
 * checks whether haystack starts with start
 * @param haystack
 *      string to check
 * @param start
 *      string to compare with
 * @return
 *      true when haystack starts with start, false else
 */
function startsWith(haystack, start) {
    if ((typeof(haystack) == 'string') && (typeof(start) == 'string')) {
        return (haystack.substring(0, start.length).indexOf(start) != -1);
    }
    return false;
}

/**
 * returns the file name without leading "/"
 * @param pathname
 *      name of the path of the file
 * @return
 *      the file name without leading "/"
 */
function getFileName(pathname) {
    if (startsWith(pathname, "/")) {
        return pathname.substr(1, pathname.length);
    } else {
        return pathname;
    }
}

/**
 * returns a random number in between [min, max]
 * @param min
 *      min value
 * @param max
 *      max value
 * @return
 *      a random number in between [min, max]
 **/
function getRandom(min, max) {
    if (min == max) {
        return min;
    } else if (min > max) {
        var tmp = max;
        max = min;
        min = max;
    }
    return (min + parseInt(Math.random() * (max - min + 1)));
}

/**
 * @description see log, difference: logs everytime
 */
function logX() {
    var ltmp = loggingEnabled;
    loggingEnabled = true;
    log(arguments);
    loggingEnabled = ltmp;
}

/**
 * @description Logs given arguments -- uses console.log
 * @param
 *     any console.log-valid arguments
 * @return
 *     true if window.console exists and arguments have been logged, false else
 */
function log() {
    if (loggingEnabled && console) {
        try {
            console.log.apply(console, Array.prototype.slice.call(arguments));
        } catch (err) {
            console.log(err);
        }
        return true;
    }
    return false;
}

// exports
exports.getSuffix = getSuffix;
exports.startsWith = startsWith;
exports.getFileName = getFileName;
exports.getRandom = getRandom;
exports.logX = logX;
exports.log = log;
