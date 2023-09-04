import { Room } from "@/models"
import { Avatar } from "@mui/material"

export interface ItemMessageProps {
  data: Room
}

export function ItemMessage(props: ItemMessageProps) {
  const { data } = props
  const handleClick = () => {
    console.log("jhee")
  }
  return (
    <div
      className="flex px-2 py-2 items-center hover:bg-[#ebebec] cursor-pointer"
      onClick={handleClick}
    >
      <Avatar
        alt={data.infoReceiver.accountName}
        src={data.infoReceiver.imgAccount}
        sx={{ width: 45, height: 45 }}
      />
      <div className="ml-2">
        <p className="text-[4] font-[500]">{data.infoReceiver.accountName}</p>
        <span className="text-[3] text-[#65676b] font-[400]">
          {data.lastMess.content}
        </span>
      </div>
    </div>
  )
}
