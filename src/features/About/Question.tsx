import React from "react" // Import React
import "./style_about.css"
import { Stack, Divider } from "@mui/material"

export interface QuestionProps {}
export interface QuestionItemProps {
  question: string | null
  answer: string | null
}

const dataQuestion = [
  {
    question:
      "Tôi có thể thanh toán trực tuyến trên IOTFOOD cho đơn hàng của mình không?",
    answer:
      "Chúng tôi chưa hỗ trợ dịch vụ thanh toán trực tiếp trên bản cập nhật lần này",
  },
  {
    question: "Tôi có thể đặt đồ ăn trên GrabFood cho người khác không?",
    answer:
      "Tất nhiên rồi, hãy chăm sóc những người thân yêu của mình bằng cách gửi những món ăn mà họ yêu thích đến tận nhà. Bạn chỉ cần cập nhật địa chỉ giao hàng và tên người nhận trước khi đặt đơn hàng của bạn.",
  },
  {
    question: "IOTFOOD tính phí giao đồ ăn như thế nào?",
    answer:
      "Phí giao hàng của chúng tôi phụ thuộc vào nhiều yếu tố hoạt động như khoảng cách từ vị trí của bạn đến nhà hàng. Bạn có thể kiểm tra phí giao hàng chính xác cần phải trả trước khi thanh toán tại mục thanh toán trên ứng dụng Grab. Ngoài ra còn có phần “Free Delivery” (Giao hàng miễn phí) liệt kê các nhà hàng gần chỗ bạn mà không tính phí giao hàng.",
  },
  {
    question: "IOTFOOD có áp dụng giá trị đơn hàng tối thiểu không?",
    answer:
      "Có! Nhưng bạn có thể trả số tiền chênh lệch nếu giá trị đơn hàng của bạn nhỏ hơn số tiền đặt hàng tối thiểu.",
  },
]

const QuestionItem = (props: QuestionItemProps) => {
  const { question, answer } = props
  return (
    <Stack direction="column" className="w-full">
      <p className="text-xl font-bold">{question}</p>
      <p className="text-sm mt-2">{answer}</p>
      <Divider sx={{ margin: "30px 0", borderWidth: "0.1rem" }} />
    </Stack>
  )
}

export function Question(props: QuestionProps) {
  return (
    <Stack direction="column" spacing={2} className="w-full">
      {dataQuestion.map((item, index) => (
        <QuestionItem key={index} {...item} />
      ))}
    </Stack>
  )
}
