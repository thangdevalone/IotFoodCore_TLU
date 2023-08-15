import { useEffect, useState, useRef } from "react"
import { Paper, InputBase, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { TypeChatConversationData } from "@/models";
import Picker from 'emoji-picker-react'

export interface MessageInputProps {
    setChatBoxsDisplay: React.Dispatch<React.SetStateAction<TypeChatConversationData[]>>
    chatBox: TypeChatConversationData
    chatBoxsDisplay: TypeChatConversationData[]
}
type ExtendedFile = File & { preview: string };
const ariaLabel = { 'aria-label': 'description' };
export function MessageInput(props: MessageInputProps) {
    const { setChatBoxsDisplay, chatBox, chatBoxsDisplay } = props
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [image, setImage] = useState<ExtendedFile | undefined>(undefined);
    const [message, setMessage] = useState('')
    let emojiPickerRef = useRef<HTMLDivElement>(null);
    let imageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Xử lý sự kiện khi click ra ngoài ChatConversationsList
        let handleOnclickOutside = (e: any) => {
            if (!emojiPickerRef.current?.contains(e.target)) {
                setShowEmojiPicker(false)
            }
        }
        document.addEventListener('mousedown', handleOnclickOutside)
        return () => {
            document.removeEventListener('mousedown', handleOnclickOutside)
        }
    }, [])

    const handleSendMessage = () => {
        let id = new Date().toString()
        let newChatBox = {
            ...chatBox, messageList: [...chatBox.messageList, {
                idMessage: id,
                message: message,
                sender: "idSender",
                type: "text",
            }]
        }
        let newChatBoxsDisplay = chatBoxsDisplay.map((chatBox: TypeChatConversationData) => chatBox.id === newChatBox.id ? newChatBox : chatBox)
        setChatBoxsDisplay(newChatBoxsDisplay)
        setMessage('')
    }

    const handleEnmojiClick = (e: any) => {
        let mess = message
        mess += e.emoji
        setMessage(mess)
    }

    const handleImageChange = (e: any) => {
        const file = e.target.files[0] as ExtendedFile;
        if (file) {
            file.preview = URL.createObjectURL(file);
            let id = new Date().toString()
            let newChatBox = {
                ...chatBox, messageList: [...chatBox.messageList, {
                    idMessage: id,
                    message: file.preview,
                    sender: "idSender",
                    type: "image",
                }]
            }
            let newChatBoxsDisplay = chatBoxsDisplay.map((chatBox: TypeChatConversationData) => chatBox.id === newChatBox.id ? newChatBox : chatBox)
            setChatBoxsDisplay(newChatBoxsDisplay)
        }

    }

    return (
        <div className="absolute bottom-0 flex justify-between py-3 ">
            <IconButton type="button" sx={{ p: '5px' }} onClick={() => { imageInputRef.current?.click() }}>
                <ImageIcon sx={{ color: "#0084ff" }} />
                <input type="file" style={{ display: "none" }} ref={imageInputRef} onChange={handleImageChange} />
            </IconButton >
            <Paper
                elevation={0}
                sx={{ p: '0 4px', display: 'flex', alignItems: 'center', borderRadius: 4, backgroundColor: "#f0f2f5", mr: 1 }}
            >
                <InputBase sx={{ ml: 1, flex: 1, width: "180px" }}
                    placeholder="Aa"
                    onKeyPress={(e) => { if (e.key == "Enter") { handleSendMessage() } }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {showEmojiPicker && <div ref={emojiPickerRef}><Picker onEmojiClick={handleEnmojiClick} /></div>}
                <IconButton type="button" sx={{ p: '5px' }} onClick={() => setShowEmojiPicker(true)}>
                    <InsertEmoticonIcon sx={{ color: "#0084ff" }} />
                </IconButton >
            </Paper>
            <IconButton type="button" sx={{ p: '5px' }} onClick={handleSendMessage}>
                <SendRoundedIcon sx={{ color: "#0084ff" }} />
            </IconButton >
        </div>
    )
}