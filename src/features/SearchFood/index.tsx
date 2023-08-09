import { Paper, Typography } from '@mui/material';
import * as React from 'react';
import classes from './styles.module.css'
export interface  SearchFoodProps {
}

export function SearchFood (props:  SearchFoodProps) {
  return (
    <Paper elevation={2} className={classes.container}>
        <Typography className={classes['tx-sm']}>Good morning</Typography>
        <Typography className={classes['tx-1']}>Bạn muốn ăn gì bây giờ?</Typography>
    </Paper>
  );
}
