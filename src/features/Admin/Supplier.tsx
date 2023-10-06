import History from "@/Router/History"
import adminApi from "@/api/adminApi"
import { SupplierFields } from "@/constants"
import { RestaurantRoot, TypeRestaurant } from "@/models"
import { formatCurrencyKM } from "@/utils"
import { Delete, Settings } from "@mui/icons-material"
import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table"
import { useSnackbar } from "notistack"
import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReactSpreadsheetImport } from "react-spreadsheet-import"
import SettingMenu from "./components/SettingMenu"

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
  const [isDel, setIsDel] = useState(false)
  const [isOpenImport, setIsOpenImport] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const settingRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleSelectRows = (row: any) => {
    const idData = row.map((item: any) => item.original.id)
    ;(async () => {
      try {
        await adminApi.deleteStore(idData)
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
      if (!restaurant.length) {
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
        const res = await adminApi.getAllResFoods(pagination)
        const myRestaurant = res.data as RestaurantRoot
        setRestaurant(myRestaurant.responList)
        setRowCount(myRestaurant.totalRow)
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

  const columns = useMemo<MRT_ColumnDef<TypeRestaurant>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "restaurantName", header: "Tên nhà cung cấp" },
      {
        accessorKey: "imgRes",
        header: "Ảnh",
        Cell: ({ cell }) => (
          <img
            src={cell.getValue<string>()}
            className="w-[70px] h-[70px] object-cover"
          />
        ),
      },
      { accessorKey: "star", header: "Đánh giá" },
      {
        accessorKey: "distance",
        header: "Khoảng cách",
        Cell: ({ cell }) => formatCurrencyKM(cell.getValue<string>()),
      },
      { accessorKey: "phoneNumber", header: "Số điện thoại" },
      { accessorKey: "address", header: "Địa chỉ" },
    ],
    [],
  )
  const onClose = () => {
    setIsOpenImport(false)
  }
  // Called after user completes the flow. Provides data array, where data keys matches your field keys.
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <Box sx={{ height: "100%" }}>
      <SettingMenu
        anchorRef={settingRef}
        setIsOpenImport={setIsOpenImport}
        open={open}
        setOpen={setOpen}
      />
      <ReactSpreadsheetImport
        isOpen={isOpenImport}
        onClose={onClose}
        onSubmit={onSubmit}
        fields={SupplierFields}
      />
      <MaterialReactTable
        muiTablePaperProps={{ sx: { height: "100%" } }}
        muiTableContainerProps={{ sx: { height: "calc(100% - 112px)" } }}
        columns={columns}
        data={restaurant}
        enableRowSelection
        manualFiltering
        muiTableBodyRowProps={({ row }) => ({
          onClick: () =>
            navigate(`/admin/update?form=supplier/${row.original.id}`),
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
              Nhà cung cấp
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
        onPaginationChange={setPagination}
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
