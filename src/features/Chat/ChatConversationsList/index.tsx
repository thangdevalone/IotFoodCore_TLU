import { useEffect, useState } from "react"
import { ChatHeader } from "./ChatHeader"
import { ItemMessage } from "./ItemMessage"
import { Box, Paper, Stack, Typography } from "@mui/material"
import { MessageSearch } from "./MessageSearch"

export interface ContainerChatProps {
    setChatOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const chatApi = [
    {
        id: 1,
        avatarShipper: "https://tse2.mm.bing.net/th?id=OIP.9SKfV5dAQ-SahY_Hau0W2AHaHa&pid=Api&P=0&h=180",
        nameShipper: "Nguyễn Văn A",
        messageList: [
            {
                idMessage: "1",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "2",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "3",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "4",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
        ]
    },
    {
        id: 2,
        avatarShipper: "https://tse2.mm.bing.net/th?id=OIP.DGgQ60lEFQItYHzakst7yAHaHa&pid=Api&P=0&h=180",
        nameShipper: "Nguyễn Văn B",
        messageList: [
            {
                idMessage: "1",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "2",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "3",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "4",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
        ]
    },
    {
        id: 3,
        avatarShipper: "https://tse4.mm.bing.net/th?id=OIP.tS4o_QzG25ntuI90jWWWXQHaHa&pid=Api&P=0&h=180",
        nameShipper: "Nguyễn Văn C",
        messageList: [
            {
                idMessage: "1",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "2",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "3",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "4",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
        ]
    },
    {
        id: 4,
        avatarShipper: "https://i.pinimg.com/736x/b3/5d/77/b35d7780b7a811cf31556f341c9091a2.jpg",
        nameShipper: "Nguyễn Văn D",
        messageList: [
            {
                idMessage: "1",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "2",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "3",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
            {
                idMessage: "4",
                sender: "1",
                message: "bạn đến chưa ạ!"
            },
        ]
    },
]

export function ChatConversationsList(props: ContainerChatProps) {
    const { setChatOpen } = props

    return (
        <Stack direction="column" className=" w-[310px] bg-[#fff] rounded-md shadow-2xl overflow-hidden">
            <ChatHeader />
            <MessageSearch />
            <div>
                {chatApi.map(messageRoom => {
                    return <ItemMessage messageRoomData={messageRoom} key={messageRoom.id} setChatOpen={setChatOpen} />
                })}
            </div>
        </Stack>
    )
}