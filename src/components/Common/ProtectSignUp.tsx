import * as React from "react"
import { Navigate, Outlet } from "react-router-dom"

export function ProtectSignUp() {
  const session= sessionStorage.getItem('TheSinhVien')
  const parsed = session ? session : null
  return parsed ? <Outlet /> : <Navigate to="/auth/the-sv" replace={true} />
}
