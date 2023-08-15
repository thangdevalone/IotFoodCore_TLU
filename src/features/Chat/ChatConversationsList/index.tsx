import { useEffect, useState } from "react"
import { ChatHeader } from "./ChatHeader"
import { ItemMessage } from "./ItemMessage"
import { Box, Paper, Stack, Typography } from "@mui/material"
import { MessageSearch } from "./MessageSearch"
import { TypeChatConversationData } from "@/models"
export interface ContainerChatProps {
    setChatOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const chatApi = [
    {
        id: "1",
        avatarShipper: "https://tse2.mm.bing.net/th?id=OIP.9SKfV5dAQ-SahY_Hau0W2AHaHa&pid=Api&P=0&h=180",
        nameShipper: "Nguyễn Văn A",
        messageList: [
            {
                idMessage: "1",
                type:"text",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "2",
                type:"text",
                sender: "idSender",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "3",
                type:"text",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "4",
                type:"text",
                sender: "idSender",
                message: "bạn đến chưa ạ!"
            },
        ]
    },
    {
        id: "2",
        avatarShipper: "https://tse2.mm.bing.net/th?id=OIP.DGgQ60lEFQItYHzakst7yAHaHa&pid=Api&P=0&h=180",
        nameShipper: "Nguyễn Văn B",
        messageList: [
            {
                idMessage: "1",
                type:"text",
                sender: "idSender",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "2",
                type:"text",
                sender: "idSender",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "3",
                type:"text",
                sender: "2",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "4",
                type:"text",
                sender: "2",
                message: "bạn đến chưa ạ!"
            },
        ]
    },
    {
        id: "3",
        avatarShipper: "https://tse4.mm.bing.net/th?id=OIP.tS4o_QzG25ntuI90jWWWXQHaHa&pid=Api&P=0&h=180",
        nameShipper: "Nguyễn Văn C",
        messageList: [
            {
                idMessage: "1",
                type:"text",
                sender: "idSender",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "2",
                type:"text",
                sender: "idSender",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "3",
                type:"text",
                sender: "3",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "4",
                type:"text",
                sender: "idSender",
                message: "bạn đến chưa ạ!"
            },
        ]
    },
    {
        id: "4",
        avatarShipper: "https://i.pinimg.com/736x/b3/5d/77/b35d7780b7a811cf31556f341c9091a2.jpg",
        nameShipper: "Nguyễn Văn D",
        messageList: [
            {
                idMessage: "1",
                type:"text",
                sender: "4",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "2",
                type:"text",
                sender: "idSender",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "3",
                type:"text",
                sender: "idSender",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "4",
                type:"text",
                sender: "4",
                message: "bạn đến chưa ạ!"
            },
        ]
    },
]

export function ChatConversationsList(props: ContainerChatProps) {
    const { setChatOpen } = props
    const [isSearch, setIsSearch] = useState(false)
    const [ArrChatSearched, setArrChatSearched] = useState<TypeChatConversationData[]>([])

    return (
        <Stack direction="column" className=" w-[310px] bg-[#fff] rounded-md shadow-2xl overflow-hidden">
            <ChatHeader />
            <MessageSearch isSearch={isSearch} setIsSearch={setIsSearch} setArrChatSearched={setArrChatSearched} />
            <div className="h-[340px]">

                {isSearch ? <div>
                    {ArrChatSearched.map(messageRoom => {
                        return <ItemMessage messageRoomData={messageRoom} key={messageRoom.id} setChatOpen={setChatOpen} />
                    })}
                </div> :
                    <div>
                        {chatApi.map(messageRoom => {
                            return <ItemMessage messageRoomData={messageRoom} key={messageRoom.id} setChatOpen={setChatOpen} />
                        })}
                    </div>
                }
            </div>
        </Stack>
    )
}