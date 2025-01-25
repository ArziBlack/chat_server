import {
  AnswerCallData,
  CallData,
  HandshakeQuery,
  ICECandidateData,
} from "./interfaces/socket";
import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";

let IO: Server;

export const initIO = (httpServer: HTTPServer) => {
  IO = new Server(httpServer);

  IO.use((socket: Socket, next) => {
    const query = socket.handshake.query as HandshakeQuery;
    if (query?.callerId) {
      socket.data.user = query.callerId;
      next();
    } else {
      next(new Error("Caller ID is missing."));
    }
  });

  IO.on("connection", (socket: Socket) => {
    const user = socket.data.user;
    console.log(socket.data.user, "Connected");
    socket.join(user);

    socket.on("call", (data: CallData) => {
      const { calleeId, rtcMessage } = data;

      socket.to(calleeId).emit("newCall", {
        callerId: user,
        rtcMessage,
      });
    });

    socket.on("answerCall", (data: AnswerCallData) => {
      const { callerId, rtcMessage } = data;

      socket.to(callerId).emit("callAnswered", {
        callee: user,
        rtcMessage,
      });
    });

    socket.on("ICEcandidate", (data: ICECandidateData) => {
      const { calleeId, rtcMessage } = data;
      console.log("ICEcandidate calleeId", calleeId);

      socket.to(calleeId).emit("ICEcandidate", {
        sender: user,
        rtcMessage,
      });
    });
  });
};

export const getIO = (): Server => {
  if (!IO) {
    throw new Error("IO not initialized.");
  }
  return IO;
};
