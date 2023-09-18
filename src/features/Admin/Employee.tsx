import adminApi from "@/api/adminApi"

import { useEffect, useMemo, useRef, useState } from "react"
import Switch from "@mui/material/Switch"
import History from "@/Router/History"
import { EmployeeItem, ProductRoot, UserRoot } from "@/models"
import { formatCurrencyVND } from "@/utils"
import {
  Delete,
  Settings,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material"
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  InputAdornment,
  Input,
} from "@mui/material"
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table"
import queryString from "query-string"
import { useLocation, useNavigate } from "react-router-dom"
import SettingMenu from "./components/SettingMenu"

export function Employee() {
  const location = useLocation() // Get the current location object
  const queryParams = queryString.parse(location.search) // Parse query parameters from the location
  const navigate = useNavigate()
  const [employee, setEmployee] = useState<EmployeeItem[]>([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [rowCount, setRowCount] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [open, setOpen] = useState(false)
  const settingRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!employee.length) {
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
        const res = await adminApi.getPagingEmployee(pagination)
        const response = res.data as UserRoot
        setEmployee(response.loginResponDtos)
        setRowCount(response.loginResponDtos.length)
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
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
  ])
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const handleSelectRows = (row: any) => {
    console.log(row)
  }
  const columns = useMemo<MRT_ColumnDef<EmployeeItem>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "msv", header: "Mã nhân viên" },
      { accessorKey: "sdt", header: "Số điện thoại" },
    ],
    [],
  )

  return (
    <Box sx={{ height: "100%" }}>
      <SettingMenu anchorRef={settingRef} open={open} setOpen={setOpen} />
      <MaterialReactTable
        muiTablePaperProps={{ sx: { height: "100%" } }}
        muiTableContainerProps={{ sx: { height: "calc(100% - 112px)" } }}
        columns={columns}
        data={employee}
        enableRowSelection
        manualFiltering
        manualPagination
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => console.log(row),
          sx: { cursor: "pointer" },
        })}
        manualSorting
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
        positionToolbarAlertBanner="bottom"
        muiLinearProgressProps={({ isTopToolbar }) => ({
          sx: {
            display: isTopToolbar ? "block" : "none", //hide bottom progress bar
          },
        })}
        renderTopToolbarCustomActions={({ table }) => (
          <Stack direction="row" alignItems="center">
            <Button
              disabled={isLoading}
              sx={{ mr: "10px" }}
              variant="contained"
              onClick={() => {
                navigate("/admin/new?form=employee")
              }}
            >
              Tạo
            </Button>
            <Typography sx={{ fontSize: "18px", fontWeight: 500, mr: "10px" }}>
              Nhân viên
            </Typography>

            <IconButton
              ref={settingRef}
              onClick={handleToggle}
              size="small"
              sx={{ mr: "5px" }}
            >
              <Settings htmlColor="black" fontSize="small" />
            </IconButton>

            {table.getSelectedRowModel().rows.length > 0 && (
              <IconButton
                size="small"
                sx={{ mr: "5px" }}
                onClick={() =>
                  handleSelectRows(table.getSelectedRowModel().rows)
                }
              >
                <Delete fontSize="small" htmlColor="black" />
              </IconButton>
            )}
          </Stack>
        )}
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        rowCount={rowCount}
        enableStickyHeader
        state={{
          columnFilters,
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          sorting,
        }}
      />
    </Box>
  )
}
