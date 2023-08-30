import { Box } from "@mui/material"
import React from "react"
import { ChatConversationsList } from "./ChatConversationsList"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { chatActions } from "./ChatSlice"
import { useSnackbar } from "notistack"



const Chat = () => {
  const open = useAppSelector((state) => state.chat.open)
  const {enqueueSnackbar}=useSnackbar()
  const handleToggleChat=()=>{
    enqueueSnackbar("Đang trong quá trình phát triển",{variant:"error"})
  }
  return (
    <Box sx={{ position: "fixed", bottom: 0, left: "20px", zIndex: 50 }}>
      {open ? (
        <ChatConversationsList />
      ) : (
        <button
          type="button"
          onClick={handleToggleChat}
          className="text-white bg-[var(--color-df-2)] font-medium text-lg  rounded-t-md  px-4 py-2 text-center inline-flex items-center mr-2 "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H12"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.2 4.62008C14.87 3.63008 15.26 2.41008 16.34 2.07008C16.9 1.90008 17.6 2.04008 18 2.57008C18.38 2.02008 19.1 1.90008 19.66 2.07008C20.74 2.40008 21.13 3.63008 20.8 4.62008C20.29 6.19008 18.5 7.00008 18 7.00008C17.5 7.00008 15.73 6.20008 15.2 4.62008Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.9965 11H16.0054"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.9955 11H12.0045"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.99451 11H8.00349"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-2">Chat</span>
        </button>
      )}
    </Box>
  )
}

export default Chat
