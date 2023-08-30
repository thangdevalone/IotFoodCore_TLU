export interface Room {
  infoReceiver: InfoReceiver
  lastMess: LastMess
  roomId: number
}
export interface ChatSend {
  id: number
  content: string
  sendId: number
  roomId: number
  createAt: string
}

export interface InfoReceiver {
  id: number
  username: string
  accountName: string
  imgAccount: string
}

export interface LastMess {
  content: string
  createAt: string
  sendId: number
}
