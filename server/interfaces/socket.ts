export interface HandshakeQuery {
  callerId?: string;
}

export interface CallData {
  calleeId: string;
  rtcMessage: string;
}

export interface AnswerCallData {
  callerId: string;
  rtcMessage: string;
}

export interface ICECandidateData {
  calleeId: string;
  rtcMessage: string;
}
