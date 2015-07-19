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

/*jshint -W069 */

var utils = require('./utils'),
    variables = require('./variables');

/**
 * calls request handlers if available
 * @param pathname
 *      path name to check
 * @param response
 *      reponse to write to
 */
function route(pathname, response) {
    utils.log("About to route a request for '" + utils.getFileName(pathname) + "' ('" + pathname + "')");
    // check whether a request handler for the given pathname exists
    if (typeof variables.handle[pathname] === 'function') {
        utils.log("Delivering a handle");
        variables.handle[pathname](response);
        // check whether a file is requested
    } else if (variables.mimetypes[utils.getSuffix(pathname)] !== undefined) {
        utils.log("Delivering a static file");
        variables.handle["file"](response, utils.getFileName(pathname));
    } else {
        utils.log("No request handler found for " + pathname);
        variables.handle["error404"](response);
    }
}

// exports
exports.route = route;
