import { useEffect, useRef } from "react"
import { Avatar } from "@mui/material"
import { ChatSend, InfoReceiver } from "@/models"
import { useState } from "react"
import { useInforUser } from "@/hooks"
export interface MessageListProps {
  infoRei?: InfoReceiver
}

export function MessageList(props: MessageListProps) {
  const { infoRei } = props
  const user = useInforUser()
  const [messagesList, setMessagesList] = useState<ChatSend[]|[]>([])


  let messageListRef = useRef<HTMLDivElement>(null)
  // Hàm để cuộn xuống cuối container khi có tin nhắn mới
  const scrollToBottom = () => {
    const container = messageListRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }
  useEffect(() => {
    scrollToBottom()
  }, [messagesList])
  
  return (
    <div
      className="pt-3 pb-1 px-4 flex flex-col overflow-x-hidden overflow-y-auto h-[345px]"
      ref={messageListRef}
    >
      
    </div>
  )
}
