import foodsApis from "@/api/foodsApi"
import { useEffect, useMemo, useRef, useState } from "react"
import { TypeRestaurant } from "@/models"
import { Delete, Settings } from "@mui/icons-material"
import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table"
import { useNavigate } from "react-router-dom"
import SettingMenu from "./components/SettingMenu"
import { formatCurrencyKM } from "@/utils"

export function Supplier() {
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState<TypeRestaurant[]>([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [rowCount, setRowCount] = useState(0)

  //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [open, setOpen] = useState(false)
  const settingRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const fetchData = async () => {
    const res = await foodsApis.getRecommendRestaurants()
    console.log(res)
    if (res.status) {
      setRestaurant(res.data)
    }

    setRowCount(restaurant.length)
    setIsError(false)
    setIsLoading(false)
    setIsRefetching(false)
  }

  useEffect(() => {
    fetchData()
  }, [])
  const handleSelectRows = (row: any) => {
    console.log(row)
  }
  const columns = useMemo<MRT_ColumnDef<TypeRestaurant>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "restaurantName", header: "Tên cửa hàng" },
      { accessorKey: "businessHours", header: "Giờ kinh doanh" },
      {
        accessorKey: "distance",
        header: "Khoảng cách",
        Cell: ({ cell }) => formatCurrencyKM(cell.getValue<string>()),
      },
      { accessorKey: "phoneNumber", header: "Số điện thoại" },
      { accessorKey: "address", header: "Địa chỉ" },
      { accessorKey: "imgRes", header: "Ảnh" },
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
        data={restaurant}
        enableRowSelection
        manualFiltering
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
                navigate("/admin/new?form=store")
              }}
            >
              Tạo
            </Button>
            <Typography sx={{ fontSize: "18px", fontWeight: 500, mr: "10px" }}>
              Cửa hàng
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
        onSortingChange={setSorting}
        rowCount={rowCount}
        enableStickyHeader
        state={{
          columnFilters,
          globalFilter,
          isLoading,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          sorting,
        }}
      />
    </Box>
  )
}
