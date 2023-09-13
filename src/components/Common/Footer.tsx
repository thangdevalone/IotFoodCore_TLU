import { Copyright } from "@mui/icons-material"
import {
  Badge,
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

export interface FooterProps {}

export function Footer(props: FooterProps) {
  const [rate, setRate] = useState(false)
  const handleRate = () => {
    console.log("a")
    setRate(!rate)
  }
  return (
    <div className=" bg-[var(--color-df-1)] py-5">
      <div className="container-base base-pd">
        <Grid sx={{ mb: 4 }} container spacing={2}>
          <Grid item xs={3}>
            <img src="/assets/iotfood.png" style={{ width: "200px" }} />
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                "& *": {
                  color: "white",
                },
                mt: 2,
              }}
            >
              <p className="mb-2 font-semibold text-lg">Phát triển bởi</p>
              <Stack direction="column" spacing={1}>
                <Typography sx={{ "&:hover": { textDecoration: "underline" } ,width:"fit-content"}}>
                  <Link to={"https://github.com/thangdevalone"} target="_blank">
                    thangdevalone (lead)
                  </Link>
                </Typography>
                <Typography sx={{ "&:hover": { textDecoration: "underline" },width:"fit-content" }}>
                  <Link to={"https://github.com/haidaqn"} target="_blank">
                    haidaqn
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                "& *": {
                  color: "white",
                },
                mt: 2,
              }}
            >
              <p className="mb-2 font-semibold text-lg">Dẫn dắt bởi</p>
              <Stack direction="column" spacing={1}>
                <Typography sx={{ "&:hover": { textDecoration: "underline" } ,width:"fit-content" }}>
                  <Link
                    to={"https://www.facebook.com/giang.bui.3511"}
                    target="_blank"
                  >
                    Bùi Trường Giang (Teacher_TLU)
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                "& *": {
                  color: "white",
                },
                mt: 2,
              }}
            >
              <p className="mb-2 font-semibold text-lg">Liên quan</p>
              <Stack direction="column" spacing={1}>
                <Typography sx={{ "&:hover": { textDecoration: "underline" } }}>
                  <Link
                    to={"https://www.facebook.com/giang.bui.3511"}
                    target="_blank"
                  >
                    Điều khoản và Chính sách bảo mật
                  </Link>
                </Typography>
                <Typography sx={{ "&:hover": { textDecoration: "underline" } }}>
                  <Link
                    to={"https://www.facebook.com/thanglonguniversity"}
                    target="_blank"
                  >
                    Thang Long University (facebook)
                  </Link>
                </Typography>
                <Typography sx={{ "&:hover": { textDecoration: "underline" } }}>
                  <Link
                    to={"https://www.facebook.com/CLB.TinHoc.TLU"}
                    target="_blank"
                  >
                    ThangLong Information Technology Club (TLIT)
                  </Link>
                </Typography>

                <Typography sx={{ "&:hover": { textDecoration: "underline" } }}>
                  <Link
                    to={"https://www.facebook.com/TLUConfessionsForTLUer"}
                    target="_blank"
                  >
                    Tờ Lú Confessions
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Divider
          sx={{ backgroundColor: "white", width: "100%", m: "20px 0px" }}
        />
        <Grid sx={{ mb: "20px" }} container spacing={2}>
          <Grid item xs={8}>
            <button
              type="button"
              onClick={() => {
                handleRate()
              }}
              className="border text-white border-gray-200  font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  mr-2 mb-2"
            >
              <svg
                className={`w-4 h-4 mr-2 ${
                  rate ? "text-yellow-400" : "text-gray-300"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              Tặng sao
              <div className="flex items-center justify-center text-[var(--color-df-1)] ml-2 bg-gray-300 p-1 w-5 h-5 rounded-[50%] font-semibold">
                {rate ? 1 : 0}
              </div>
            </button>
          </Grid>
          <Grid item xs={4}>
            <p className="text-white">
              Đây là dự án trong chuỗi phát triển của sinh viên trường Đại học Thăng
              Long chúc bạn có 1 trải nghiệm tốt. Xin cảm ơn!
            </p>
            <Divider
              sx={{ backgroundColor: "white", width: "100%", m: "10px 0px" }}
            />
            <Typography variant="body2" color="white">
              {"Copyright © "}
              <Link color="inherit" to="#">
                Iot soup
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
