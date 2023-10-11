import userApi from "@/api/userApi"
import { InputField } from "@/components/FormControls"
import { useInforUser } from "@/hooks"
import { InfoForm } from "@/models/InfoForm"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  Divider,
  Grid,
  TextField,
} from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { useSnackbar } from "notistack"
import * as React from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"

export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  const user = useInforUser()
  console.log(user)
  const { enqueueSnackbar } = useSnackbar()
  const [file, setFile] = React.useState<File | null>()
  const imgRef = React.useRef<HTMLInputElement | null>(null)
  const [imagePreview, setImagePreview] = React.useState<string>("")
  const [verifyOtp, setVerifyOtp] = React.useState<boolean>(false)
  const [otpValue, setOptValue] = React.useState<string>("")
  const schema = yup.object().shape({
    accountName: yup.string().required("Vui lòng nhập tên của bạn !"),
    sdt: yup.string().required("Vui lòng nhập số điện thoại !"),
    msv: yup.string().required("Vui lòng nhập mã sinh viên của bạn !"),
    email: yup.string().email("Vui lòng nhập đúng định dạng !"),
  })
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0]
    console.log(selectedImage)
    if (selectedImage && event.target.files) {
      setFile(event.target.files[0])
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(selectedImage)
    }
  }
  const [open, setOpen] = React.useState(false)
  const handleSendOtp = async (email: string) => {
    try {
      const response = await userApi.verifyEmail(email)
    } catch (err) {
      console.log(err)
    }
  }

  const confirmOtp = async (otp: string) => {
    try {
      const response = await userApi.validate(otp)
      console.log(response)
      if (response.status) {
        enqueueSnackbar("Xác thực gmail thành công !", {
          variant: "success",
        })
        setOpen(false)
      } else {
        enqueueSnackbar("Xác thực gmail thất bại !", {
          variant: "error",
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    confirmOtp(otpValue)
  }
  const form = useForm<InfoForm>({
    defaultValues: {
      accountName: user?.accountName || "",
      sdt: user?.sdt || "",
      msv: user?.msv || "",
      email: user?.email || "",
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit: SubmitHandler<InfoForm> = (data) => {
    if (data.email?.length && data.email !== user?.email) {
      setOpen(true)
      handleSendOtp(data.email)
    }
  }

  return (
    <div className="relative w-full">
      <div className="mb-5">
        <h1 className="text-18-500">Hồ Sơ Của Tôi</h1>
        <p className="text-[#999798]">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
      </div>
      <Divider />
      <div className="flex mt-5">
        <Container className="!pl-0">
          <FormProvider {...form}>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <Grid container columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputField label="Tên của bạn" name="accountName" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField label="Mã sinh viên" name="msv" disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField label="Số điện thoại" name="sdt" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField label="Email" name="email" />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: "20px" }}
              >
                Lưu
              </Button>
            </form>
          </FormProvider>
        </Container>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box className="flex items-center justify-center flex-col w-[250px]">
          <input
            ref={imgRef}
            hidden={true}
            type="file"
            id="imageInput"
            onChange={handleImageChange}
            name="imageInput"
            accept="image/png, image/jpeg"
          ></input>
          <Avatar
            variant="circular"
            alt="avatar"
            sx={{ width: "100px", height: "100px", mr: 1, mb: 3 }}
            src={imagePreview}
            onClick={() => {
              imgRef.current?.click()
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              imgRef.current?.click()
            }}
          >
            Chọn ảnh
          </Button>
        </Box>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Vui lòng kiểm tra gmail để lấy mã OTP</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="OTP"
            type="email"
            fullWidth
            variant="standard"
            style={{ width: "20vw" }}
            value={otpValue}
            onChange={(e) => setOptValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleConfirm}>Xác Nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
