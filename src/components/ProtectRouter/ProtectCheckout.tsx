import Checkout from "@/features/Checkout"
import { useInforUser } from "@/hooks"


export function ProtectCheckout() {
  const user=useInforUser()
  return !!user? <Checkout /> : <>Bạn cần <a className="text-blue-600 hover:underline" href="/login">đăng nhập</a> để tiếp tục với trang này</>
}
