import * as React from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import adminApi from "@/api/adminApi"
import { searchRoot } from "@/models"
import { useDebounce } from "@/hooks"


interface AutoFieldProps {
  setValue: (val: searchRoot | null) => void
  value: searchRoot | null,
  apiHandle:string,
}

export function AutoField(props: AutoFieldProps) {
  const { setValue, value,apiHandle } = props
  const [dataRes, setDataRes] = React.useState<searchRoot[]>([])
  const [tx, setTx] = React.useState("")
  const [loading,setLoading]=React.useState(false)
  const debouncedTx = useDebounce({ value:tx, seconds:300 });
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res =  await adminApi.search(tx,apiHandle)// Pass 'tx' to search
        setDataRes(res.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    })()
  }, [debouncedTx]) // Re-run effect when 'tx' changes

  const defaultProps = {
    options: dataRes,
    getOptionLabel: (option: searchRoot) => option.title,
  }

  return (
    <Autocomplete
      {...defaultProps}
      id="controlled-demo"
      value={value}
      onChange={(event: React.SyntheticEvent, newValue: searchRoot | null) => {
        setValue(newValue)
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          sx={{ width: "90%" }}
          {...params}
          onChange={(e) => {
            setTx(e.target.value)
          }}
          value={tx} // Reflect the current 'tx' value in the input
          variant="standard"
        />
      )}
    />
  )
}
