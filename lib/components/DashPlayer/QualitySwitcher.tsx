// Mui removed
import { useEffect } from "react";
import DashPlayerQualityMenu from "./DashPlayerQualityMenu";
import { selectVariantTracks, setShowQualityMenu, setVariantTracks } from "../../features/videoPlayer/videoPlayerSlice";
import { useAppDispatch, useAppSelector } from "../../lib-hooks/hooks";
import eventEmitter from "./utils/eventEmitter";

export interface QualitySwitcherProps {
    player: any;
    src: string;
    width?: string;
    isStatic?: boolean;
}

const QualitySwitcher = ({ player, src }: QualitySwitcherProps) => {

    const variantTracks = useAppSelector(selectVariantTracks);

    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setShowQualityMenu(false));
        eventEmitter.emit('menuIsOpen', false);
    }

    useEffect(() => {
        try {
            const variantTracks = player.getVariantTracks();
            dispatch(setVariantTracks(variantTracks.reverse()));
        } catch (e) {
            console.error(e);
        }
    }, [src, player, dispatch]);

    return (
        <div
            onClick={() => { handleClose() }}
            className={` absolute top-0 left-0 z-50 right-0 bottom-0 sm:bottom-[70px] text-slate-700  bg-transparent `}>
                <div className=" right-3 bottom-2 absolute w-[200px]">
            <DashPlayerQualityMenu variantTracks={variantTracks}></DashPlayerQualityMenu>
        </div>
            </div>
        
    )
}

export default QualitySwitcher;