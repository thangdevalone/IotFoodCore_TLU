import { useAppSelector } from "@/app/hooks"
import Checkout from "@/features/Checkout"
import { useInforUser } from "@/hooks"
import { isTimeDGTOneHour } from "@/utils/isTimeDGTOneHour"
import dayjs from "dayjs"

export function ProtectCheckout() {
  const user = useInforUser()
  // time là hiện tại 9:00 PM
  const time = dayjs(new Date()).format("hh:mm A")
  const timeDeliver = useAppSelector((state) => state.cart.timeDeliver) // 11:00 AM
  // return !!user ? (
  //   time.search("PM") !== -1 ? (
  //     <>
  //       Giờ này mình không ship nữa hic😞. Hãy quay lại vào ngày mai.{" "}
  //       <a className="text-blue-600 hover:underline" href="/">
  //         Quay lại trang chủ
  //       </a>
  //     </>
  //   ) : isTimeDGTOneHour(timeDeliver, time) ? (
  //     <Checkout />
  //   ) : (
  //     <>
  //       <b>Error</b>:Bạn chọn giờ giao là {timeDeliver}. Bạn phải đặt đơn trước
  //       1 tiếng.{" "}
  //       <a className="text-blue-600 hover:underline" href="/">
  //         Quay lại trang chủ
  //       </a>
  //     </>
  //   )
  // ) : (
  //   <>
  //     Bạn cần{" "}
  //     <a className="text-blue-600 hover:underline" href="/login">
  //       đăng nhập
  //     </a>{" "}
  //     để tiếp tục với trang này
  //   </>
  // )
  return !!user ? <Checkout/>:(
    <>
      Bạn cần{" "}
      <a className="text-blue-600 hover:underline" href="/login">
        đăng nhập
      </a>{" "}
      để tiếp tục với trang này
    </>
  )
}
