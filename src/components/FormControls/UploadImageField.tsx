import { FormControl, FormHelperText } from '@mui/material';
import { ChangeEvent, Ref } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

export interface UploadImageFieldProps {
    name: string;
    inputRef: Ref<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleImageChange:(e: ChangeEvent<HTMLInputElement>, field: any)=> void,
    
}

export function UploadImageField(props: UploadImageFieldProps) {
    const { name,inputRef,handleImageChange } = props;
    const form = useFormContext();
    const {
        control,
        formState: { errors },
    } = form;
    return (
        <FormControl error={!!errors[name]}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        onChange={(e) => {
                            handleImageChange(e, field);
                        }}
                        style={{ display: 'none' }}
                        ref={inputRef}
                        type="file"
                        accept="image/jpeg, image/png"
                    />
                )}
            />

            <FormHelperText>
                {String(errors[name]?.message || '')}
            </FormHelperText>
        </FormControl>
    );
}
