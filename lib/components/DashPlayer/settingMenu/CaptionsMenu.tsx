import { CheckIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { selectCaptionsLanguage, selectIsDisplayCaptions, setCaptionsLanguage, setIsDisplayCaptions } from "../../../features/videoPlayer/videoPlayerSlice";
import { useAppDispatch, useAppSelector } from "../../../lib-hooks/hooks";

interface CaptionsMenuProps {
    player: any;
}
const CaptionsMenu = ({ player }: CaptionsMenuProps) => {

    const [captions, setCaptions] = useState<any[] | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const textTracks: any[] = player.getTextTracks();
        setCaptions(textTracks);
    }, [player])

    const captionsLanguage = useAppSelector(selectCaptionsLanguage);

    const isDisplayCaptions = useAppSelector(selectIsDisplayCaptions);

    const handleSelectCaption = (track: any) => {
        if (!track) {
            dispatch(setCaptionsLanguage('en'));
            dispatch(setIsDisplayCaptions(false));
            return;
        }
        dispatch(setCaptionsLanguage(track.language || 'en'));
        dispatch(setIsDisplayCaptions(true));
        player.selectTextTrack(track);
        player.setTextTrackVisibility(true);
    }

    const qualitiesList = captions?.map(track => {
        const text:string = track.language || 'unknown';
        return (
            <li
                key={track.id}
                onClick={() => handleSelectCaption(track)}
                className="cursor-pointer m-0 flex px-4 py-2 h-8 hover:bg-slate-100 border-b-2 text-xs" role="button">
                <div className=" w-5 mr-1">
                    {
                        track.language === captionsLanguage && isDisplayCaptions && <CheckIcon className=" text-black w-4" />
                    }
                </div>
                <span className=" capitalize">{text}</span>
            </li>
        )
    })

    return (
        <div className=" bg-white text-black shadow-md rounded-md">
            <ul className=" m-0 pt-2 rounded-md overflow-hidden">
                {
                    qualitiesList
                }
                <li
                    onClick={() => handleSelectCaption(null)}
                    className="cursor-pointer m-0 flex px-4 py-2 h-10 text-xs hover:bg-slate-100 border-b-2" role="button">
                    <div className=" w-5 mr-1">
                        {
                            !isDisplayCaptions && <CheckIcon className=" text-black w-4" />
                        }
                    </div>Off
                </li>
            </ul>
        </div>
    )
}

export default CaptionsMenu;