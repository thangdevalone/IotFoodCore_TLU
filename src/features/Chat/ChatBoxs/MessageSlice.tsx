import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TypeChatConversationData } from "@/models"
export interface MessageChatState {
    ChatBoxsDisplay?: Array<TypeChatConversationData>
    AllUserApi?: Array<TypeChatConversationData>
}

const initialState: MessageChatState = {
    ChatBoxsDisplay: [],
    AllUserApi: [],
}

const ChatBoxSlice = createSlice({
    name: "chatBox",
    initialState,
    reducers: {
        SaveAllChatData(state, action) {
            state.AllUserApi = action.payload
        },
        SaveMessageChatData(state, action: PayloadAction<TypeChatConversationData>) {
            let messageChatData = action.payload
            let chatBoxExist = state.ChatBoxsDisplay && state.ChatBoxsDisplay.find(chatbox => chatbox.id === messageChatData.id)
            if (state.ChatBoxsDisplay && (!chatBoxExist)) {
                if (window.innerWidth < 750) {
                    state.ChatBoxsDisplay = []
                    state.ChatBoxsDisplay[0] = messageChatData
                } else {
                    if (state.ChatBoxsDisplay.length < 2) {
                        state.ChatBoxsDisplay?.push(messageChatData)
                    } else {
                        state.ChatBoxsDisplay[0] = messageChatData
                    }
                }
            }
        },
        DeleteChatBox(state, action: PayloadAction<TypeChatConversationData>) {
            let messageChatData = action.payload
            if (state.ChatBoxsDisplay) {
                let newArr = state.ChatBoxsDisplay.filter(chatBox => chatBox.id !== messageChatData.id)
                state.ChatBoxsDisplay = newArr
            }
        },

    }
})

export const ChatBoxActions = ChatBoxSlice.actions

const ChatBoxReducer = ChatBoxSlice.reducer
export default ChatBoxReducer
