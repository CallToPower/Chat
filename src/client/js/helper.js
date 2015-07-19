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
var findReplace = [
    [/&/g, "&amp;"],
    [/</g, "&lt;"],
    [/>/g, "&gt;"],
    [/"/g, "&quot;"]
]; //" <- only for TextMate that does recognize the '/' in front of the quotation mark in the line above

/**
 * filters a string
 * @param str
 *      string to filter
 * @return
 *      a filtered string
 */

function filter(str) {
    for (var item in findReplace) {
        str = str.replace(findReplace[item][0], findReplace[item][1]);
    }
    return str;
}

/**
 * formats a name
 * @param name
 *      the name
 * @param own
 *      flag (true, false) whether the message is from oneself
 * @return
 *      a formatted message
 */

function formatName(name, own) {
    var nameClass = own ? "ownUsername" : "otherUsername";
    return "<span class=\"" + nameClass + "\">" + name + "</span>";
}

/**
 * formats a message
 * @param timeString
 *      the time
 * @param name
 *      name of the player
 * @param msg
 *      the message
 * @param own
 *      flag (true, false) whether the message is from oneself
 * @return
 *      a formatted message
 */

function formatMsg(timeString, name, msg, own) {
    var cssClass = own ? "floatRight clear" : "clear";
    var cssNameClass = own ? "ownUsername" : "otherUsername";
    var cssMsgClass = own ? "bubbledRight" : "bubbledLeft";
    return "<div class=\"formattedMessage " + cssClass + "\">" +
        "<span class=\"time\">" +
        timeString +
        "</span>" +
        " - " +
        "<span class=\"" + cssNameClass + "\">" +
        name +
        "</span>" +
        "</div>" +
        "<div class=\"" + cssMsgClass + "\">" +
        msg +
        "</div>";
}

/**
 * returns a time string
 * @return
 *      a time string
 */

function getTimeString() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return ((h < 10) ? ("0" + h) : h) + ":" + ((m < 10) ? ("0" + m) : m) + ":" + ((s < 10) ? ("0" + s) : s);
}

/**
 * returns a formatted time string
 * @param time
 *		date object
 * @return
 *      a time string
 */

function getFormattedTimeString(dateString) {
    var d = new Date(dateString);
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    return ((h < 10) ? ("0" + h) : h) + ":" + ((m < 10) ? ("0" + m) : m) + ":" + ((s < 10) ? ("0" + s) : s);
}

/**
 * checks whether num is in [lower, upper]
 * @param lower
 *      lower bound
 * @param upper
 *      upper bound
 * @return
 *      true when num is in [lower, upper], false else
 */

function inInterval(lower, upper, num) {
    return ((num >= lower) && (num <= upper));
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
