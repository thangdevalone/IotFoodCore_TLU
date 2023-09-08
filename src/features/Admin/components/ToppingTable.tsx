import { InputField, NumberField } from "@/components/FormControls"
import { formatCurrencyVND } from "@/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { Delete, Edit } from "@mui/icons-material"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material"
import MaterialReactTable, {
  MRT_ColumnDef
} from "material-react-table"
import { useRef, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { ToppingAdd } from "./NewProduct"

const columns: MRT_ColumnDef<ToppingAdd>[] = [
  {
    accessorKey: "name",
    header: "Tên topping",
  },
  {
    accessorKey: "price",
    header: "Giá",
    Cell: ({ cell }) => formatCurrencyVND(cell.getValue<string>()),
  },
]

export interface ToppingTableProps {
  toppingList: ToppingAdd[] | []
  setToppingList: (newToppingList: ToppingAdd[]) => void
}

export default function ToppingTable(props: ToppingTableProps) {
  const { toppingList, setToppingList } = props
  const [openToppingLog, setOpenToppingLog] = useState(false)
  const handleCloseAddTopping = () => {
    setOpenToppingLog(false)
  }
  const schema = yup.object().shape({
    name: yup.string().required("Cần nhập tên topping"),
    price: yup.number().required("Cần có giá"),
  })

  const form = useForm<ToppingAdd>({
    defaultValues:{
      name:"",
      price:0
    },
    resolver: yupResolver(schema),
  })
  const handleAddTopping: SubmitHandler<ToppingAdd> = (data) => {
    setToppingList([...toppingList, { ...data, idTemp: toppingList.length }])
    form.reset()
  }
  const tableContainerRef = useRef<HTMLDivElement>(null) //we can get access to the underlying TableContainer element and react to its scroll events

  const [isLoading, setIsLoading] = useState(false)
  const handleDeleteRow = (row: any) => {
    console.log(row)
  }
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setOpenToppingLog(true)
        }}
      >
        Mới
      </Button>
      <FormProvider {...form}>
        <Dialog open={openToppingLog} onClose={handleCloseAddTopping}>
          <form onSubmit={form.handleSubmit(handleAddTopping)}>
            <DialogTitle>Tạo mới topping</DialogTitle>
            <DialogContent sx={{ pt: "10px !important" }}>
              <InputField label="Tên topping" name="name" />
              <NumberField label="Giá thành"  name="price" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddTopping}>Hủy</Button>
              <Button type="submit">Tạo</Button>
            </DialogActions>
          </form>
        </Dialog>
      </FormProvider>

      <MaterialReactTable
        columns={columns}
        data={toppingList}
        enablePagination={false}
        positionActionsColumn="last"
        enableRowVirtualization //optional, but recommended if it is likely going to be more than 100 rows
        enableTopToolbar={false}
        enableBottomToolbar={false}
        
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Hành động', //change header text
          
          },
        }}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => {}}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        enableRowActions={true}
        muiTableContainerProps={{
          ref: tableContainerRef, //get access to the table container element
          sx: { minHeight: "150px",maxHeight:"400px",mt:"10px" }, //give the table a max height
        }}
        muiTablePaperProps={{
          sx: { boxShadow: "none", width: "100%","& .MuiTypography-root":{maxWidth:"none"} },
        }}
        state={{
          isLoading,
        }}
      />
    </>
  )
}
