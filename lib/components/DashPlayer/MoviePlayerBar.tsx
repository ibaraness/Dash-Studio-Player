// Mui removed
import VideoTimer from "./VideoTimer";

// Hero Icons
import PlayIcon from '@heroicons/react/24/solid/PlayIcon';
import PauseIcon from '@heroicons/react/24/solid/PauseIcon';
import SpeakerWaveIcon from '@heroicons/react/24/solid/SpeakerWaveIcon';
import SpeakerXMarkIcon from '@heroicons/react/24/solid/SpeakerXMarkIcon';
import ArrowsPointingInIcon from '@heroicons/react/24/solid/ArrowsPointingInIcon';
import ArrowsPointingOutIcon from '@heroicons/react/24/solid/ArrowsPointingOutIcon';
import Cog6ToothIcon from '@heroicons/react/24/solid/Cog6ToothIcon';

import { selectAutoResolution, selectFullScreen, selectMute, selectPlaying, selectSelectedTrack, selectSettingIsOpen, selectShowQualityMenu, selectVolume, setFullScreen, setMute, setPlaying, setSettingIsOpen, setShowQualityMenu, setVolume } from "../../features/videoPlayer/videoPlayerSlice";
import { useEffect } from "react";
import eventEmitter from "./utils/eventEmitter";
import { VideoEvent } from "./hooks/useVideoEventEmitter";
import { useAppSelector, useAppDispatch } from "../../lib-hooks/hooks";
import ClickableIcon from "./ClickableIcon";

export interface MoviePlayerBarProps {
    videoElement: HTMLVideoElement,
    player: any,
    src: string
}

const MoviePlayerBar = ({ videoElement, src }: MoviePlayerBarProps) => {

    const playing = useAppSelector(selectPlaying);
    const fullScreen = useAppSelector(selectFullScreen);
    const volume = useAppSelector(selectVolume);
    const mute = useAppSelector(selectMute);
    const selectedTrack = useAppSelector(selectSelectedTrack);
    const showQualityMenu = useAppSelector(selectShowQualityMenu);
    const autoResolution = useAppSelector(selectAutoResolution);
    const settingIsOpen = useAppSelector(selectSettingIsOpen);

    useEffect(() => {
        function setPlayingState() {
            dispatch(setPlaying(false));
        }
        const listener = eventEmitter.addListener(VideoEvent.Ended, setPlayingState);
        return () => {
            listener.remove();
        }
    })

    const dispatch = useAppDispatch();

    const togglePlayVideo = () => {
        dispatch(setPlaying(!playing));
    }

    const toggleFullScreen = () => {
        dispatch(setFullScreen(!fullScreen));
    }

    const handleVolumeChange = (value: number) => {
        dispatch(setVolume(value));
    }

    const toggleMute = () => {
        dispatch(setMute(!mute));
    }

    const toggleQualityMenu = () => {
        dispatch(setSettingIsOpen(false));
        dispatch(setShowQualityMenu(!showQualityMenu));
        eventEmitter.emit('menuIsOpen', !settingIsOpen);
    }

    const toggleSettings = () => {
        //different behaviour for mobile and destop
        dispatch(setSettingIsOpen(!settingIsOpen));
        dispatch(setShowQualityMenu(false));
        eventEmitter.emit('menuIsOpen', !settingIsOpen);
    }

    return (
        <>
            {/* Tailwind */}
            <div className=" flex pl-2 pr-2 justify-between items-center h-full">
                <div className="flex items-center w-full">
                    <ClickableIcon onClick={() => togglePlayVideo()} aria-label="play">
                        {!playing
                            ? <PlayIcon className=" text-white w-5 h-5" />
                            : <PauseIcon className=" text-white w-5 h-5" />
                        }

                    </ClickableIcon>
                    <ClickableIcon
                        className=" hidden sm:flex"
                        onClick={() => toggleMute()} aria-label="volume">
                        {
                            mute
                                ? <SpeakerXMarkIcon className=" text-white w-5 h-5" />
                                : <SpeakerWaveIcon className=" text-white w-5 h-5" />
                        }

                    </ClickableIcon>
                    {
                        !mute &&
                        <input
                            className=" hidden sm:block w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                            type="range" aria-label="Volume" min="0" max="100" value={volume} onChange={(event) => handleVolumeChange(+event.target.value)} step="1" />
    
                    }
                    <VideoTimer video={videoElement} src={src}></VideoTimer>
                </div>
                <div className=" flex flex-row-reverse items-center w-full">
                    <ClickableIcon  onClick={() => toggleFullScreen()} aria-label="fullscreen">
                        {
                            !fullScreen
                                ? <ArrowsPointingOutIcon className=" text-white w-5 h-5" />
                                : <ArrowsPointingInIcon className=" text-white w-5 h-5" />
                        }


                    </ClickableIcon>
                    <ClickableIcon onClick={() => toggleSettings()} className=" relative" aria-label="settings">
                        <Cog6ToothIcon className=" text-white w-5 h-5" />
                    </ClickableIcon>
                    <div>
                        <div
                            role="button"
                            className=" hidden md:inline-block text-white uppercase text-sm font-semibold"
                            onClick={() => toggleQualityMenu()} >
                            {selectedTrack.title}
                            {
                                selectedTrack.id === -1 && `(${autoResolution})`
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default MoviePlayerBar;

