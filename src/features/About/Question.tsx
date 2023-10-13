import React from "react" // Import React
import "./style_about.css"
import { Stack, Divider } from "@mui/material"

export interface QuestionProps {}
export interface QuestionItemProps {
  question: string | null
  answer: string | null
  last:boolean
}

const dataQuestion = [
  {
    question: "TluFood hoạt động như nào?",
    answer:
      "Chúng tôi hoạt động theo mô hình gom đơn. Để sao cho phí ship của bạn là rẻ nhất kèm với giá của các cửa hàng sẽ không bị tăng lên so với thực tế như các ứng dụng giao hàng khác.",
  },
  {
    question:
      "Tôi có thể đặt đồ ăn về nhà tôi được không?",
    answer:
      "Bạn không thể vì chúng tôi chỉ ship tới cố định địa điểm là Trường đại học Thăng Long",
  },
  {
    question:
      "Tôi có thể thanh toán trực tuyến trên TluFood cho đơn hàng của mình không?",
    answer:
      "Chúng tôi chưa hỗ trợ dịch vụ thanh toán trực tuyến trên bản cập nhật lần này",
  },
  {
    question: "Tôi có thể đặt đồ ăn trên TluFood cho người khác không?",
    answer:
      "Tất nhiên rồi, hãy chăm sóc những người thân yêu của mình bằng cách gửi những món ăn mà họ yêu thích đến tận trương. Bạn chỉ cần ghi rõ mô tả chi tiết tên và số điện thoại ở đơn hàng khi đặt đơn hàng của bạn.",
  },
  {
    question: "TluFood tính phí giao đồ ăn như thế nào?",
    answer:
      "Phí giao hàng của chúng tôi được tính theo công thức bí mật sao cho rẻ nhất, . Ngoài ra chúng tôi vẫn cung cấp các ưu đãi miễn/giảm ship cho các bạn vào những dịp đặc biệt.",
  },
  
]

const QuestionItem = (props: QuestionItemProps) => {
  const { question, answer,last } = props
  return (
    <Stack direction="column">
      <p className="text-2xl font-bold">{question}</p>
      <p className="text-base mt-2">{answer}</p>
      {last ?<div className="mb-[50px]"></div>: <Divider sx={{ margin: "20px 0 10px 0", borderWidth: "0.09rem" }} />}
    </Stack>
  )
}

export function Question(props: QuestionProps) {
  return (
    <Stack direction="column" spacing={2} className="w-full">
      {dataQuestion.map((item, index) => (
        <QuestionItem key={index} {...item} last={index===dataQuestion.length-1} />
      ))}
    </Stack>
  )
}
