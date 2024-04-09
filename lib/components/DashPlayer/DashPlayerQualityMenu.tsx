// Mui removed
import CheckIcon from '@heroicons/react/24/solid/CheckIcon';
import { selectSelectedTrack, setSelectedTrack, setShowQualityMenu } from "../../features/videoPlayer/videoPlayerSlice";
import { useAppSelector, useAppDispatch } from "../../lib-hooks/hooks";

export interface DashPlayerQualityMenuProps {
    variantTracks: any[];
}

const DashPlayerQualityMenu = ({ variantTracks }: DashPlayerQualityMenuProps) => {

    const selectedTrack = useAppSelector(selectSelectedTrack);
    const dispatch = useAppDispatch();

    const handlesSelectVariantTrack = (track: any | null) => {
        if (track === null) {
            dispatch(setSelectedTrack({ id: -1, title: "Auto" }));
            dispatch(setShowQualityMenu(false));
            return;
        }
        const { id, height, width } = track;
        const title = `${Math.min(width!, height!)}p`;
        dispatch(setSelectedTrack({ id, title }));
        dispatch(setShowQualityMenu(false));
    }

    const qualitiesList = variantTracks.filter(track => !!track.height && !!track.width).map(track => {
        const text = `${Math.min(track.width!, track.height!)}p`;
        return (
            <li
                key={track.id}
                onClick={() => handlesSelectVariantTrack(track)}
                className=" cursor-pointer m-0 flex px-4 py-2 h-8 hover:bg-slate-100 border-b-2  text-xs" role="button">
                <div className=" w-5 mr-1">
                    {
                        selectedTrack.id === +track.id && <CheckIcon className=" text-black w-4" />
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
                    qualitiesList
                }
                <li
                    onClick={() => handlesSelectVariantTrack(null)}
                    className="cursor-pointer m-0 flex px-4 py-2 h-10 text-xs hover:bg-slate-100 border-b-2 " role="button">
                    <div className=" w-5 mr-1">
                        {
                            selectedTrack.id === -1 && <CheckIcon className=" text-black w-4" />
                        }
                    </div>Auto
                </li>
            </ul>
        </div>
    )
}

export default DashPlayerQualityMenu;