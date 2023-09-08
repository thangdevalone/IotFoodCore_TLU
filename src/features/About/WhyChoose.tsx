
export interface  WhyChooseProps {
}

export function WhyChoose (props:  WhyChooseProps) {
  return (
    <div>
      <ul style={{listStyleImage:"url(/assets/tick.svg)",padding:" 0 24px 16px 24px"}}>
        <li className="my-4"><b>An toàn</b> - Mọi thanh toán trong IotFood hiện tại là thanh toán trực tiếp</li>
        <li className="my-4"><b>Nhanh chóng</b> - Bạn chỉ cần đặt và đúng giờ đến nhận &lt;3</li>
        <li className="my-4"><b>Giá rẻ nhất</b> - IotFood hoạt động theo mô hình gom đơn nên giá rẻ hơn với bất kì dịch vụ giao hàng nào</li>
        <li className="my-4"><b>Uy tín</b> - Ứng dụng được phát triền bởi sinh viên Đại học Thăng Long nên bạn có thể hoàn toàn tin tưởng và trải nghiệm</li>
      </ul>
    </div>
  );
}
