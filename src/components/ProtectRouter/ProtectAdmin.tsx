import StorageKeys from "@/constants/storage-keys"
import { useInforUser } from "@/hooks"

import { Navigate, Outlet } from "react-router-dom"

export function ProtectAdmin() {
  const user=useInforUser()
  return user?.role[0].authority==="ADMIN" ? <Outlet /> : <Navigate to="/" replace={true} />
}
