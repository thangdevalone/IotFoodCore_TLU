import { useEffect, useState } from "react"
import { Avatar, IconButton } from '@mui/material';
import { MessageInput } from "./MessageInput";
import CloseIcon from '@mui/icons-material/Close';
import { MessageList } from './MessageList'
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { TypeChatConversationData } from "@/models"
import { ChatBoxActions } from "./MessageSlice";
export interface ChatBoxsProps {

}

export function ChatBoxs(props: ChatBoxsProps) {
    const dispatch = useAppDispatch()
    const chatBoxsDisplayState: TypeChatConversationData[] = useAppSelector((state) => state.chatBox.ChatBoxsDisplay!)
    const [chatBoxsDisplay, setChatBoxsDisplay] = useState<TypeChatConversationData[]>(chatBoxsDisplayState)
    useEffect(()=>{
        setChatBoxsDisplay(chatBoxsDisplayState)
    },[chatBoxsDisplayState])
    console.log({chatBoxsDisplay})
    const hanldeCloseBox = (chatBox: TypeChatConversationData) => {
        dispatch(ChatBoxActions.DeleteChatBox(chatBox))
    }

    return (
        <div className="fixed flex bottom-0 z-10 right-10">
            {
                chatBoxsDisplay.map((chatBox: TypeChatConversationData, idx:number) => (
                    <div className={`${idx===1 && chatBoxsDisplay.length > 1 && "hidden lg:block"} pb-1 w-[310px] bg-[#fff] h-[455px] z-40 shadow-xl rounded-md mx-3`} key={chatBox.id}>
                        <div className="flex flex-row items-center justify-between" style={{ boxShadow: "0px 3px 8px 0px #00000038" }}>
                            <div className="flex flex-row items-center">
                                <Avatar
                                    alt={chatBox.nameShipper}
                                    sx={{ width: "56px", height: "56px" }}
                                    src={chatBox.avatarShipper}
                                    className="p-[6px]"
                                />
                                <span className="text-[4] font-[500]">{chatBox.nameShipper}</span>
                            </div>
                            <IconButton
                                aria-label="delete"
                                className="mr-1 cursor-pointer"
                                onClick={() => hanldeCloseBox(chatBox)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <MessageList messageList={chatBox.messageList} avatarShipper={chatBox.avatarShipper} />
                        <MessageInput setChatBoxsDisplay={setChatBoxsDisplay} chatBox={chatBox} chatBoxsDisplay={chatBoxsDisplay}/>
                    </div>

                ))
            }
        </div>
    )
}