export interface TypeMessageData {
    idMessage: string,
    sender: string,
    type: string,
    message: string
}

export interface TypeChatConversationData {
    id: string,
    avatarShipper: string,
    nameShipper: string,
    messageList: Array<TypeMessageData>
}

