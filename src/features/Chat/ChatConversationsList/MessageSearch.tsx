import { useEffect, useState } from "react"
import { Paper, InputBase, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { TypeChatConversationData } from "@/models"
export interface MessageSearchProps {
    isSearch: boolean
    setIsSearch: React.Dispatch<React.SetStateAction<boolean>>
    setArrChatSearched: React.Dispatch<React.SetStateAction<TypeChatConversationData[]>>
}

const shipperApi = [
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
export function MessageSearch(props: MessageSearchProps) {
    const { setIsSearch, isSearch, setArrChatSearched } = props
    const hanldeChangeInput = (e: any) => {
        console.log(e.target.value.trim() === "")
        if (e.target.value.trim() === "") {
            setArrChatSearched([])
        }else{
            let arrShipperSearched = shipperApi.filter(shipper => shipper.nameShipper.toLowerCase().includes(e.target.value.toLowerCase()))
            setArrChatSearched(arrShipperSearched)
        }
    }
    return (
        <div className="flex items-center my-2 mx-4">
            {isSearch && <IconButton
                aria-label="delete"
                className="cursor-pointer p-1"
                sx={{ mr: 1, p: '5px' }}
                onClick={() => { setIsSearch(false) }}
            >
                <ArrowBackIcon />
            </IconButton>}
            <Paper
                elevation={0}
                component="form"
                sx={{ display: 'flex', alignItems: 'center', backgroundColor: "#f0f2f5", borderRadius: "50px", pl: "8px", width: "100%" }}
            >
                {!isSearch && <SearchIcon sx={{ color: "#65676b" }} />}
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Tìm kiếm shipper"
                    inputProps={{ 'aria-label': 'Tìm kiếm shipper' }}
                    onFocus={() => { setIsSearch(true) }}
                    onChange={hanldeChangeInput}
                />
            </Paper>
        </div>
    )
}