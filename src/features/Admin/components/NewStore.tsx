import adminApi from "@/api/adminApi"
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
} from "@mui/material"
import { useSnackbar } from "notistack"
import React from "react"
import { useNavigate } from "react-router-dom"
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
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
  const [phone, setPhone] = React.useState<string>("")
  const [address, setAddress] = React.useState<string>("")
  const [restaurantName, setRestaurantName] = React.useState<string>("")
  const [detail, setDetail] = React.useState<string>("")
  const [distance, setDistance] = React.useState<number>(0)
  const imgRef = React.useRef<HTMLInputElement | null>(null)
  const [openBackDrop, setOpenBackDrop] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()
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
  const handlePushProduct = async () => {
    async function uploadImage() {
      try {
        if (file) {
          await adminApi.addRestaurant(
            restaurantName,
            address,
            0,
            distance,
            detail,
            phone,
            file,
          )
          enqueueSnackbar("Tạo cửa hàng thành công", { variant: "success" })
        }
      } catch (error) {
        console.log(error)
        enqueueSnackbar("Có lỗi xảy ra thử lại sau", { variant: "error" })
      }
    }
    uploadImage()
  }

  const handlePhone = (value: string) => {
    setPhone(value)
  }

  const handleAddress = (value: string) => {
    setAddress(value)
  }

  const handleDistance = (value: number) => {
    setDistance(value)
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
        className="overflow-x-hidden overflow-y-auto"
      >
        <Grid sx={{ width: "100%", height: "100%" }} container spacing={2}>
          <Grid item xs={8}>
            <Box sx={{ width: "100%", height: "100%" }} className="mb-4">
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
                      onChange={(e) => setRestaurantName(e.target.value)}
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
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Grid container spacing={2}>
                                <Grid item xs={4}>
                                  <label
                                    htmlFor="type-food-select"
                                    className="font-medium "
                                  >
                                    Địa chỉ quán
                                  </label>
                                </Grid>
                                <Grid item xs={8}>
                                  <input
                                    id="name-food-select"
                                    value={address}
                                    type="string"
                                    autoComplete="off"
                                    onChange={(e) =>
                                      handleAddress(e.target.value)
                                    }
                                    className="block px-0 w-[250px]   border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <label
                                    htmlFor="type-food-select"
                                    className="font-medium "
                                  >
                                    Số điện thoại
                                  </label>
                                </Grid>
                                <Grid item xs={8}>
                                  <input
                                    id="name-food-select"
                                    value={phone}
                                    type="string"
                                    autoComplete="off"
                                    onChange={(e) =>
                                      handlePhone(e.target.value)
                                    }
                                    className="block px-0 w-[250px]   border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6}>
                              <Grid container spacing={0}>
                                <Grid item xs={4}>
                                  <label
                                    htmlFor="type-food-select"
                                    className="font-medium "
                                  >
                                    Khoảng cách
                                  </label>
                                </Grid>
                                <Grid item xs={8}>
                                  <div className="flex">
                                    <input
                                      id="name-food-select"
                                      value={distance}
                                      type="string"
                                      autoComplete="off"
                                      onChange={(e) =>
                                        handleDistance(+e.target.value)
                                      }
                                      className="block px-0 w-[250px]  border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                    />
                                    <span>km</span>
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
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
                            onChange={(e) => setDetail(e.target.value)}
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
          </Grid>
          <Grid item xs={4}>
            <Paper
              elevation={1}
              sx={{
                width: "100%",
                height: "95%",
                borderRadius: "8px",
                p: "10px",
              }}
            >
              Logcat
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default NewStore
