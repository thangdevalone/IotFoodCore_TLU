import { Paper, Typography } from '@mui/material';
import * as React from 'react';
import classes from './styles.module.css'
export interface  SearchFoodProps {
}

export function SearchFood (props:  SearchFoodProps) {
  return (
    <Paper elevation={2} className={classes.container}>
        <p className={classes['tx-sm']}>Good morning</p>
        <p className={classes['tx-1']}>Bạn muốn ăn gì bây giờ?</p>
    </Paper>
  );
}
