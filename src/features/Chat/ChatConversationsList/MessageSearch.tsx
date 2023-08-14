import { useEffect, useState } from "react"
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
export interface MessageSearchProps {

}

export function MessageSearch(props: MessageSearchProps) {

    return (
        <Paper
            elevation={0}
            component="form"
            sx={{ display: 'flex', alignItems: 'center', backgroundColor: "#f0f2f5", borderRadius: "50px", m: "8px 14px", pl:"8px" }}
        >
            <SearchIcon sx={{color:"#65676b"}}/>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Tìm kiếm shipper"
                inputProps={{ 'aria-label': 'Tìm kiếm shipper' }}
            />
        </Paper>
    )
}