import { VisibilityOff, Visibility } from "@mui/icons-material"
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material"
import { useState } from "react"

import { Controller, useFormContext } from "react-hook-form"

export interface PasswordFieldProps {
  label: string
  name: string
  disabled?: boolean
}

export function PasswordField(props: PasswordFieldProps) {
  const { name, label, disabled = false } = props
  const form = useFormContext()

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword((x) => !x)
  }
  const {
    control,
    formState: { errors },
  } = form
  return (
    <FormControl
      error={!!errors[name]}
      fullWidth
      sx={{ marginBottom: "8px" }}
      variant="outlined"
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <OutlinedInput
            autoComplete="true"
            label={label}
            disabled={disabled}
            {...field}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      />
      <FormHelperText>{String(errors[name]?.message || "")}</FormHelperText>
    </FormControl>
  )
}
