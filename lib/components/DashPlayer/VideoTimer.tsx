// Mui removed
import { useEffect, useRef } from "react";
import { parseSecondsToTimeString } from "./utils/general-utils";
import eventEmitter from "./utils/eventEmitter";
import { VideoEvent } from "./hooks/useVideoEventEmitter";
import { selectParsedTime, selectVideoDuration, setParsedTime, setVideoDuration } from "../../features/videoPlayer/videoPlayerSlice";
import { useAppSelector, useAppDispatch } from "../../lib-hooks/hooks";

export interface VideoTimerProps {
    video: HTMLVideoElement;
    src: string;
}


const VideoTimer = ({ video: videoElement, src }: VideoTimerProps) => {

    const parsedTime = useAppSelector(selectParsedTime);

    const videoDuration = useAppSelector(selectVideoDuration);

    const dispatch = useAppDispatch();

    const initialized = useRef(false);

    useEffect(() => {
        if(!initialized.current){
            // Wait until video duration will be clear
            const totalDuration = videoElement.duration;
            if (!isNaN(totalDuration)) {
                initialized.current = true;
                dispatch(setVideoDuration(parseSecondsToTimeString(totalDuration)));
            }
        }
    });

    

    useEffect(()=>{
        function timeUpdate(){
            dispatch(setParsedTime(parseSecondsToTimeString(videoElement.currentTime)));
        }
        const listener = eventEmitter.addListener(VideoEvent.TimeUpdate, timeUpdate)
        return () => {
            listener.remove();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[src])

    return (
        <div className=" px-2">
            <span className=" text-xs sm:text-sm whitespace-nowrap text-white">
            {parsedTime}
                / {videoDuration}
            </span>
        </div>
    )
}

export default VideoTimer;