import cloudUploadApi from "@/api/cloudUploadApi"
import { AutoField } from "@/components/Common"
import { CLOUD_NAME } from "@/constants"
import { searchRoot } from "@/models"
import { handlePrice } from "@/utils"
import {
  ArrowBackIosNew,
  CloudUpload,
  Delete,
  Replay,
  Visibility,
} from "@mui/icons-material"
import {
  Backdrop,
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}
export interface NewProductProps {}

function NewStore(props: NewProductProps) {
  const [value, setValue] = React.useState(0)
  const [file, setFile] = React.useState<File | null>()
  const imgRef = React.useRef<HTMLInputElement | null>(null)
  const [openBackDrop, setOpenBackDrop] = React.useState(false)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleImageClick = () => {
    if (imgRef.current !== null && !imagePreview) {
      imgRef.current.click()
    }
  }
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0]

    if (selectedImage && event.target.files) {
      setFile(event.target.files[0])
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(selectedImage)
    }
  }
  const handlePushProduct = () => {
    async function uploadImage() {
      try {
        if (file) {
          const data = new FormData()
          data.append("file", file)
          data.append("upload_preset", "thangdev_food")
          data.append("cloud_name", CLOUD_NAME)
          console.log(data.values())
          const res = await cloudUploadApi.uploadImage(data)
          console.log(res)
        }
      } catch (error) {
        console.log(error)
      }
    }
    uploadImage()
  }
  const navigate = useNavigate()
  return (
    <Box sx={{ height: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          p: "10px",
          boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Button
          size="small"
          startIcon={<ArrowBackIosNew fontSize="small" />}
          onClick={() => {
            navigate("/admin/supplier")
          }}
          variant="contained"
          sx={{ mr: "10px", textTransform: "revert" }}
        >
          Cửa hàng
        </Button>
        <IconButton onClick={handlePushProduct} size="small" sx={{ mr: "5px" }}>
          <CloudUpload fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ mr: "5px" }}>
          <Replay fontSize="small" />
        </IconButton>
      </Stack>
      <Box
        sx={{
          background: "rgb(240, 242, 245)",
          p: "10px",
          height: "calc(100% - 51px)",
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <p className="font-medium text-lg mb-2">Thêm cửa hàng mới</p>
          <div className="border   bg-white rounded-md border-gray-300 p-[15px]">
            <div className="flex w-[100%]">
              <div className="flex-1 mr-[20px]">
                <label className="font-medium text-md block">
                  Tên cửa hàng
                </label>
                <Input
                  fullWidth
                  sx={{ height: "50px", fontSize: "25px", p: 0 }}
                  placeholder="VD: Nhà hàng Hải Đăng,..."
                />
              </div>
              <div
                onClick={handleImageClick}
                className="w-[150px] relative h-[150px] cursor-pointer border"
              >
                {imagePreview ? (
                  <>
                    <Backdrop
                      sx={{ zIndex: "100" }}
                      open={openBackDrop}
                      onClick={() => setOpenBackDrop(false)}
                    >
                      <img
                        className="w-[400px] object-contain"
                        src={imagePreview}
                        alt="Preview"
                      />
                    </Backdrop>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        "&:hover .tool-img": {
                          display: "flex !important",
                        },
                      }}
                    >
                      <img
                        className="w-[100%] h-[100%] object-cover"
                        src={imagePreview}
                        alt="Preview"
                      />
                      <div className="absolute tool-img top-0 left-0 hidden items-center justify-center w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] z-10">
                        <IconButton onClick={() => setOpenBackDrop(true)}>
                          <Visibility htmlColor="white" />
                        </IconButton>
                        <IconButton onClick={() => setImagePreview(null)}>
                          <Delete htmlColor="white" />
                        </IconButton>
                      </div>
                    </Box>
                  </>
                ) : (
                  <img
                    className="w-[100%] h-[100%] object-cover"
                    src="/assets/camera_add.png"
                    alt="Add Image"
                  />
                )}
                <input
                  ref={imgRef}
                  hidden={true}
                  type="file"
                  id="imageInput"
                  onChange={handleImageChange}
                  name="imageInput"
                  accept="image/png, image/jpeg"
                ></input>
              </div>
            </div>
            <div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Thông tin cửa hàng" {...a11yProps(0)} />
                </Tabs>
              </Box>
              <div hidden={value !== 0}>
                {value === 0 && (
                  <Box sx={{ padding: "20px 15px" }}>
                    <Box className="flex flex-col gap-5">
                      <div className="flex gap-3">
                        <label className="font-medium flex-1 text-md block">
                          Tên cửa hàng
                        </label>
                        <Input
                          fullWidth
                          sx={{ height: "50px", fontSize: "25px", p: 0 }}
                          placeholder="VD: Nhà hàng Hải Đăng,..."
                          className="flex-3"
                        />
                      </div>
                      <div className="flex gap-3">
                        <label className="font-medium flex-1 text-md block">
                          Địa chỉ quán
                        </label>
                        <Input
                          fullWidth
                          sx={{ height: "50px", fontSize: "25px", p: 0 }}
                          placeholder="VD: Lỗ giao việt hùng,..."
                          className="flex-3"
                        />
                      </div>
                      <div className="flex gap-3">
                        <label className="font-medium text-md flex-1 block">
                          Khoảng cách từ trường đến quán
                        </label>
                        <Input
                          fullWidth
                          sx={{ height: "50px", fontSize: "25px", p: 0 }}
                          placeholder="VD: 1km, 3km, ..."
                          className="flex-3"
                        />
                      </div>
                      <div className="flex gap-3">
                        <label className="font-medium text-md flex-1 block">
                          Số điện thoại của quá
                        </label>
                        <Input
                          fullWidth
                          sx={{ height: "50px", fontSize: "25px", p: 0 }}
                          placeholder="VD: 0335389999,..."
                          className="flex-3"
                        />
                      </div>
                    </Box>
                    <Box sx={{ mt: "30px" }}>
                      <label
                        htmlFor="message"
                        className="block mb-2  font-medium text-gray-900 dark:text-white"
                      >
                        Mô tả cửa hàng
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Viết mô tả về cửa hàng của Hải Đăng Store..."
                      ></textarea>
                    </Box>
                  </Box>
                )}
              </div>
              <div hidden={value !== 1}>
                {value === 1 && <Box sx={{ p: 2 }}>Bán hàng</Box>}
              </div>
              <div hidden={value !== 2}>
                {value === 2 && <Box sx={{ p: 2 }}>Mua hàng</Box>}
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default NewStore
