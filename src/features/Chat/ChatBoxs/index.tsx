import CloseIcon from '@mui/icons-material/Close';
import { Avatar, IconButton } from '@mui/material';
import { useEffect, useState } from "react";
import { MessageInput } from "./MessageInput";
import { MessageList } from './MessageList';
import { ChatBoxActions } from "./MessageSlice";
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { TypeChatConversationData } from '@/models';

export interface ChatBoxsProps {

}

export function ChatBoxs(props: ChatBoxsProps) {
    const dispatch = useAppDispatch()
    const chatApi = [
        {
            id: "1",
            avatarShipper: "https://tse2.mm.bing.net/th?id=OIP.9SKfV5dAQ-SahY_Hau0W2AHaHa&pid=Api&P=0&h=180",
            nameShipper: "Nguyễn Văn A",
            messageList: [
                {
                    idMessage: "1",
                    type: "text",
                    sender: "idSender",
                    message: "Xin chào, tôi muốn đặt một bữa trưa."
                },
                {
                    idMessage: "2",
                    type: "text",
                    sender: "1",
                    message: "Chào anh/chị, tôi là người giao hàng của nhà hàng. Anh/chị đã chọn nhà hàng nào và có món ăn cụ thể nào anh/chị muốn đặt không ạ?"
                },
                {
                    idMessage: "3",
                    type: "text",
                    sender: "idSender",
                    message: "Tôi muốn đặt một bát phở gà và một ly trà đào.!"
                },
                {
                    idMessage: "4",
                    type: "text",
                    sender: "1",
                    message: "Rất tốt, anh/chị vui lòng cung cấp địa chỉ giao hàng của mình để tôi có thể đưa món ăn đến đúng nơi ạ."
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
                    type: "text",
                    sender: "idSender",
                    message: " Xin chào, tôi muốn đặt một đơn hàng đồ ăn."
                },
                {
                    idMessage: "2",
                    type: "text",
                    sender: "2",
                    message: "Xin chào, chúng tôi sẽ rất vui được phục vụ bạn. Anh/chị đã chọn nhà hàng nào và có món gì bạn muốn đặt không ạ?"
                },
                {
                    idMessage: "3",
                    type: "text",
                    sender: "idSender",
                    message: "Tôi muốn đặt một chiếc pizza cỡ lớn, nửa phô mai nửa hải sản, và một lon nước ngọt."
                },
                {
                    idMessage: "4",
                    type: "text",
                    sender: "2",
                    message: " Rất tốt, anh/chị vui lòng cung cấp địa chỉ giao hàng để chúng tôi có thể đưa đồ ăn đến tận nơi ạ."
                },
                {
                    idMessage: "4",
                    type: "text",
                    sender: "idSender",
                    message: "Địa chỉ nhà của tôi là 789 Đường DEF, quận GHI."
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
                    type: "text",
                    sender: "3",
                    message: "Thời gian giao hàng dự kiến là trong vòng 45 phút. Mong anh/chị kiên nhẫn chờ đợi."
                },
                {
                    idMessage: "2",
                    type: "text",
                    sender: "idSender",
                    message: "Dạ, không sao. Cảm ơn bạn nhiều!"
                },
                {
                    idMessage: "3",
                    type: "text",
                    sender: "3",
                    message: "Không có gì, anh/chị. Chúng tôi luôn ở đây để hỗ trợ. Nếu có bất kỳ yêu cầu hay thắc mắc nào, anh/chị cứ gọi số hotline của chúng tôi là 987-654-321."
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
                    type: "text",
                    sender: "4",
                    message: "bạn đến chưa ạ!"
                },
                
            ]
        },
    ]



    useEffect(() => {
        dispatch(ChatBoxActions.SaveAllChatData(chatApi))
    }, [])
    const chatBoxsDisplayState: TypeChatConversationData[] = useAppSelector((state) => state.chatBox.ChatBoxsDisplay!)
    const [chatBoxsDisplay, setChatBoxsDisplay] = useState<TypeChatConversationData[]>(chatBoxsDisplayState)
    useEffect(() => {
        setChatBoxsDisplay(chatBoxsDisplayState)
    }, [chatBoxsDisplayState])
    const hanldeCloseBox = (chatBox: TypeChatConversationData) => {
        dispatch(ChatBoxActions.DeleteChatBox(chatBox))
    }

    return (
        <div className="fixed flex bottom-0 z-20 right-10">
            {
                chatBoxsDisplay.map((chatBox: TypeChatConversationData, idx: number) => (
                    <div className={`${idx === 1 && chatBoxsDisplay.length > 1 && "hidden lg:block"} pb-1 w-[310px] bg-[#fff] h-[455px] z-40 shadow-xl rounded-md mx-3`} key={chatBox.id}>
                        <div className="flex flex-row items-center justify-between" style={{ boxShadow: "0px 3px 8px 0px #00000038" }}>
                            <div className="flex flex-row items-center">
                                <Avatar
                                    alt={chatBox.nameShipper}
                                    sx={{ width: "56px", height: "56px" }}
                                    src={chatBox.avatarShipper}
                                    className="p-[6px]"
                                />
                                <span className="text-[4] font-[500]">{chatBox.nameShipper}</span>
                            </div>
                            <IconButton
                                aria-label="delete"
                                className="mr-1 cursor-pointer"
                                onClick={() => hanldeCloseBox(chatBox)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <MessageList messageList={chatBox.messageList} avatarShipper={chatBox.avatarShipper} />
                        <MessageInput setChatBoxsDisplay={setChatBoxsDisplay} chatBox={chatBox} chatBoxsDisplay={chatBoxsDisplay} />
                    </div>

                ))
            }
        </div>
    )
}