import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import { Box, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface propsData {
  nameRes: string
  star: number
  distance: number
  idRes: number
  imgRes: string
  detail: string
}

export const ItemRes = (props: propsData) => {
  const { nameRes, imgRes, star, detail, idRes, distance } = props
  const navigate = useNavigate()
  const handleRouter = (id: number) => {
    navigate(`/store/detail-store/${id}`)
  }
  return (
    <Box
      sx={{
        "&:hover .img-res": {
          transform: "scale(1.05)",
        },
      }}
      className="w-[100%] box-border cursor-pointer"
      onClick={() => handleRouter(idRes)}
    >
      <Box className=" w-[100%] h-[23vh] max-h-[200px]">
        <Box className="overflow-hidden rounded-md h-[100%] w-[100%]">
          <Box
            className={`img-res`}
            sx={{
              transition: "all 0.3s",
              backgroundPosition: "center",
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${imgRes || "/assets/no_img.jpg"})`,
            }}
          ></Box>
        </Box>
      </Box>
      <Stack className="mt-[8px]">
        <span className="text-lg font-semibold capitalize whitespace-nowrap overflow-hidden overflow-ellipsis">
          {nameRes}
        </span>
        <p className="text-sm text-slate-400 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {detail || " "}
        </p>
        <Box className="flex gap-10 items-center mt-1 ">
          <Box className="flex gap-2">
            <Box className="flex items-center justify-center gap-2">
              <AccessTimeRoundedIcon />
              <Typography sx={{ fontSize: "14px" }}>
                {Math.floor(Number(distance) * 15)+20} phút
              </Typography>
            </Box>
            •
            <Typography
              sx={{ fontSize: "14px" }}
              className="flex items-center justify-center"
            >
              {distance} km
            </Typography>
            •
            <Typography
              sx={{ fontSize: "14px" }}
              className="flex items-center justify-center"
            >
              <svg
                className=" w-4 h-4 mr-2 text-yellow-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>{" "}
              {star}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
