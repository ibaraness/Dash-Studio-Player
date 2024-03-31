// Mui removed
import ChevronDoubleLeftIcon from '@heroicons/react/24/solid/ChevronDoubleLeftIcon';

import { selectCaptionsLanguage, selectIsDisplayCaptions, selectIsMobileMode, selectSettingIsOpen, selectVariantTracks, setSettingIsOpen, setVariantTracks } from "../../../features/videoPlayer/videoPlayerSlice";
import { useAppDispatch, useAppSelector } from "../../../lib-hooks/hooks";
import { useEffect, useState } from "react";
import DashPlayerQualityMenu from "../DashPlayerQualityMenu";
import eventEmitter from '../utils/eventEmitter';
import CaptionsMenu from './CaptionsMenu';

export interface SettingMenuProps {
    player: any,
    src: string;
}

enum ActiveMenu {
    Main = 0,
    Quality = 1,
    Captions = 2
}

const SettingMenu = ({ player }: SettingMenuProps) => {

    const [activeMenu, setActiveMenu] = useState<ActiveMenu>(0)

    const settingIsOpen = useAppSelector(selectSettingIsOpen);

    const variantTracks = useAppSelector(selectVariantTracks);

    const isMobileMode = useAppSelector(selectIsMobileMode);

    const captionsLanguage = useAppSelector(selectCaptionsLanguage);

    const isDisplayCaptions = useAppSelector(selectIsDisplayCaptions);

    const dispatch = useAppDispatch();

    const handleClose = (approved: boolean) => {
        dispatch(setSettingIsOpen(approved));
        setActiveMenu(ActiveMenu.Main);
        eventEmitter.emit('menuIsOpen', approved);
    }

    useEffect(() => {
        try {
            if (activeMenu === ActiveMenu.Quality) {
                const variantTracks = player.getVariantTracks();
                dispatch(setVariantTracks(variantTracks.reverse()));
            }

        } catch (e) {
            console.error(e);
        }
    }, [activeMenu, player, dispatch]);

    const handleQualityChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setActiveMenu(ActiveMenu.Quality);
    }

    const handleCaptionsChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setActiveMenu(ActiveMenu.Captions);
    }

    const goBackToMain = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setActiveMenu(ActiveMenu.Main);
    }

    return (
        <div
            onClick={() => { handleClose(false) }}
            className={`${settingIsOpen ? ' block' : ' hidden'} ${isMobileMode ? 'sm:bottom-[50px]' : 'sm:bottom-[70px]'} fixed sm:absolute top-0 left-0 z-50 right-0 bottom-0  text-slate-700  bg-black/30 sm:bg-transparent`}>
            <div className=" absolute bottom-0 left-0 w-full sm:right-0 sm:left-auto sm:w-auto p-2">
                {
                    activeMenu === ActiveMenu.Main &&
                    <div className=" bg-white rounded-md w-full py-3 px-5">
                        <h3 className=" text-md">Settings</h3>
                        <div className=" mt-2 border-t-2 pt-2 flex justify-between items-center">
                            <h4 className=" text-sm mr-5">Quality</h4>
                            <div
                                onClick={handleQualityChange}
                                role="button"
                                className=" text-xs text-cyan-800 underline">Auto(1080p)</div>
                        </div>
                        <div className=" mt-2 border-t-2 pt-2 flex justify-between items-center">
                            <h4 className=" text-sm mr-5">Speed</h4>
                            <span className=" text-xs text-cyan-800">2X</span>
                        </div>
                        <div className=" mt-2 border-t-2 pt-2 flex justify-between items-center">
                            <h4 className=" text-sm mr-5">Subtitle</h4>
                            <div
                                onClick={handleCaptionsChange}
                                role="button"
                                className=" text-xs text-cyan-800 underline">{
                                    isDisplayCaptions && captionsLanguage || 'Off'
                                }</div>
                        </div>
                    </div>
                }
                {
                    activeMenu === ActiveMenu.Quality &&
                    <div className="bg-white rounded-md w-full sm:w-[200px] overflow-hidden">
                        <div
                            onClick={goBackToMain}
                            className=" py-3 px-4 bg-slate-300" role="button">
                            <ChevronDoubleLeftIcon className=" w-4 h-4" />
                        </div>

                        <DashPlayerQualityMenu variantTracks={variantTracks}></DashPlayerQualityMenu>
                    </div>

                }
                {
                    activeMenu === ActiveMenu.Captions &&
                    <div className="bg-white rounded-md w-full sm:w-[200px] overflow-hidden">
                        <div
                            onClick={goBackToMain}
                            className=" py-3 px-4 bg-slate-300" role="button">
                            <ChevronDoubleLeftIcon className=" w-4 h-4" />
                        </div>
                        <CaptionsMenu player={player} />
                    </div>
                }

            </div>
        </div>
    )
}
export default SettingMenu;

