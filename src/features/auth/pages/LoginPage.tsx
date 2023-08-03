import { InputField, PasswordField } from "@/components/FormControls"
import { useWindowDimensions } from "@/hooks"

import { LoginForm } from "@/models"

import { yupResolver } from "@hookform/resolvers/yup"
import {
  Box,
  Paper,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import * as yup from "yup"
export interface LoginPageProps {}

export function LoginPage(props: LoginPageProps) {
  const schema = yup.object().shape({
    username: yup.string().required("Cần nhập mã sinh viên"),
    password: yup
      .string()
      .required("Cần nhập mật khẩu")
      .min(8, "Mật khẩu cần dài hơn 8 kí tự"),
  })
  const form = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })
  const handleLogin: SubmitHandler<LoginForm> = (data) => {
    console.log(data)
  }
  const { width } = useWindowDimensions()
  return (
    <div className="container-cs w-screen h-screen flex items-center justify-center relative">
      <Paper
        elevation={8}
        sx={{
          zIndex: 5,
          maxWidth: "1000px",
          width: "80%",
          height: "70%",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <Stack
          sx={{ width: "100%", height: "100%", position: "relative" }}
          flexDirection={"row"}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "20px",
              position: "absolute",
              top: "15px",
              left: "15px",
            }}
          >
            Name App
          </Typography>
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
                src="src/assets/logo_iot.png"
                alt="logo-iot"
              />
            </Stack>
          )}

          <Stack sx={{ flex: "1 1" }}>
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
                  Đăng nhập!
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
                  >
                    Đăng nhập
                  </Button>
                </form>
              </FormProvider>
              <Typography sx={{ textAlign: "center", marginTop: "10px" }}>
                Chưa có tài khoản?{" "}
                <Link
                  style={{ color: "blue", textDecoration: "underline" }}
                  to="/register"
                >
                  Đăng kí
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </div>
  )
}
