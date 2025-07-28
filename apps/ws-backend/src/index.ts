import WebSocket from "ws";
import { jwt, JwtPayload } from "@repo/common";
import { config } from "@repo/config";

export async function CreateWebSocketServer() {
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on("connection", (ws, request) => {
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

        const decodedToken = jwt.verify(token, config.JWT_SECRET);
        if (typeof decodedToken === "string") {
            ws.close(1008, "Invalid token");
            return;
        }
        if (!decodedToken || !decodedToken.userId) {
            ws.close(1008, "Invalid token");
            return;
        }
        ws.on("message", (message) => {
            console.log(`Received message: ${message}`);
            // Echo the message back to the client
            ws.send(`Server received: ${message}`);
        });

        ws.on("close", () => {
            console.log("Client disconnected");
        });
    });
}
