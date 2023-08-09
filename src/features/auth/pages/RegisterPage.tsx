import { InputField, PasswordField } from "@/components/FormControls"
import { RegisterForm } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { LockOutlined } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material"
import { ChangeEvent, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import * as yup from "yup"
export interface RegisterPageProps {}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="#">
        Iot soup
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export function RegisterPage(props: RegisterPageProps) {
  const [loadding, setLoading] = useState(false)
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const [checked, setChecked] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Hãy nhập tên đầy đủ của bạn")
      .test(
        "Họ và tên nên gồm 2 từ trờ lên",
        "Họ và tên nên gồm 2 từ trở lên",
        (value) => value.split(" ").length >= 2,
      ),
    username: yup
      .string()
      .required("Nhập mã sinh viên")
      .test(
        "Mã sinh viên có đủ 5 chữ số",
        "Mã sinh viên phải bắt đầu bằng A và có 5 chữ số đằng sau",
        (values) => {
          return values.length === 6 && values[0] === "A"
        },
      ),
    phoneNumber: yup
      .string()
      .required("Điền số điện thoại")
      .matches(phoneRegExp, "Số điện thoại không hợp lệ")
      .min(9, "Quá ngắn")
      .max(11, "Quá dài"),
    password: yup
      .string()
      .required("Nhập mật khẩu")
      .min(8, "Mật khẩu phải dài hơn 8 kí tự")
      .matches(/[A-Z]+/, "Mật khẩu cần ít nhất 1 kí tự in hoa"),
    rePassword: yup
      .string()
      .required("Nhập lại mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  })
  const form = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  })
  const handleRegister: SubmitHandler<RegisterForm> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <FormProvider {...form}>
            <Box
              component="form"
              onSubmit={form.handleSubmit(handleRegister)}
              sx={{ mt: 1 }}
            >
              <InputField name="name" label="Họ và tên" />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputField name="username" label="Mã sinh viên" />
                </Grid>
                <Grid item xs={6}>
                  <InputField name="phoneNumber" label="Số điện thoại" />
                </Grid>
              </Grid>

              <PasswordField name="password" label="Mật khẩu" />
              <PasswordField name="rePassword" label="Nhập lại mật khẩu" />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label={
                  <span>
                    Tôi đã đọc và đồng ý với{" "}
                    <span
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Điều khoản và Chính sách bảo mật
                    </span>
                  </span>
                }
              />
              <Button
                type="submit"
                disabled={loadding || !checked}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng ký
              </Button>

              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link
                    to="/login"
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {"Bạn đã có tài khoản? Đăng nhập"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </FormProvider>
        </Box>
        <Copyright sx={{ mt: 6, mb: 4 }} />
      </Container>
    </div>
  )
}
