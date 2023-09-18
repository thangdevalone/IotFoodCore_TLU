import foodsApis from "@/api/foodsApi"
import { StoreDetailData } from "@/models"
import React, { useEffect, memo, ChangeEvent } from "react"
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
  MenuItem,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
const UpdateSupplier = ({ id }: { id: string }) => {
  const [file, setFile] = React.useState<File | null>()
  const [value, setValue] = React.useState(0)
  const [phone, setPhone] = React.useState<string>("")
  const [address, setAddress] = React.useState<string>("")
  const [supOpen, setSupOpen] = React.useState<string>("")
  const [supClose, setSupClose] = React.useState<string>("")
  const [restaurantName, setRestaurantName] = React.useState<string>("")
  const [detail, setDetail] = React.useState<string>("")
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [distance, setDistance] = React.useState<string>("")
  const [quantitySold, setQuantitySold] = React.useState<number>(0)
  const imgRef = React.useRef<HTMLInputElement | null>(null)
  const [openBackDrop, setOpenBackDrop] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    const fetchData = async () => {
      const response = await foodsApis.getDetailStore(+id)
      if (response?.status) {
        setRestaurantName(response?.data?.restaurantName)
        setAddress(response?.data?.address)
        setQuantitySold(response?.data?.quantitySold)
        setDistance(response?.data?.distance)
        setDetail(response?.data?.detail)
        setSupOpen(response?.data?.timeStart)
        setSupClose(response?.data?.timeClose)
        setPhone(response?.data?.phoneNumber)
        setImagePreview(response?.data?.imgRes)
      }
    }
    fetchData()
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    }
  }
  const handleImageClick = () => {
    if (imgRef.current !== null && !imagePreview) {
      imgRef.current.click()
    }
  }

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
          await adminApi.updateSupplier(
            +id,
            restaurantName,
            address,
        
            distance,
            detail,
            supOpen,
            supClose,
            phone,
            file,
          )
        } else {
          await adminApi.updateSupplier(
            +id,
            restaurantName,
            address,
            distance,
            detail,
            supOpen,
            supClose,
            phone,
            null,
          )
        }
        enqueueSnackbar("Sửa nhà cung cấp thành công", { variant: "success" })
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
  const handleDistance = (value: string) => {
    setDistance(value)
  }

  const handleSupOpen = (value: string) => {
    setSupOpen(value)
  }

  const handleSupClose = (value: string) => {
    setSupClose(value)
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
          Nhà cung cấp
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
              <p className="font-medium text-lg mb-2">Sửa nhà cung cấp</p>
              <div className="border   bg-white rounded-md border-gray-300 p-[15px]">
                <div className="flex w-[100%]">
                  <div className="flex-1 mr-[20px]">
                    <label className="font-medium text-md block">
                      Tên nhà cung cấp
                    </label>
                    <Input
                      fullWidth
                      sx={{ height: "50px", fontSize: "25px", p: 0 }}
                      placeholder="VD: Nhà hàng Hải Đăng,..."
                      onChange={(e) => setRestaurantName(e.target.value)}
                      value={restaurantName}
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
                      onChange={handleChange}
                      value={value}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Thông tin nhà cung cấp" {...a11yProps(0)} />
                    </Tabs>
                  </Box>
                  <div>
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
                                  type="text"
                                  autoComplete="off"
                                  onChange={(e) =>
                                    handleAddress(e.target.value)
                                  }
                                  className="block px-0 w-[250px] border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
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
                                  type="text"
                                  autoComplete="off"
                                  onChange={(e) => handlePhone(e.target.value)}
                                  className="block px-0 w-[250px]   border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container spacing={2}>
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
                                    type="text"
                                    autoComplete="off"
                                    onChange={(
                                      e: ChangeEvent<HTMLInputElement>,
                                    ) => handleDistance(e.target.value)}
                                    className="block px-0 w-[250px]  border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                  />
                                  <span>km</span>
                                </div>
                              </Grid>
                              <Grid item xs={4}>
                                <label
                                  htmlFor="type-food-select"
                                  className="font-medium "
                                >
                                  Giờ mở cửa
                                </label>
                              </Grid>
                              <Grid item xs={8}>
                                <input
                                  id="name-food-select"
                                  placeholder="8:00 AM"
                                  value={supOpen}
                                  type="text"
                                  autoComplete="off"
                                  onChange={(e) =>
                                    handleSupOpen(e.target.value)
                                  }
                                  className="block px-0 w-[250px]  border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <label
                                  htmlFor="type-food-select"
                                  className="font-medium "
                                >
                                  Giờ đóng cửa
                                </label>
                              </Grid>
                              <Grid item xs={8}>
                                <input
                                  id="name-food-select"
                                  placeholder="3:00 PM"
                                  value={supClose}
                                  type="text"
                                  autoComplete="off"
                                  onChange={(e) =>
                                    handleSupClose(e.target.value)
                                  }
                                  className="block px-0 w-[250px]  border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                />
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
                          Mô tả
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Viết mô tả về nhà cung cấp của Hải Đăng Store..."
                          onChange={(e) => setDetail(e.target.value)}
                          value={detail}
                        ></textarea>
                      </Box>
                    </Box>
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

export default memo(UpdateSupplier)
