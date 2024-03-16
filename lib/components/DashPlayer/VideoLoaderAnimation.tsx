// MUI direct checked
import CircularProgress from "@mui/material/CircularProgress";
import { selectIsBuffering, setIsBuffering } from "../../features/videoPlayer/videoPlayerSlice";
import { useEffect } from "react";
import eventEmitter from "./utils/eventEmitter";
import { VideoEvent } from "./hooks/useVideoEventEmitter";
import { useAppSelector, useAppDispatch } from "../../lib-hooks/hooks";

interface VideoLoaderAnimationProps {
    src: string;
    videoElement: HTMLVideoElement;
}

const VideoLoaderAnimation = ({ src, videoElement }: VideoLoaderAnimationProps) => {
    const isBuffering = useAppSelector(selectIsBuffering);
    const dispatch = useAppDispatch();

    useEffect(() => {
        function progressHandler() {
            if (videoElement.readyState === 4) {
                dispatch(setIsBuffering(false));
            }
        }

        function loadeddataHandler() {
            if(src){
              dispatch(setIsBuffering(true));  
            }
            
        }

        function canPlayThroughHandler(){
            dispatch(setIsBuffering(false));
        }
        const progressListener = eventEmitter.addListener(VideoEvent.Progress, progressHandler);
        const waitingListener = eventEmitter.addListener(VideoEvent.Waiting, loadeddataHandler);
        const canPlayThroughListener = eventEmitter.addListener(VideoEvent.CanPlayThrough, canPlayThroughHandler)
        return () => {
            waitingListener.remove();
            canPlayThroughListener.remove();
            progressListener.remove();
        }
    }, [src, dispatch, videoElement.readyState])

    return (
        <>
            {
                isBuffering && <CircularProgress sx={{color:"white"}} size={100} />
            }
        </>
    )
}

export default VideoLoaderAnimation;