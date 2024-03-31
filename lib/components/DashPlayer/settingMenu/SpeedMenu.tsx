import { CheckIcon } from "@heroicons/react/24/solid";
import { selectVideoSpeed, setVideoSpeed } from "../../../features/videoPlayer/videoPlayerSlice";
import { useAppDispatch, useAppSelector } from "../../../lib-hooks/hooks";

interface SpeedMenuProps {
    player: any;
}
const SpeedMenu = ({ player }: SpeedMenuProps) => {

    const dispatch = useAppDispatch();

    const speeds = [0.5, 1, 1.5, 2];

    const videoSpeed = useAppSelector(selectVideoSpeed);

    const handleSelectSpeed = (speed: number) => {
        dispatch(setVideoSpeed(speed));
        const videoElement: HTMLVideoElement = player.getMediaElement();
        if(videoElement && videoElement.playbackRate){
            videoElement.playbackRate = speed;
        }
    }

    const speedList = speeds?.map(speed => {
        const text = `${speed}X`
        return (
            <li
                key={text}
                onClick={() => handleSelectSpeed(speed)}
                className=" m-0 flex px-4 py-2 h-8 hover:bg-slate-100 border-b-2 text-xs" role="button">
                <div className=" w-5 mr-1">
                    {
                        speed === videoSpeed  && <CheckIcon className=" text-black w-4" />
                    }
                </div>
                <span>{text}</span>
            </li>
        )
    })

    return (
        <div className=" bg-white text-black shadow-md rounded-md">
            <ul className=" m-0 pt-2 rounded-md overflow-hidden">
                {
                    speedList
                }
            </ul>
        </div>
    )
}

export default SpeedMenu;