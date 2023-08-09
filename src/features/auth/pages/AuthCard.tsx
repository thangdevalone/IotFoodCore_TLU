import { handleMsv } from "@/utils"
import { Button, Stack } from "@mui/material"
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
} from "@zxing/library"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export interface AuthCardProps {}

export function AuthCard(props: AuthCardProps) {
  const [selectedDeviceId, setSelectedDeviceId] = useState("")
  const [code, setCode] = useState("Chưa xác nhận được mã sinh viên")
  const [videoInputDevices, setVideoInputDevices] = useState([])
  const [next, setNext] = useState(false)
  const hints = new Map()
  hints.set(DecodeHintType.PURE_BARCODE, false)
  hints.set(DecodeHintType.TRY_HARDER, false)
  hints.set(DecodeHintType.RETURN_CODABAR_START_END, true)

  const codeReader = new BrowserMultiFormatReader(hints)
  const au = new Audio("/assets/audio/continue.mp3")
  useEffect(() => {
    codeReader
      .getVideoInputDevices()
      .then((videoInputDevices) => {
        setupDevices(videoInputDevices)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  function setupDevices(videoInputDevices: any) {
    const sourceSelect = document.getElementById("sourceSelect")

    // selects first device
    setSelectedDeviceId(videoInputDevices[0].deviceId)

    // setup devices dropdown
    if (videoInputDevices.length >= 1) {
      setVideoInputDevices(videoInputDevices)
    }
  }

  function resetClick() {
    codeReader.reset()
    setCode("Chưa xác nhận được mã sinh viên")
    setNext(false)
    sessionStorage.removeItem("TheSinhVien")
  }

  function decodeContinuously(selectedDeviceId: any) {
    codeReader.decodeFromInputVideoDeviceContinuously(
      selectedDeviceId,
      "video",
      (result: any, err) => {
        if (result) {
          setCode(result.text)
        }
      },
    )
  }
  const navigate = useNavigate()
  const handleNextSignUp = () => {
    au.pause()
    navigate("/register")
  }
  useEffect(() => {
    decodeContinuously(selectedDeviceId)
  }, [selectedDeviceId])
  useEffect(() => {
    if (code != "Chưa xác nhận được mã sinh viên") {
      playSequentially(handleMsv(code))
      sessionStorage.setItem("TheSinhVien", code.toString())
    }
  }, [code])
  function playSequentially(playlist: string[], index = 0) {
    if (index >= playlist.length) {
      au.play()
      setNext(true)

      return
    }

    const audio = new Audio(playlist[index])
    audio.play()

    audio.addEventListener("ended", () => {
      playSequentially(playlist, index + 1)
    })
  }
  const handleNoAuth = () => {
    sessionStorage.setItem("TheSinhVien", "No Auth")
    navigate("/register", { replace: true })
  }
  // Gọi hàm để bắt đầu phát danh sách các bài hát một cách tuần tự
  return (
    <main className="flex items-center justify-center w-screen h-screen relative">
      <Button
        variant="contained"
        sx={{ top: "10px", right: "10px", position: "absolute" }}
        onClick={handleNoAuth}
      >
        Bỏ qua
      </Button>
      <section
        style={{ width: "200px", marginRight: "20px" }}
        className="p-4 border border-slate-300 rounded-md"
      >
        <b style={{ color: "red" }}>Chú ý: </b>Xác thực thẻ sinh viên đang
        trong giai đoạn thử nghiệm bạn có thể bấm <b>bỏ qua</b> để tiếp tục đăng
        kí
      </section>
      <section
        className="  p-4 border border-slate-300 rounded-md"
        style={{ maxWidth: "600px", width: "100vw" }}
        id="demo-content"
      >
        <div id="sourceSelectPanel" className="mt-2 mb-2">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="sourceSelect"
          >
            Thay đổi đầu vào video:
          </label>
          <select
            className="border-slate-400 rounded-md border-2 p-2 "
            id="sourceSelect"
            onChange={(e) => setSelectedDeviceId(e.target.value)}
          >
            {videoInputDevices.map((element: any) => (
              <option key={element.deviceId} value={element.deviceId}>
                {element.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div
            style={{
              width: "90%",
              height: "80px",
              backgroundColor: "transparent",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
            className=" absolute border-4 border-red-600"
          ></div>
          <video id="video" width="100%" height="300px" />
        </div>

        <div className="mt-4">
          <span id="result">
            Mã sinh viên: <b>{code}</b>
          </span>
        </div>

        <Stack
          sx={{ mt: 2 }}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            id="resetButton"
            onClick={() => resetClick()}
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            onClick={handleNextSignUp}
            disabled={!next}
          >
            Tiếp tục
          </Button>
        </Stack>
      </section>
    </main>
  )
}
