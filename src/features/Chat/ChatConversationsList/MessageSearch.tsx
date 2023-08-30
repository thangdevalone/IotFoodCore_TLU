import { useEffect, useState } from "react"
import { Paper, InputBase, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
export interface MessageSearchProps {
    
}


export function MessageSearch(props: MessageSearchProps) {
    const [isSearch,setIsSearch]=useState(true)
    const hanldeChangeInput = (e: any) => {
      
    }
    return (
        <div className="flex items-center my-2 mx-4">
            {isSearch && <IconButton
                aria-label="delete"
                className="cursor-pointer p-1"
                sx={{ mr: 1, p: '5px' }}
                onClick={() => { setIsSearch(false) }}
            >
                <ArrowBackIcon />
            </IconButton>}
            <Paper
                elevation={0}
                component="form"
                sx={{ display: 'flex', alignItems: 'center', backgroundColor: "#f0f2f5", borderRadius: "50px", pl: "8px", width: "100%" }}
            >
                {!isSearch && <SearchIcon sx={{ color: "#65676b" }} />}
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Tìm kiếm shipper"
                    inputProps={{ 'aria-label': 'Tìm kiếm shipper' }}
                    onFocus={() => { setIsSearch(true) }}
                    onChange={hanldeChangeInput}
                />
            </Paper>
        </div>
    )
}