import { useEffect, useState } from "react"
import { ChatHeader } from "./ChatHeader"
import { ItemMessage } from "./ItemMessage"
import { Box, Paper, Stack, Typography } from "@mui/material"
import { MessageSearch } from "./MessageSearch"
import { TypeChatConversationData } from "@/models"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
export interface ContainerChatProps {
    setChatOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export function ChatConversationsList(props: ContainerChatProps) {
    const { setChatOpen } = props
    const [isSearch, setIsSearch] = useState(false)
    const [ArrChatSearched, setArrChatSearched] = useState<TypeChatConversationData[]>([])
    const chatApi: TypeChatConversationData[] = useAppSelector((state) => state.chatBox.AllUserApi!)
    return (
        <Stack direction="column" className=" w-[310px] bg-[#fff] rounded-md shadow-2xl overflow-hidden">
            <ChatHeader />
            <MessageSearch isSearch={isSearch} setIsSearch={setIsSearch} setArrChatSearched={setArrChatSearched} />
            <div className="h-[340px] overflow-y-auto">

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