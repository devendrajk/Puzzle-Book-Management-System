let io;

function init(server) {

    const { Server } = require("socket.io");

    io = new Server(server, {

        cors: {

            origin: "http://localhost:5173",

            methods: ["GET", "POST"]

        }

    });

    return io;

}

function getIO() {

    if (!io) {

        throw new Error("Socket.IO not initialized.");

    }

    return io;

}

module.exports = {

    init,

    getIO

};