import { useEffect, useState } from "react"
import { Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { ChatBoxActions } from "@/features/ChatBoxs/MessageSlice"
import { TypeMessageData } from "@/models";
export interface ItemMessageProps {
    messageRoomData: any
    setChatOpen:React.Dispatch<React.SetStateAction<boolean>>
    // messageList: Array<TypeMessageData>
}

export function ItemMessage(props: ItemMessageProps) {
    const { avatarShipper, nameShipper } = props.messageRoomData
    const setChatOpen = props.setChatOpen
    const dispatch = useAppDispatch()
    const handleClick = () => {
        setChatOpen(false)
        dispatch(ChatBoxActions.SaveMessageChatData(props.messageRoomData))
    }
    return (
        <div className="flex px-2 py-3 hover:bg-[#ebebec] cursor-pointer" onClick={handleClick}>
            <Avatar
                alt={nameShipper}
                sx={{ width: "56px", height: "56px" }}
                src={avatarShipper}
                className="p-[6px]"
            />
            <div className="p-[6px]">
                <p className="text-[4] font-[500]">{nameShipper}</p>
                <span className="text-[3] text-[#65676b] font-[400]">oke bn</span>
            </div>
        </div>
    )
}