import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

import { Controller, useFormContext } from 'react-hook-form';

export interface NumberFieldProps {
    label: string;
    name: string;
    disabled?:boolean;
 
}

export function NumberField(props: NumberFieldProps) {
    const { name, label ,disabled=false } = props;
    const form = useFormContext();
    const {
        control,
        formState: { errors },
        
    } = form;
    return (
        <FormControl error={!!errors[name]} fullWidth sx={{marginBottom:"8px"}} variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={0}
                render={({ field}) => (
                    <OutlinedInput  disabled={disabled} {...field} type='number'  label={label} />
                )}
            />

            <FormHelperText>{String(errors[name]?.message|| '') }</FormHelperText>
        </FormControl>
    );
}
