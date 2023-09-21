import adminApi from "@/api/adminApi"
import { useEffect, useMemo, useRef, useState } from "react"
import History from "@/Router/History"
import { ProductItem, ProductRoot } from "@/models"
import { formatCurrencyVND } from "@/utils"
import { Delete, Settings } from "@mui/icons-material"
import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
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
import { enqueueSnackbar, useSnackbar } from "notistack"

export function Product() {
  const location = useLocation() // Get the current location object
  const queryParams = queryString.parse(location.search) // Parse query parameters from the location
  const navigate = useNavigate()
  const [products, setProducts] = useState<ProductItem[]>([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [rowCount, setRowCount] = useState(0)
  const { enqueueSnackbar } = useSnackbar()
  //table state
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

  useEffect(() => {
    const fetchData = async () => {
      if (!products.length) {
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

      // Update the location object with the new search parameters
      History.push({ search: updatedSearchParams.toString() })
      try {
        const res = await adminApi.getAllProducts(pagination)
        const myProducts = res.data as ProductRoot
        setProducts(myProducts.data)
        setRowCount(myProducts.totalRow)
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
  ])

  const columns = useMemo<MRT_ColumnDef<ProductItem>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "foodName", header: "Tên sản phẩm" },
      { accessorKey: "nameRestaurantFood", header: "Thuộc về" },
      { accessorKey: "star", header: "Đánh giá" },
      {
        accessorKey: "price",
        header: "Đơn giá",
        Cell: ({ cell }) => formatCurrencyVND(cell.getValue<string>()),
      },
      { accessorKey: "detail", header: "Mô tả" },
      { accessorKey: "quantityPurchased", header: "Đã bán" },
      { accessorKey: "status", header: "Trạng thái" },
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
        data={products}
        enableRowSelection
        manualFiltering
        manualPagination
        muiTableBodyRowProps={({ row }) => ({
          onClick: () =>
            navigate(`/admin/update?form=product/${row.original.id}`),
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
                navigate("/admin/new?form=product")
              }}
            >
              Tạo
            </Button>
            <Typography sx={{ fontSize: "18px", fontWeight: 500, mr: "10px" }}>
              Sản phẩm
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
