import { Box, Button, Stack } from "@mui/material"
import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { cartActions } from "./CartDrawer/CartSlice"
import { VoucherItem } from "@/models"
import { useAppSelector } from "@/app/hooks"
import { Close } from "@mui/icons-material"
import { useWindowDimensions } from "@/hooks"

const RailLeft = (props: { h: number }) => {
  return (
    <Stack
      direction="column"
      spacing={1.5}
      sx={{
        "& div": {
          background: "#D3D3D3",
        },
      }}
      className="absolute top-0 left-[-10px] z-[500] my-2"
    >
      {Array.from(
        { length: Math.round(props.h / 33) },
        (_, index) => index + 1,
      ).map((item, index) => (
        <div
          key={index}
          className="w-[20px] h-[20px]"
          style={{ borderRadius: "50%" }}
        ></div>
      ))}
    </Stack>
  )
}

const RailRight = (props: { h: number }) => {
  return (
    <Stack
      direction="column"
      spacing={1.5}
      sx={{
        "& div": {
          background: "#D3D3D3",
        },
      }}
      className="absolute top-0 right-[-10px] z-[500] my-2"
    >
      {Array.from(
        { length: Math.round(props.h / 33) },
        (_, index) => index + 1,
      ).map((item, index) => (
        <div
          key={index}
          className="w-[20px] h-[20px]"
          style={{ borderRadius: "50%" }}
        ></div>
      ))}
    </Stack>
  )
}
const RailMid = (props: { h: number }) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        "& div.box": {
          background: "#D3D3D3",
        },
      }}
      className={`absolute top-[-12.5px] left-[60%] z-[500]`}
    >
      <div
        className="w-[25px] box h-[25px]"
        style={{ borderRadius: "50%" }}
      ></div>
      <div
        style={{ height: `${props.h - 25}px` }}
        className="border w-0  border-white border-dashed"
      ></div>
      <div
        className="w-[25px] box h-[25px]"
        style={{ borderRadius: "50%" }}
      ></div>
    </Stack>
  )
}

const VoucherXS = (props: {
  data?: VoucherItem
  pushVoucher: () => void
  removeVoucher: () => void
}) => {
  const { data, pushVoucher, removeVoucher } = props
  const voucherUse = useAppSelector((state) => state.cart.voucherUse)
  return (
    <div
      className="w-full mb-5 flex flex-row h-[150px] relative"
      style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}
    >
      <div className="absolute top-1 left-[-4px] z-[2]">
        <Box
          className="py-1 px-1.5 text-xs bg-[var(--color-df-1)] text-white"
          sx={{
            "&:before": {
              borderTop: "4px solid var(--color-df-1)",
              borderLeft: "4px solid transparent",
              position:"absolute",
              display:"block",
              content:'""',
              top:"24px",
              left:"0px"
            },
          }}
        >
          {data?.code}
        </Box>
      </div>
      {data?.code.search("K") === -1 ? (
        <div
          style={{ background: "url('/imp/voucher.svg')" }}
          className="flex  items-center justify-center w-[150px] h-[150px]"
        >
          <span
            className="text-[#627D6A] text-xl font-bold translate-x-1 translate-y-[23px]"
            style={{ fontFamily: "Lato', sans-serif" }}
          >
            {data?.discount}%
          </span>
        </div>
      ) : (
        <div
          style={{ background: "url('/imp/discount.png')" }}
          className="relative  w-[150px] h-[150px]"
        >
          <span className="text-[var(--color-df-1)] text-2xl font-bold">
            {data?.discount}K
          </span>
        </div>
      )}
      <div className="bg-white flex flex-col justify-between text-[var(--color-df-1)] flex-1 py-3 px-4 w-[100%] h-[150px]">
        <div>
        <div className=" flex w-full text-xs justify-between">
          <span>
            HSD: {dayjs(data?.expired).format("DD/MM/YYYY") ===
            dayjs(Date.now()).format("DD/MM/YYYY")
              ? "23:59, hôm nay"
              : dayjs(data?.expired).format("DD/MM/YYYY")}
          </span>{" "}
          <span>Còn lại: {data?.quantity}</span>
        </div>
        <p className=" text-base font-semibold line-clamp-1">{data?.title}</p>
        <p className="text-xs mt-1 mb-2 line-clamp-3">{data?.detail}</p>
        </div>
        <div>
          <Button
            variant="contained"
            startIcon={voucherUse?.code === data?.code && <Close />}
            size="small"
            onClick={() => {
              voucherUse?.code === data?.code ? removeVoucher() : pushVoucher()
            }}
            sx={{
              backgroundColor: "var(--color-df-1)",
              color: "white",
              "&:hover": {
                backgroundColor: "var(--color-df-1)",
              },
            }}
          >
            {voucherUse?.code === data?.code ? "Bỏ dùng" : "Dùng ngay"}
          </Button>
        </div>
      </div>
    </div>
  )
}
const VoucherMD = (props: {
  data?: VoucherItem
  pushVoucher: () => void
  removeVoucher: () => void
}) => {
  const { data, pushVoucher, removeVoucher } = props
  const { width } = useWindowDimensions()
  const voucherUse = useAppSelector((state) => state.cart.voucherUse)
  const voucherRef = useRef<HTMLDivElement>(null)
  const [more, setMore] = useState(false)
  const [h, setH] = useState(200)
  useEffect(() => {
    setH(voucherRef?.current?.clientHeight || 200)
  }, [more])
  return (
    <div
      ref={voucherRef}
      className="w-full max-w-[600px] mb-5 min-w-[400px] relative overflow-hidden"
      style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}
    >
      <RailLeft h={h} />
      <div className="w-full h-full z-[400] bg-white absolute top-0 left-0"></div>
      {width > 650 && <RailMid h={h} />}
      <RailRight h={h} />
      {width > 650 ? (
        <div
          className={`w-[300px] h-[300px] z-[450] bg-[#ef7692] absolute ${
            width < 670 ? "right-[-30px]" : "right-0"
          }`}
          style={{
            clipPath:
              "polygon(50% 0%, 100% 0, 100% 43%, 100% 76%, 100% 100%, 32% 100%, 21% 100%, 0 16%, 25% 0)",
          }}
        ></div>
      ) : (
        <div
          className="w-[350px] h-[350px] z-[450] bg-[#ef7692] absolute right-[-50px]"
          style={{
            clipPath: "polygon(50% 0, 100% 0%, 51% 100%, 0% 100%)",
          }}
        ></div>
      )}
      <div
        className="w-[300px] h-[300px] z-[450] bg-[#ef7692] absolute left-[-10px] bottom-[-70px]"
        style={{ clipPath: "polygon(0 43%, 0% 100%, 31% 100%)" }}
      ></div>
      <Stack
        flexDirection="row"
        gap={2}
        className={`${
          width < 650 ? "pl-8 pr-5" : "pl-10 pr-6"
        } py-4  z-[1000] relative `}
      >
        <div className="flex flex-col flex-2">
          <p
            className="text-[#ef7692] text-4xl font-medium"
            style={{ letterSpacing: "5px" }}
          >
            VOUCHER
          </p>
          <p className="text-[var(--color-df-1)]  font-medium">{data?.title}</p>
          <p
            className={` ${
              !more && "line-clamp-3"
            } text-[var(--color-df-1)]  mt-2 max-w-[250px] text-xs`}
          >
            {data?.detail}
          </p>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <Button
              onClick={() => setMore(!more)}
              variant="outlined"
              size={width < 580 ? "small" : "medium"}
              sx={{
                borderColor: "#ef7692",
                color: "#ef7692",
                "&:hover": {
                  borderColor: "#ef7692",
                  color: "#ef7692",
                },
              }}
            >
              {more ? "Thu nhỏ" : "Xem thêm"}
            </Button>
            <Button
              variant="contained"
              startIcon={voucherUse?.code === data?.code && <Close />}
              size={width < 580 ? "small" : "medium"}
              onClick={() => {
                voucherUse?.code === data?.code
                  ? removeVoucher()
                  : pushVoucher()
              }}
              sx={{
                backgroundColor: "var(--color-df-1)",
                color: "white",
                "&:hover": {
                  backgroundColor: "var(--color-df-1)",
                },
              }}
            >
              {voucherUse?.code === data?.code ? "Bỏ dùng" : "Dùng ngay"}
            </Button>
          </Stack>
        </div>
        {width > 650 ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-white text-sm tracking-wider">
              Phí ship được giảm
            </p>
            <p
              style={{
                fontSize: "72px",
                lineHeight: 1.2,
                fontWeight: 500,
                color: "white",
              }}
            >
              {data?.discount}
              {data?.code.search("K") == -1 ? "%" : "K"}
            </p>
            <Stack>
              <p className="text-white text-sm">
                <span className="font-medium">Ngày hết hạn:</span>{" "}
                {dayjs(data?.expired).format("DD/MM/YYYY") ===
                dayjs(Date.now()).format("DD/MM/YYYY")
                  ? "23:59, hôm nay"
                  : dayjs(data?.expired).format("DD/MM/YYYY")}
              </p>
              <p className="text-white text-sm">
                <span className="font-medium">Còn lại:</span> {data?.quantity}
              </p>
              <p className="text-white text-sm">
                <span className="font-medium">Mã:</span> {data?.code}
              </p>
            </Stack>
          </div>
        ) : (
          <Stack justifyContent="flex-end">
            <p className="text-[var(--color-df-1)] text-sm">
              <span className="font-medium">Ngày hết hạn:</span>{" "}
              {dayjs(data?.expired).format("DD/MM/YYYY") ===
              dayjs(Date.now()).format("DD/MM/YYYY")
                ? "23:59, hôm nay"
                : dayjs(data?.expired).format("DD/MM/YYYY")}
            </p>
            <p className="text-[var(--color-df-1)] text-sm">
              <span className="font-medium">Còn lại:</span> {data?.quantity}
            </p>
            <p className="text-[var(--color-df-1)] text-sm">
              <span className="font-medium">Mã:</span> {data?.code}
            </p>
          </Stack>
        )}
      </Stack>
    </div>
  )
}
export function VoucherDesign(props: {
  data?: VoucherItem
  handleClose?: () => void
}) {
  const dispatch = useDispatch()
  const { width } = useWindowDimensions()

  const data = props.data

  const pushVoucher = () => {
    if (data) {
      dispatch(cartActions.addVoucherUse(data))
    }
  }
  const removeVoucher = () => {
    dispatch(cartActions.removeVoucherUse())
  }
  return (
    <>
      {width > 550 ? (
        <VoucherMD
          data={data}
          pushVoucher={pushVoucher}
          removeVoucher={removeVoucher}
        />
      ) : (
        <VoucherXS
          data={data}
          pushVoucher={pushVoucher}
          removeVoucher={removeVoucher}
        />
      )}
    </>
  )
}
