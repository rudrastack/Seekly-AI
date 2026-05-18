import { io } from "socket.io-client";

export const intializeSocket = () => {
    const socket = io("http://localhost:3000",{
        withCredentials: true
    }); // Replace with your server URL
    

    socket.on("connect", () => {
        console.log("Connected to socket.Io server");
    })
}