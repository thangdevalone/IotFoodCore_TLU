export interface TypeMessageData {
    idMessage: string,
    sender: string,
    message: string
}

export interface TypeChatConversationData {
    id: string,
    avatarShipper: string,
    nameShipper: string,
    message: Array<TypeMessageData>
}

