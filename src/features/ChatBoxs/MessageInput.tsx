import { useEffect, useState } from "react"
import { Paper, InputBase, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
export interface MessageInputProps {

}

const ariaLabel = { 'aria-label': 'description' };
export function MessageInput(props: MessageInputProps) {

    return (
        <div className="absolute bottom-0 flex justify-between py-3 ">
            <IconButton type="button" sx={{ p: '5px' }}>
                <ImageIcon sx={{ color: "#0084ff" }} />
            </IconButton >
            <Paper
                elevation={0}
                sx={{ p: '0 4px', display: 'flex', alignItems: 'center', borderRadius: 4, backgroundColor: "#f0f2f5", mr:1 }}
            >
                <InputBase sx={{ ml: 1, flex: 1, width: "180px" }}
                    placeholder="Aa"
                />
                <IconButton type="button" sx={{ p: '5px' }}>
                    <InsertEmoticonIcon sx={{ color: "#0084ff" }} />
                </IconButton >
            </Paper>
        </div>
    )
}