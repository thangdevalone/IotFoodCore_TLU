import adminApi from "@/api/adminApi"
import { VoucherItem } from "@/models"
import { ArrowBackIosNew, CloudUpload, Replay } from "@mui/icons-material"
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Input,
  Paper,
  Stack,
  Tab,
  Tabs,
} from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import dayjs from "dayjs"
import { useSnackbar } from "notistack"
import React, { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}
function UpdateVoucher({ id }: { id: string }) {
  const [loading, setLoading] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [tabs, setTabs] = React.useState(0)
  const [discount, setDiscount] = React.useState(0)
  const [idVoucher, setIdVoucher] = React.useState("")
  const [detail, setDetail] = React.useState("")
  const [quantity, setQuantity] = React.useState(0)
  const [expired, setExpired] = React.useState<any>(dayjs(Date.now()))
  const [title, setTitle] = React.useState("")
  const [idD, setIdD] = React.useState("")
  const [createDate, setCreateDate] = React.useState("")

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue)
  }

  const handlePushProduct = () => {
    async function uploadData() {
      setLoading(true)
      try {
        const voucher: VoucherItem = {
          code: idVoucher,
          detail: detail,
          discount: discount,
          expired: dayjs(expired).format("YYYY-MM-DD"),
          quantity: quantity,
          title: title,
          id: +idD,
          createDate,
          status: true,
        }
        const response = await adminApi.updateVoucher(voucher)
        // console.log(response)
        setLoading(false)
        enqueueSnackbar("Sửa ưu đãi thành công", { variant: "success" })
        setIdVoucher("")
        setQuantity(0)
        setDiscount(0)
        setTitle("")
      } catch (error) {
        setLoading(false)
        enqueueSnackbar("Sửa ưu đãi thất bại", { variant: "error" })
      }
    }
    uploadData()
  }
  const handleChangeInput = (
    value: string,
    callback: (newVal: string) => void,
  ) => {
    callback(value)
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApi.getDetailVoucher(+id)
        // console.log(response)
        if (response?.status) {
          setDiscount(response?.data?.discount)
          setIdVoucher(response?.data?.code)
          setDetail(response?.data?.detail)
          setQuantity(response?.data?.quantity)
          setExpired(dayjs(response?.data?.expired))
          setTitle(response?.data?.title)
          setIdD(response?.data?.id)
          setCreateDate(response?.data?.createDate)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const navigate = useNavigate()
  return (
    <Box sx={{ height: "100%" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
            navigate("/admin/voucher")
          }}
          variant="contained"
          sx={{ mr: "10px", textTransform: "revert" }}
        >
          Ưu đãi
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
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: "rgb(240, 242, 245)",
                p: "10px",
              }}
            >
              <p className="font-medium text-lg mb-2">Thêm ưu đãi mới</p>
              <div className="border   bg-white rounded-md border-gray-300 p-[15px]">
                <div className="flex w-[100%]">
                  <div className="flex-1 mr-[20px]">
                    <label className="font-medium text-md block">
                      Tên ưu đãi
                    </label>
                    <Input
                      fullWidth
                      sx={{ height: "50px", fontSize: "25px", p: 0 }}
                      placeholder="VD: Giảm giá 15% phí vận chuyển"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={tabs}
                      onChange={handleChange}
                      aria-label="product tabs example"
                    >
                      <Tab label="Thông tin voucher" {...a11yProps(0)} />
                    </Tabs>
                  </Box>
                  <div hidden={tabs !== 0}>
                    {tabs === 0 && (
                      <Box sx={{ padding: "20px 15px" }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Grid container spacing={2}>
                              <Grid item xs={4}>
                                <label
                                  htmlFor="type-food-select"
                                  className="font-medium "
                                >
                                  IDVOUCHER
                                </label>
                              </Grid>
                              <Grid item xs={8}>
                                <input
                                  id="name-food-select"
                                  value={idVoucher}
                                  placeholder="#VTLU15MIN50"
                                  type="text"
                                  autoComplete="off"
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>,
                                  ) => {
                                    setIdVoucher(e.target.value)
                                  }}
                                  className="block px-0 w-[150px]  border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <label
                                  htmlFor="type-food-select"
                                  className="font-medium "
                                >
                                  Số lượng
                                </label>
                              </Grid>
                              <Grid item xs={8}>
                                <input
                                  id="name-food-select"
                                  value={quantity}
                                  type="text"
                                  autoComplete="off"
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>,
                                  ) => {
                                    if (!Number.isNaN(Number(e.target.value))) {
                                      setQuantity(Number(e.target.value))
                                    }
                                  }}
                                  className="block px-0 w-[150px]  border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container spacing={2}>
                              <Grid item xs={4}>
                                <label
                                  htmlFor="name-food-select"
                                  className="font-medium "
                                >
                                  Phần trăm
                                </label>
                              </Grid>
                              <Grid item xs={8}>
                                <div className="flex items-end">
                                  <input
                                    id="name-food-select"
                                    value={discount}
                                    type="text"
                                    autoComplete="off"
                                    onChange={(
                                      e: ChangeEvent<HTMLInputElement>,
                                    ) => {
                                      if (
                                        !Number.isNaN(Number(e.target.value))
                                      ) {
                                        setDiscount(Number(e.target.value))
                                      }
                                    }}
                                    className="block px-0 w-[150px]  border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
                                  />
                                  %
                                </div>
                              </Grid>

                              <Grid item xs={4}>
                                <label
                                  htmlFor="name-food-select"
                                  className="font-medium "
                                >
                                  Ngày hết hạn
                                </label>
                              </Grid>
                              <Grid
                                sx={{
                                  "& .MuiStack-root": {
                                    padding: 0,
                                  },
                                  "& input": {
                                    padding: 0,
                                  },
                                }}
                                item
                                xs={8}
                              >
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <MobileDatePicker
                                    sx={{
                                      "& .MuiOutlinedInput-notchedOutline": {
                                        border: "none",
                                        borderBottom:
                                          "2px solid rgb(229 231 235)",
                                      },
                                      "& .MuiInputBase-root": {
                                        borderRadius: "unset",
                                      },
                                    }}
                                    value={expired}
                                    onChange={(value) => setExpired(value)}
                                    format="DD/MM/YYYY"
                                  />
                                </LocalizationProvider>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Box sx={{ mt: "30px" }}>
                          <label
                            htmlFor="message"
                            className="block mb-2  font-medium text-gray-900 dark:text-white"
                          >
                            Mô tả ưu đãi
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            value={detail}
                            onChange={(
                              e: React.ChangeEvent<HTMLTextAreaElement>,
                            ) => handleChangeInput(e.target.value, setDetail)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Viết mô tả về ưu đãi..."
                          ></textarea>
                        </Box>
                      </Box>
                    )}
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

export default UpdateVoucher
