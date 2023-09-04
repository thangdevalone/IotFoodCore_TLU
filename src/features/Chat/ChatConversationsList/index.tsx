import { Room } from "@/models"
import { Grid, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { ChatHeader } from "./ChatHeader"
import { ItemMessage } from "./ItemMessage"
import chatApi from "@/api/chatApi"
export interface ContainerChatProps {}

export function ChatConversationsList(props: ContainerChatProps) {
  const [room, setRoom] = useState<Room[] | []>([])
  useEffect(() => {
    ;(async () => {
      try {
        const res = await chatApi.getRooms()
        setRoom(res.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  return (
    <Stack
      direction="column"
      className=" w-[650px] bg-[#fff] rounded-t-md border border-gray-300"
    >
      <ChatHeader />
      <Grid container className="h-[420px]">
        <Grid item xs={4.5}>
          {room.map((messageRoom) => {
            return <ItemMessage data={messageRoom} key={messageRoom.roomId} />
          })}
        </Grid>
        <Grid item xs={7.5}>
          
        </Grid>
      </Grid>
    </Stack>
  )
}
