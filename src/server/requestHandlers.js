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

var fs = require("fs"),
    utils = require('./utils'),
    variables = require('./variables');

/**
 * start request handler - delivers index.html
 * @param response
 *      response to write to
 */
function start(response) {
    utils.log("Request handler 'start' was called.");

    // list all files in current directory
    /*
    fs.readdir(process.cwd(), function (err, files) {
    	if (err) {
    	    console.log(err);
    	    return;
    	}
    	console.log(files);
    });
    */

    utils.log(variables.clientFolder + "client/index.html");
    fs.readFile(variables.clientFolder + "client/index.html", "binary", function(error, file) {
        if (error || !file) {
            utils.logX(error);
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write("An error occured." + "\n");
            response.end();
        } else {
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            response.write(file);
            response.end();
        }
    });
}

/**
 * file request handler - delivers a file from the file system
 * @param response
 *      response to write to
 * @param filename
 *      name of the file to display
 */
function file(response, filename) {
    utils.log("Request handler 'file' was called. Trying to deliver file '" + filename + "'");
    fs.readFile(variables.clientFolder + "client/" + filename, "binary", function(error, file) {
        if (error) {
            utils.log(error);
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write(error + "\n");
            response.end();
        } else {
            var mimetype = variables.mimetypes[utils.getSuffix(filename)];
            if (mimetype !== undefined) {
                response.writeHead(200, {
                    "Content-Type": mimetype
                });
                response.write(file, "binary");
                response.end();
            } else {
                error404(response);
            }
        }
    });
}

/**
 * error404 request handler - writes an error 404
 * @param response
 *      response to write to
 */
function error404(response) {
    utils.log("Request handler 'error404' was called.");
    response.writeHead(404, {
        "Content-Type": "text/plain"
    });
    response.write("404 Not found");
    response.end();
}

// exports
exports.start = start;
exports.file = file;
exports.error404 = error404;
