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

var http = require('http'),
    url = require("url"),
    utils = require('./utils'),
    variables = require("./variables"),
    router = require("./router");

// start server
var server = http.createServer(onRequest).listen(variables.PORT, variables.URL);
utils.logX("Server started on " + variables.URL + ":" + variables.PORT);

var io = require('socket.io').listen(server);
io.set('log level', 1); // 1 = errors, 2 = warnings + errors, 3 = info + warnings + errors
var activeClients = 0;
var clients = [];
var clientNames = [];

io.sockets.on('connection', function(socket) {
    ++activeClients;

    utils.log("Client with socket id " + socket.id + " connected. Active clients: " + activeClients);

    clientNames.push((socket.id + "").substr(0, 7));
    clients.push(socket.id);

    socket.on('disconnect', function() {
        --activeClients;
        utils.log("Client '" + clientNames[clients.indexOf(socket.id)] + "' (" + socket.id + ") disconnected. Active clients: " + activeClients);
        clientNames.splice(clients.indexOf(socket.id), 1);
        clients.splice(clients.indexOf(socket.id), 1);
        io.sockets.json.emit('userDisconnected', {
            activeClients: activeClients,
            id: socket.id
        });
    });
    socket.on('nameChange', function(msg) {
        var name = msg.name.trim();
        name = (name.length > 20) ? name.substring(0, 20) : name;
        if (name && name !== "") {
            utils.log("[INFO] '" + clientNames[clients.indexOf(socket.id)] + "' (" + socket.id + ") set name to '" + name + "'");
            clientNames[clients.indexOf(socket.id)] = name;
            io.sockets.json.emit('nameChange', {
                id: socket.id,
                name: name
            });
        }
    });
    socket.on('chatUpdate', function(msg) {
        var date = new Date();
        utils.log("[MSG] " + socket.id + " (" + date + "): " + msg.msg);

        if (msg.msg && msg.msg.trim() !== "") {
            io.sockets.json.emit('chatUpdate', {
                id: socket.id,
                date: date,
                msg: msg.msg.trim()
            });
        }
    });
    socket.emit('socketId', {
        activeClients: activeClients,
        id: socket.id,
        clients: clients,
        clientNames: clientNames
    });
    io.sockets.json.emit('userConnected', {
        activeClients: activeClients,
        id: socket.id,
        name: clientNames[clients.indexOf(socket.id)]
    });
});

/**
 * on GET request
 * @param request
 *      request
 * @param response
 *      response
 */
function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    utils.log("-----\nRequest for '" + pathname + "' received.");
    if (pathname.indexOf("..") != -1) {
        router.route("error404", response);
    } else {
        router.route(pathname, response);
    }
}
