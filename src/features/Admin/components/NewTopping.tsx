import adminApi from "@/api/adminApi"
import { AutoField } from "@/components/Common"
import { ExpandFood, ToppingItem, searchRoot } from "@/models"
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
} from "@mui/material"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ToppingTable from "./ToppingTable"

export interface NewProductProps {}

function NewTopping(props: NewProductProps) {
  const [loadding, setLoadding] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [titleTopping, setTitleTopping] = useState("")
  const [req, setReq] = useState(true)
  const [resPick, setResPick] = React.useState<searchRoot | null>(null)
  const [toppingList, setToppingList] = React.useState<ToppingItem[] | []>([])

  const handlePushTopping = () => {
    async function uploadImage() {
      setLoadding(true)
      try {
        if(resPick || titleTopping || toppingList.length){
          const data: ExpandFood = { title: titleTopping, require: req, resId:resPick?.id,item:toppingList }
          await adminApi.addTopping(data)
          setToppingList([])
          setTitleTopping("")
          enqueueSnackbar("Tạo loại thành công", { variant: "success" })
        }
        else{

          enqueueSnackbar("Yêu cầu đủ các trường", { variant: "error" })
        }
        setLoadding(false)
      } catch (error) {
        setLoadding(false)
        enqueueSnackbar("Tạo loại thất bại", { variant: "error" })
      }
    }
    uploadImage()
  }
  const navigate = useNavigate()
  return (
    <Box sx={{ height: "100%" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadding}
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
            navigate("/admin/supplier")
          }}
          variant="contained"
          sx={{ mr: "10px", textTransform: "revert" }}
        >
          Nhà cung cấp
        </Button>
        <IconButton onClick={handlePushTopping} size="small" sx={{ mr: "5px" }}>
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
              <p className="font-medium text-lg mb-2">Thêm món kèm mới</p>
              <div className="border   bg-white rounded-md border-gray-300 p-[15px]">
                <Input
                  fullWidth
                  sx={{ height: "50px", fontSize: "25px", p: 0 }}
                  placeholder="VD: Topping..."
                  value={titleTopping}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTitleTopping(e.target.value)
                  }}
                />
                <div className="flex items-center mb-4 mt-3">
                  <input
                    id="state-topping"
                    type="checkbox"
                    onChange={() => {
                      setReq(!req)
                    }}
                    defaultChecked={req}
                    className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="state-topping"
                    className="ml-2 text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-300"
                  >
                    Bắt buộc
                  </label>
                </div>
                <div className="flex items-center mb-4 mt-3">
                  <label
                    htmlFor="auto-res"
                    className="mr-10 text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-300"
                  >
                    Thuộc về
                  </label>
                  <div className="w-[100%] min-w-[200px] max-w-[300px]">
                  <AutoField
                    apiHandle="res"
                    value={resPick}
                    setValue={setResPick}
                  />
                  </div>
                </div>

                <Stack
                  alignItems="flex-end"
                  sx={{ m: "10px 0px", width: "100%" }}
                >
                  <ToppingTable
                    toppingList={toppingList}
                    setToppingList={setToppingList}
                  />
                </Stack>
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

export default NewTopping
