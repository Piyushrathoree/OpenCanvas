import { WebSocketServer, WebSocket } from "ws";

import { IncomingMessage } from "http";
import checkAuth from "./checkAuth.js";

interface User {
    ws: WebSocket;
    userId: string;
    rooms: string[];
}

const users: User[] = [];

export async function CreateWebSocketServer() {
    const wss = new WebSocketServer({ port: 8080 });

    wss.on("connection", (ws: WebSocket, request: IncomingMessage) => {
        console.log("New client connected");
        const url = request.url;
        if (!url) {
            ws.close(1008, "No URL provided");
            return;
        }
        const token = new URLSearchParams(url.split("?")[1]).get("token");
        if (!token) {
            ws.close(1008, "No token provided");
            return;
        }
        const userId = checkAuth(token);
        if (!userId) {
            ws.close(1008, "Invalid token");
            return;
        }
        const rooms = new Map<string, Set<WebSocket>>();

        ws.on("close", () => {
            console.log("Client disconnected");
        });
    });
}
