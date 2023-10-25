import authApi from "@/api/authApi"
import { authActions } from "@/features/auth/AuthSlice"
import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Stack,
  Typography,
} from "@mui/material"
import { useSnackbar } from "notistack"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"

export interface LoadServerProps {}
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number },
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  )
}
export function LoadServer(props: LoadServerProps) {
  const dispatch=useDispatch()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const {enqueueSnackbar}=useSnackbar()
  useEffect(() => {
    const timer = setInterval(() => {
      const random = Math.floor(Math.random() * 4) + 1
      setProgress((prevProgress) =>
        prevProgress >= 95 ? 99 : prevProgress + random,
      )
    }, 300)
    ;(async () => {
      try {
        const startTime = new Date()
        await authApi.hello()
        const endTime = new Date()
        const elapsedTime = endTime.getTime() - startTime.getTime()
        if (elapsedTime < 1500) {
          setProgress(80)
          setTimeout(() => {
            setProgress(99)
          }, 1900)
          setTimeout(() => {
            setDone(true)
          }, 2000)
        } else {
          setProgress(99)
          setDone(true)
        }
      } catch (error) {
        console.log(error)
        dispatch(authActions.logout())
        enqueueSnackbar("Có lỗi hoặc hết hạn token vui lòng tải lại trang",{variant:'error'})

      }
    })()

    return () => {
      clearInterval(timer)
    }
  }, [])
  return done ? (
    <Outlet />
  ) : (
    <Stack className="w-screen h-screen relative z-[5] bg-white justify-center items-center">
      <Stack
        direction={"column"}
        justifyContent={"center"}
        className="w-[100%] max-w-[200px]"
        sx={{mb:"130px"}}
      >
        <img src="/assets/source.gif" className="w-[100%]" />
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
      </Stack>
    </Stack>
  )
}
