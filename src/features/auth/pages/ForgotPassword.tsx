import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { InputField, PasswordField } from "@/components/FormControls"
import { useWindowDimensions } from "@/hooks"
import { ForgotForm } from "@/models/ForgotForm"
import { yupResolver } from "@hookform/resolvers/yup"
import { ArrowBack } from "@mui/icons-material"
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import * as React from "react"
import userApi from "@/api/userApi"

const ForgotPassword = () => {
  const logging = useAppSelector((state) => state.auth.logging)
  const actionAuth = useAppSelector((state) => state.auth.actionAuth)
  const [openOtp, setOpenOtp] = React.useState<boolean>(false)
  const [openPassword, setOpenPassword] = React.useState<boolean>(false)
  const [otpRes, setOtpRes] = React.useState<string>("")
  const { enqueueSnackbar } = useSnackbar()
  const { width } = useWindowDimensions()
  const dispatch = useAppDispatch()
  const schema = yup.object().shape({
    username: yup.string().required("Cần nhập mã sinh viên"),
    otp: yup.string(),
    newPassword: yup.string(),
  })

  const form = useForm<ForgotForm>({
    resolver: yupResolver(schema),
  })
  const handleSendOtp = async (name: string) => {
    try {
      const response = await userApi.forgotPassword(name)
      if (response.status) setOpenOtp(true)
    } catch (err) {
      console.log(err)
    }
  }
  const handleConfirmOtp = async (otp: string) => {
    try {
      const response = await userApi.finalOtpForgot(otp)
      if (response.status) {
        setOtpRes(response.data)
        setOpenPassword(true)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleForgotPassword = async ({
    newPassword,
    username,
  }: {
    newPassword: string
    username: string
  }) => {
    try {
      const response = await userApi.finalPassword({
        otp: otpRes,
        newPassword,
        username,
      })
      if (response.status) {
        enqueueSnackbar("Cập nhật mật khẩu thành công", {
          variant: "success",
        })
      } else {
        enqueueSnackbar("Cập nhật mật khẩu không thành công", {
          variant: "error",
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "hidden scroll"
    }
  }, [])
  const handleSubmit: SubmitHandler<ForgotForm> = (data) => {
    if (openPassword) {
      if (data.otp?.length && data.newPassword?.length) {
        handleForgotPassword({
          newPassword: data.newPassword,
          username: data.username,
        })
      }
    }
    if (openOtp && !openPassword) {
      if (data.otp?.length) {
        handleConfirmOtp(data.otp)
      }
    }
    if (!openOtp && !openPassword) handleSendOtp(data.username)
  }
  const navigate = useNavigate()
  const handleHome = () => {
    navigate("/")
  }
  return (
    <div className="container-cs w-screen relative h-screen flex items-center justify-center">
      <IconButton
        onClick={handleHome}
        sx={{ position: "absolute" }}
        className="top-[15px] left-[15px]"
      >
        <ArrowBack htmlColor="white" />
      </IconButton>
      {logging && (
        <LinearProgress
          sx={{ position: "fixed", top: "0px", left: "0px", width: "100%" }}
        />
      )}
      <Paper
        elevation={8}
        sx={{
          zIndex: 5,
          maxWidth: "1000px",
          maxHeight: "500px",
          width: "90%",
          height: "70%",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <Stack
          sx={{ width: "100%", height: "100%", position: "relative" }}
          flexDirection={"row"}
        >
          {width > 900 ? (
            <img
              style={{
                position: "absolute",
                top: "15px",
                width: "100px",
                left: "15px",
              }}
              src="/assets/tlufood.png"
            />
          ) : (
            <img
              style={{
                position: "absolute",
                top: "15px",
                width: "100px",
                transform: "translateX(-50%)",
                left: "50%",
              }}
              src="/assets/tlufood_b.png"
            />
          )}
          {width > 900 && (
            <Stack
              sx={{
                width: "50%",
                height: "100%",
                backgroundColor: "var(--color-df-1)",
                p: 2,
                opacity: "1",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img
                style={{ width: "60%" }}
                src="/assets/logo_iot.png"
                alt="logo-iot"
              />
            </Stack>
          )}

          <Stack sx={{ flex: "1 1", position: "relative" }}>
            <Box
              sx={{
                padding: "0 20px 0 20px",
                width: "100%",
                margin: "0 auto",
                mt: "50px",
              }}
            >
              <Box sx={{ marginBottom: "20px" }}>
                <Typography variant="h4" sx={{ fontWeight: 500 }}>
                  Quên mật khẩu
                </Typography>
                <span style={{ color: "rgb(122, 122, 122)" }}>
                  Hãy nhập đủ thông tin dưới đây để cập nhập lại mật khẩu
                </span>
              </Box>
              <FormProvider {...form}>
                <form
                  style={{ display: "flex", flexDirection: "column" }}
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <InputField label="Mã sinh viên" name="username" />
                  {openOtp && <InputField label="Mã OTP" name="otp" />}
                  {openPassword && (
                    <PasswordField label="Mật khẩu" name="newPassword" />
                  )}
                  <Button
                    size="large"
                    sx={{ marginTop: 1 }}
                    variant="contained"
                    type="submit"
                  >
                    {!openOtp && !openPassword
                      ? "Gửi OTP"
                      : openOtp && !openPassword
                      ? "Xác thực OTP"
                      : "Cập nhật lại mật khẩu"}
                  </Button>
                </form>
              </FormProvider>
            </Box>
            <Stack
              justifyContent={"space-between"}
              flexDirection={"row"}
              sx={{
                position: "absolute",
                bottom: "10px",
                width: "100%",
                padding: "0 20px 0px 20px",
              }}
            >
              <Link style={{ color: "blue" }} to="/login">
                Bạn đã có tài khoản?
              </Link>
              <Typography variant="body2" color="text.secondary">
                Form by{" "}
                <Link
                  color="inherit"
                  style={{ textDecoration: "underline" }}
                  to="https://github.com/haidaqn"
                >
                  @haidaqn
                </Link>{" "}
                {new Date().getFullYear()}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </div>
  )
}

export default ForgotPassword
