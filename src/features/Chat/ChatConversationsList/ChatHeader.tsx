import { useEffect, useState } from "react"

export interface ChatHeaderProps {

}

export function ChatHeader(props: ChatHeaderProps) {
   
    return (
        <div className="pt-3 pb-1 px-4">
            <span className="tx-24-700">Chat</span>
        </div>
    )
}