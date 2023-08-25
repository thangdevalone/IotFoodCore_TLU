import { useEffect, useRef } from "react"
import { Avatar, IconButton } from '@mui/material';
import { TypeMessageData } from "@/models"
export interface MessageListProps {
    messageList: Array<TypeMessageData>
    avatarShipper: string
}

export function MessageList(props: MessageListProps) {
    const { messageList, avatarShipper } = props
    console.log({messageList})
    let messageListRef = useRef<HTMLDivElement>(null);
    // Hàm để cuộn xuống cuối container khi có tin nhắn mới
    const scrollToBottom = () => {
        const container = messageListRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messageList]);
    const RenderMessage = ({ messageData }: { messageData: TypeMessageData }) => {
        return (
            <div>
                {messageData.sender == "idSender" ?
                    <>
                        <div className="flex justify-end">
                            <div className="messageR" style={{ wordWrap: "break-word" }}>{messageData.type=="image"?<img src={messageData.message} alt="image" />:messageData.message}</div>
                        </div>
                    </>
                    :
                    <div className="flex">
                        <Avatar
                            variant="circular"
                            alt="shipper"
                            sx={{ width: "35px", height: "35px", mr: 1 }}
                            src={avatarShipper}

                        />
                        <div className="messageL" style={{ wordWrap: "break-word" }}>{messageData.type=="image"?<img src={messageData.message} alt="image" />:messageData.message}</div>
                    </div>
                }
            </div>
        )
    }
    return (
        <div className="pt-3 pb-1 px-4 flex flex-col overflow-x-hidden overflow-y-auto h-[345px]" ref={messageListRef}>
            {messageList?.map((messageData: TypeMessageData) =>
                <RenderMessage messageData={messageData} key={messageData.idMessage}/>
            )}
        </div>
    )
}