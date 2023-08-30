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

export interface NewProductProps {}

function NewType(props: NewProductProps) {
  const [file, setFile] = React.useState<File | null>()
  const imgRef = React.useRef<HTMLInputElement | null>(null)
  const [openBackDrop, setOpenBackDrop] = React.useState(false)

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
            navigate("/admin/type")
          }}
          variant="contained"
          sx={{ mr: "10px", textTransform: "revert" }}
        >
          Loại sản phẩm
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
          width: "100%",
          height: "100%",
          background: "rgb(240, 242, 245)",
          p: "10px",
        }}
      >
        <p className="font-medium text-lg mb-2">Thêm loại sản phẩm mới</p>
        <div className="border   bg-white rounded-md border-gray-300 p-[15px]">
          <div className="flex w-[100%]">
            <div className="flex-1 mr-[20px]">
              <label className="font-medium text-md block">
                Tên loại sản phẩm
              </label>
              <Input
                fullWidth
                sx={{ height: "50px", fontSize: "25px", p: 0 }}
                placeholder="VD: Bún, đồ uống..."
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
          <div></div>
        </div>
      </Box>
    </Box>
  )
}

export default NewType