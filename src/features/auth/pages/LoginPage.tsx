import { InputField, PasswordField } from "@/components/FormControls"
import { useWindowDimensions } from "@/hooks"

import { LoginForm } from "@/models"
import { useSnackbar } from "notistack"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import * as yup from "yup"
import { authActions } from "../AuthSlice"
import { useEffect } from "react"
export interface LoginPageProps {}
export function LoginPage(props: LoginPageProps) {
  const logging = useAppSelector((state) => state.auth.logging)
  const actionAuth = useAppSelector((state) => state.auth.actionAuth)
  const { enqueueSnackbar } = useSnackbar()
  const { width } = useWindowDimensions()
  const dispatch = useAppDispatch()
  const schema = yup.object().shape({
    username: yup.string().required("Cần nhập mã sinh viên"),
    password: yup
      .string()
      .required("Cần nhập mật khẩu")
      .min(6, "Mật khẩu cần dài hơn 6 kí tự"),
  })

  const form = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })
  const handleLogin: SubmitHandler<LoginForm> = (data) => {
    dispatch(authActions.login(data))
  }
  useEffect(() => {
    if (actionAuth == "Failed") {
      enqueueSnackbar("Tài khoản mật khẩu không chính xác hoặc không tồn tại", {
        variant: "error",
      })
    }
  }, [actionAuth])

  return (
    <div className="container-cs w-screen h-screen flex items-center justify-center">
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
              src="/assets/iotfood.png"
            />
          ) : (
            <img
              style={{
                position: "absolute",
                top: "15px",
                width: "100px",
                transform:"translateX(-50%)",
                left: "50%",
              }}
              src="/assets/iotfood_b.png"
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
                  Đăng nhập
                </Typography>
                <span style={{ color: "rgb(122, 122, 122)" }}>
                  Hãy đăng nhập để tiếp tục
                </span>
              </Box>
              <FormProvider {...form}>
                <form
                  style={{ display: "flex", flexDirection: "column" }}
                  onSubmit={form.handleSubmit(handleLogin)}
                >
                  <InputField label="Mã sinh viên" name="username" />
                  <PasswordField label="Mật khẩu" name="password" />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Tự động đăng nhập lần sau"
                  />

                  <Button
                    size="large"
                    sx={{ marginTop: 1 }}
                    variant="contained"
                    type="submit"
                    disabled={logging}
                  >
                    Đăng nhập
                  </Button>
                </form>
              </FormProvider>
              <Typography sx={{ textAlign: "center", marginTop: "10px" }}>
                Chưa có tài khoản?{" "}
                <Link style={{ color: "blue" }} to="/register">
                  Đăng kí
                </Link>
              </Typography>
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
              <Link style={{ color: "blue" }} to="/forgot">
                Quên mật khẩu?
              </Link>
              <Typography variant="body2" color="text.secondary">
                <Link
                  color="inherit"
                  style={{ textDecoration: "underline" }}
                  to="https://github.com/thangdevalone"
                >
                  @thangdevalone
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
