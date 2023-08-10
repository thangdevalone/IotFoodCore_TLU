import StorageKeys from "@/constants/storage-keys"

import { Navigate, Outlet } from "react-router-dom"

export function ProtectAuth() {
  const stored = localStorage.getItem(StorageKeys.TOKEN)
  const parsed = stored ? stored : null
  return !parsed ? <Outlet /> : <Navigate to="/" replace={true} />
}
