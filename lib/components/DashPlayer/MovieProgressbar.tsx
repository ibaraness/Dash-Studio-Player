// Mui removed
import { useRef, useEffect } from "react";
import { selectBuffer, selectIsMobileMode, selectProgressValue, setBuffer, setProgressValue } from "../../features/videoPlayer/videoPlayerSlice";
import eventEmitter from "./utils/eventEmitter";
import { VideoEvent } from "./hooks/useVideoEventEmitter";
import { useAppDispatch, useAppSelector } from "../../lib-hooks/hooks";

export interface MovieProgressbarProps {
    player: any;
    videoElement: HTMLVideoElement;
    src: string;
}
const MovieProgressbar = ({ player, videoElement, src }: MovieProgressbarProps) => {

    const progressValue = useAppSelector(selectProgressValue);

    const clickableTrack = useRef<HTMLDivElement>(null);

    const buffer = useAppSelector(selectBuffer);
    const dispatch = useAppDispatch();

    const duration = useRef<number>(0);
    
    const isMobileMode = useAppSelector(selectIsMobileMode);

    useEffect(() => {

        function updateBufferHandler() {
            try {
                const bufferRange = player.getBufferedInfo().total[0];
                if (!bufferRange || !bufferRange.end) {
                    return;
                }
                const percentSlice = 100 / duration.current;
                dispatch(setBuffer(Math.round(bufferRange.end * percentSlice)))
            } catch (e) {
                console.error(e);
            }
        }
        function updateTimeProgress() {
            const percentSlice = 100 / duration.current;
            const percentOfTime = Math.round(videoElement.currentTime * percentSlice);
            dispatch(setProgressValue(percentOfTime));
        }

        // Get the video element from the player
        const totalDuration = videoElement.duration;
        if (!isNaN(totalDuration)) {
            duration.current = totalDuration
        }

        const timeListener = eventEmitter.addListener(VideoEvent.TimeUpdate, updateTimeProgress);
        const bufferListener = eventEmitter.addListener(VideoEvent.Progress, updateBufferHandler);
        return () => {
            timeListener.remove();
            bufferListener.remove();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src])

    const setPosition = (value: number) => {
        dispatch(setProgressValue(value));
        const duration = videoElement.duration || 0;
        const position = (duration / 100) * value;
        videoElement.currentTime = position;
    }

    const getClickableTrackRect = () => {
        return clickableTrack.current && clickableTrack.current.getClientRects()[0]
    }

    const handleTrackClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const parentRect = getClickableTrackRect();
        if (parentRect) {
            const left = parentRect.left;
            const width = parentRect.width;
            const position = event.clientX - left;
            const percent = position * (100 / width);
            setPosition(percent);
        }
    }

    return (
        <div
        className={` ${isMobileMode ? 'py-0' : 'py-0 sm:py-3 md:p-5'} px-5 sm:px-5`}
            style={{ height: "4px" }}>
            <div style={{ position: "relative", height: "4px" }}>
                {/* Buffer line */}
                <div style={{
                    height: "4px",
                    backgroundColor: "rgba(255,255,255,.8)",
                    width: buffer + "%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                }}></div>
                {/* Track line */}
                <div
                    style={{
                        height: "4px",
                        backgroundColor: "rgba(255,255,255,.3)",
                        width: "100%",
                        position: "absolute",
                        top: "0",
                        left: "0",
                    }}></div>
                {/* Time progress line */}
                <div style={{
                    height: "4px",
                    backgroundColor: "#0774e8",
                    width: progressValue + "%",
                    position: "absolute",
                    top: "0px",
                    left: "0",
                }}></div>

                <div
                    onClick={handleTrackClick}
                    ref={clickableTrack}
                    style={{
                        height: "12px",
                        backgroundColor: "rgba(255,0,0,0)",
                        width: "100%",
                        cursor: "pointer",
                        position: "absolute",
                        top: "-4px",
                        left: "0",
                    }}></div>
            </div>
        </div>


    )
}

export default MovieProgressbar;