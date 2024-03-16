import IconButton from "@mui/material/IconButton";
import { selectMute, setMute } from "../../features/videoPlayer/videoPlayerSlice";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useAppDispatch, useAppSelector } from "../../lib-hooks/hooks";
import { useEffect, useRef } from "react";

const MobileMuteButton = () => {
    const mute = useAppSelector(selectMute);
    const activeBreakingPoint = useRef<string | null>()
   
    useEffect(()=>{
        if(!activeBreakingPoint.current){
            activeBreakingPoint.current = window.innerWidth < 640 ? "xs" : "";
        }
    })

    const dispatch = useAppDispatch();

    const toggleMute = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        dispatch(setMute(!mute));
    }
    return (
        <>
            {
                activeBreakingPoint.current === "xs" && 
                <IconButton onClick={(event) => toggleMute(event)}>
                    <VolumeOffIcon sx={{ color: "white", opacity: mute ? 1 : 0 }} />
                </IconButton>
            }
        </>

    )
}

export default MobileMuteButton;