import * as React from "react"
import { Navigate, Outlet } from "react-router-dom"

export function ProtectAuth() {
  const stored = localStorage.getItem("access_token")
  const parsed = stored ? JSON.parse(stored) : null
  return !parsed ? <Outlet /> : <Navigate to="/home" replace={true} />
}
