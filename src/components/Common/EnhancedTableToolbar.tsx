import { useAppSelector } from "@/app/hooks"
import { Box, Toolbar } from "@mui/material"
import { useLocation } from "react-router-dom"
import {useEffect,useState} from "react"
export function EnhancedTableToolbar() {
  const adminData = useAppSelector((state) => state.admin)
  const {pathname} = useLocation()
  const feature = pathname.split("/")[2]
  const [data,setData]=useState<undefined | { selected:number, data:any}>(undefined)
  useEffect(()=>{
    if(feature=="product"){
      setData(adminData.product)
    }
  },[feature])
  return <Box>{feature}/{data?.selected} được chọn</Box>
}
