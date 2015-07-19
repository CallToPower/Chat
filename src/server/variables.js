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

var requestHandlers = require("./requestHandlers");

var URL = "localhost";
var PORT = 8181;
var clientFolder = "../";

// define request handlers
var handle = {};
handle["/"] = requestHandlers.start;
handle["file"] = requestHandlers.file;
handle["error404"] = requestHandlers.error404;

// define some file suffixes with according mimetypes
var mimetypes = {};
mimetypes["html"] = "text/html";
mimetypes["txt"] = "text/plain";
mimetypes["js"] = "text/javascript";
mimetypes["css"] = "text/css";
mimetypes["png"] = "image/png";
mimetypes["gif"] = "image/gif";
mimetypes["ico"] = "image/ico";
mimetypes["wav"] = "audio/wav";
mimetypes["mp3"] = "audio/mp3";
mimetypes["ogg"] = "audio/ogg";

// exports
exports.URL = URL;
exports.PORT = PORT;
exports.clientFolder = clientFolder;
exports.handle = handle;
exports.mimetypes = mimetypes;
