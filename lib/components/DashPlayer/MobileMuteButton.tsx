// Removed MUI
import { selectMute, setMute } from "../../features/videoPlayer/videoPlayerSlice";
import SpeakerXMarkIcon from '@heroicons/react/24/solid/SpeakerXMarkIcon';
import { useAppDispatch, useAppSelector } from "../../lib-hooks/hooks";
import { useEffect, useRef } from "react";

const MobileMuteButton = () => {
    const mute = useAppSelector(selectMute);
    const activeBreakingPoint = useRef<string | null>()

    useEffect(() => {
        if (!activeBreakingPoint.current) {
            activeBreakingPoint.current = window.innerWidth < 640 ? "xs" : "";
        }
    })

    const dispatch = useAppDispatch();

    const toggleMute = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        dispatch(setMute(!mute));
    }
    return (
        <>
            {
                activeBreakingPoint.current === "xs" &&
                <div
                    role="button"
                    className=" p-3"
                    style={{opacity: mute ? 1 : 0 }}
                    onClick={(event) => toggleMute(event)}>
                    <SpeakerXMarkIcon className=" text-white w-6 h-6" />
                </div>
            }
        </>

    )
}

export default MobileMuteButton;