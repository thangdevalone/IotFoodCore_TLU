import { FormControl, FormHelperText, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export interface InputFieldProps {
    label: string;
    name: string;
    disabled?:boolean;
}

export function AreaField(props: InputFieldProps) {
    const { name, label ,disabled=false } = props;
    const form = useFormContext();
    const {
        control,
        formState: { errors },
    } = form;
    return (
        <FormControl error={!!errors[name]} fullWidth sx={{marginBottom:"8px"}} variant="outlined">
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <TextField  name={name} disabled={disabled} onChange={onChange} type="text" label={label} multiline maxRows={4} />
                )}
            />
            <FormHelperText>{String(errors[name]?.message|| '') }</FormHelperText>
        </FormControl>
    );
}
