import { WebSocketServer, WebSocket } from "ws";
import { JWT } from "@repo/common/index";
import { config } from "@repo/config/config";
import { IncomingMessage } from "http";

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

        const decodedToken = JWT.verify(token, config.jwtSecret);
        if (typeof decodedToken === "string") {
            ws.close(1008, "Invalid token");
            return;
        }
        if (!decodedToken || !decodedToken.userId) {
            ws.close(1008, "Invalid token");
            return;
        }
        ws.on("message", (message: Buffer | ArrayBuffer | Buffer[]) => {
            console.log(`Received message: ${message}`);
            // Echo the message back to the client
            ws.send(`Server received: ${message}`);
        });

        ws.on("close", () => {
            console.log("Client disconnected");
        });
    });
}
