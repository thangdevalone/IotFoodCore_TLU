import { useEffect, useState, useRef } from "react"
import { Paper, InputBase, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Picker from 'emoji-picker-react'

export interface MessageInputProps {
  
}
type ExtendedFile = File & { preview: string };
export function MessageInput(props: MessageInputProps) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [image, setImage] = useState<File | undefined>(undefined);
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
    }

    const handleEnmojiClick = (e: any) => {
        let mess = message
        mess += e.emoji
        setMessage(mess)
    }

    const handleImageChange = (e: any) => {
       

    }
    const handleTypeInput=(e:React.ChangeEvent<HTMLInputElement>)=>{

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
                    value={message}
                    onChange={handleTypeInput}
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