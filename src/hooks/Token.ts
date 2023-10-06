import { useAppSelector } from "@/app/hooks"
import StorageKeys from "@/constants/storage-keys"
import { User } from "@/models"

export function useToken(): String | null {
  const user = useAppSelector((state) => state.auth.currentUser?.token)
  return user || JSON.parse(localStorage.getItem(StorageKeys.TOKEN) || "null")
}
