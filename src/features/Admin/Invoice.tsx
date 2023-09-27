import History from "@/Router/History"
import adminApi from "@/api/adminApi"
import { InvoiceRoot, Invoice } from "@/models"
import { handlePrice } from "@/utils"
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material"
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table"
import { useSnackbar } from "notistack"
import queryString from "query-string"
import { useEffect, useMemo, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

interface Data {}

const InvoiceAdmin = () => {
  const location = useLocation() // Get the current location object
  const queryParams = queryString.parse(location.search) // Parse query parameters from the location
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState<InvoiceRoot[]>([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [rowCount, setRowCount] = useState(0)
  const { enqueueSnackbar } = useSnackbar()
  //table state
  const [status, setStatus] = useState<string>("PENDING")
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [isDel, setIsDel] = useState(false)
  const [open, setOpen] = useState(false)
  const settingRef = useRef<HTMLButtonElement>(null)
  const [tabs, setTabs] = useState(0)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const handleSelectRows = (row: any) => {
    console.log(row)
    const idData = row.map((item: any) => item.original.id)
    ;(async () => {
      try {
        await adminApi.deleteFood(idData)
        enqueueSnackbar("Xóa thành công", { variant: "success" })
        setIsDel((item) => !item)
      } catch (error) {
        enqueueSnackbar("Có lỗi xảy ra thử lại sau", { variant: "error" })
        console.log(error)
      }
    })()
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const tabLabels = ["ALL", "PENDING", "PROCESSING", "DELIVERED", "CANCELED"]
    setStatus(tabLabels[newValue])
    setTabs(newValue)
  }
  useEffect(() => {
    const fetchData = async () => {
      if (!invoice.length) {
        setIsLoading(true)
      } else {
        setIsRefetching(true)
      }
      const updatedSearchParams = new URLSearchParams(location.search)
      updatedSearchParams.set("page", `${pagination.pageIndex + 1}`)
      updatedSearchParams.set("size", `${pagination.pageSize}`)
      updatedSearchParams.set("filters", JSON.stringify(columnFilters ?? []))
      updatedSearchParams.set("globalFilter", globalFilter ?? "")
      updatedSearchParams.set("sorting", JSON.stringify(sorting ?? []))
      History.push({ search: updatedSearchParams.toString() })
      try {
        if (status === "ALL") {
          const res = await adminApi.getBill(pagination, null)
          const myInvoice = res.data as InvoiceRoot
          console.log(myInvoice)
          // setInvoice(myInvoice)
          // setRowCount(myInvoice.length)
        } else {
          const res = await adminApi.getBill(pagination, status)
          const myInvoice = res.data as InvoiceRoot
          console.log(myInvoice)

          // setInvoice(myInvoice)
          // setRowCount(myInvoice)
        }
      } catch (error) {
        setIsError(true)
        console.error(error)
        return
      }

      setIsError(false)
      setIsLoading(false)
      setIsRefetching(false)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnFilters,
    globalFilter,
    isDel,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    status,
  ])

  const columns = useMemo<MRT_ColumnDef<Invoice>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "nameRestaurant", header: "Tên cửa hàng" },
      // {
      //   accessorKey: "foodResponseBills",
      //   header: "Số lượng",
      //   Cell: ({ cell }) => {
      //     const totalQuantity = cell?.row.original.foodResponseBills.reduce(
      //       (total: number, foodResponseBill: any) => {
      //         return total + foodResponseBill.quantity
      //       },
      //       0,
      //     )
      //     return totalQuantity
      //   },
      // },
      {
        accessorKey: "shipFee",
        header: "Phí ship",
        Cell: ({ cell }) => `${handlePrice(+cell.getValue<string>())} VND `,
      },
      {
        accessorKey: "foodResponseBills",
        header: "Tổng đơn hàng",
        Cell: ({ cell }) => {
          console.log(cell)
          const totalAmount = cell?.row.original.foodResponseBills.reduce(
            (total: number, foodResponseBill: any) => {
              return (
                total + foodResponseBill.priceFood * foodResponseBill.quantity
              )
            },
            0,
          )
          return `${handlePrice(totalAmount)} VND`
        },
      },
    ],
    [],
  )
  return (
    <Box sx={{ height: "100%" }}>
      <Stack
        direction="row"
        sx={{ alignContent: "center", marginLeft: 2 }}
        spacing={2}
      >
        <Box>
          <Typography
            sx={{
              height: "100%",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            Trạng thái đơn hàng :
          </Typography>
        </Box>
        <Tabs
          value={tabs}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="ALL" {...a11yProps(0)} />
          <Tab label="PENDING" {...a11yProps(1)} />
          <Tab label="PROCESSING" {...a11yProps(2)} />
          <Tab label="DELIVERED" {...a11yProps(3)} />
          <Tab label="CANCELED" {...a11yProps(4)} />
        </Tabs>
      </Stack>
    </Box>
  )
}

export default InvoiceAdmin
