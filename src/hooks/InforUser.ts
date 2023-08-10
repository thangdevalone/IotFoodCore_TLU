import { useAppSelector } from "@/app/hooks"
import StorageKeys from "@/constants/storage-keys"
import { User } from "@/models";

export function useInforUser():User|null {
    const user = useAppSelector((state) => state.auth.currentUser);
    return user || JSON.parse(localStorage.getItem(StorageKeys.USER) || 'null');
  }
  
