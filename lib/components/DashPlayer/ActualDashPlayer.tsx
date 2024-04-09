// Mui removed
import { useCallback, useEffect, useRef, useState } from 'react';
import useShakaVideoPlayer from './hooks/useShakaVideoPlayer';
import MovieProgressbar from './MovieProgressbar';
import MoviePlayerBar from './MoviePlayerBar';
import { selectCaptionsLanguage, selectFullScreen, selectIsDisplayCaptions, selectIsMobileMode, selectIsVolumeSliderActive, selectLoaded, selectMute, selectPlaying, selectSelectedTrack, selectShowQualityMenu, selectVolume, selectVolumeLeftPosition, setAutoResolution, setCaptionsLanguage, setIsDisplayCaptions, setIsVolumeSliderActive, setLoaded, setPlaying, setSelectedTrack, setShowQualityMenu, setVolume, unloadAll } from '../../features/videoPlayer/videoPlayerSlice';
import useShakaABR from './hooks/useShakaABR';
import eventEmitter from './utils/eventEmitter';
import useVideoEventEmitter, { VideoEvent } from './hooks/useVideoEventEmitter';
import VideoPlayerFrame from './VideoPlayerFrame';
import { useAppDispatch, useAppSelector } from '../../lib-hooks/hooks';
import SettingMenu from './settingMenu/SettingMenu';
import QualitySwitcher from './QualitySwitcher';
import VerticalSlider from '../verticalSlider';
import { shaka } from './shaka/shaka';
import { DashPlayerCaption } from '.';

interface ActualDashPlayerProps {
    mpdSrc: string;

    captions?: DashPlayerCaption[];

    // Should the captions be displayed by default. If language is not found, then the first track will be displayed
    displayCaptions?: boolean;

    // Default subtitles language. defalt is english ('en')
    captionLanguage?: string;
}
const ActualDashPlayer = ({ mpdSrc, captions, displayCaptions, captionLanguage }: ActualDashPlayerProps) => {

    const loaded = useAppSelector(selectLoaded);

    const playing = useAppSelector(selectPlaying);

    const volume = useAppSelector(selectVolume);

    const mute = useAppSelector(selectMute);

    const selectedTrack = useAppSelector(selectSelectedTrack);

    const dispatch = useAppDispatch();

    const showQualityMenu = useAppSelector(selectShowQualityMenu);

    const fullScreen = useAppSelector(selectFullScreen);

    const isVolumeSliderActive = useAppSelector(selectIsVolumeSliderActive);

    const isMobileMode = useAppSelector(selectIsMobileMode);

    const captionsLanguage = useAppSelector(selectCaptionsLanguage);

    const isDisplayCaptions = useAppSelector(selectIsDisplayCaptions);

    const volumeSliderLeft = useAppSelector(selectVolumeLeftPosition);

    const { player, videoElement } = useShakaVideoPlayer();

    const [isHidePlayerMenu, setIsHidePlayerMenu] = useState(false);

    // Get or set fullscreen state before re-render
    const localFullScreenState = useRef(false);

    // A flag to set the hideMenuDelay function as active to avoid calling it more than once when active
    const isMenuHideDelayActive = useRef(false);

    // Check whether menu is active durring fullscreen to avoid hiding it while active 
    const isMenuOpenFullscreen = useRef(false);

    // Start listening for video events
    useVideoEventEmitter(videoElement);

    const initialized = useRef(false);
    const previousSrc = useRef(mpdSrc);

    const subTitleInitialized = useRef(false);
    // const previousSubtitle = useRef(srtURL);

    const cueContainer = useRef<HTMLDivElement>(null);

    // *************** [ SRT Caption addition] ****************

    const toggleCaptions = () => {
        if (loaded) {
            if (!isDisplayCaptions) {
                player.setTextTrackVisibility(false);
            } else {
                const textTracks: any[] = player.getTextTracks();
                
                if (textTracks.length) {
                    const selected = textTracks.find(track => track.language = captionLanguage || 'en');
                    player.selectTextTrack(selected || textTracks[0]);
                    player.setTextTrackVisibility(true);
                }

            }
        }
    }

    useEffect(() => {
        dispatch(setIsDisplayCaptions(displayCaptions || false));
        dispatch(setCaptionsLanguage(captionLanguage || 'en'))
    }, [displayCaptions, captionLanguage, dispatch]);

    useEffect(() => {
        toggleCaptions();
    }, [isDisplayCaptions, captionsLanguage, loaded, subTitleInitialized.current, toggleCaptions]);

    

    useEffect(() => {
        async function loadSubtitle() {
            if (!captions) {
                subTitleInitialized.current = false;
                return;
            }
            for (let i = 0; i < captions.length; i++) {
                const { src, language, kind } = captions[0];
                await player.addTextTrackAsync(src, language, kind);
                subTitleInitialized.current = true;
                toggleCaptions();
            }
        }

        if (captions && loaded) {
            loadSubtitle();
        }

        if (cueContainer.current) {
            player.configure('textDisplayFactory', () => new shaka.text.UITextDisplayer(videoElement, cueContainer.current));
        }
    }, [captions, loaded])

    // *************** [ SRT Caption addition] ****************

    // Load dash mpd file to shaka-player and set video to autoplay
    useEffect(() => {
        const loadDashVideo = async () => {
            try {

                if (initialized.current && previousSrc.current === mpdSrc) {
                    return;
                }
                initialized.current = true;
                previousSrc.current = mpdSrc;
                if (!player.getMediaElement()) {
                    await player.attach(videoElement);
                }
                // Load MPD stream manifest file of video
                await player.load(mpdSrc);
                dispatch(setLoaded(true));
                // If autoplay
                dispatch(setPlaying(true));
            } catch (err) {
                console.error("playDashVideo", err)
            }
        }

        const unloadVideo = async () => {
            await player.unload();
            await player.attach(videoElement);
        }

        // updateFrameAspectRatio(videoElement);
        dispatch(unloadAll());
        dispatch(setSelectedTrack({ id: -1, title: "auto" }));
        dispatch(setShowQualityMenu(false));
        if (mpdSrc && player) {
            // videoElement.setAttribute("controls", "true");
            videoElement.setAttribute("autoplay", "true");
            loadDashVideo();
        }
        else if (!mpdSrc && player) {
            unloadVideo();
        }
    }, [mpdSrc, player, videoElement, dispatch]);

    // Toggle auto ABR and set auto bitrate or user select 
    useShakaABR(selectedTrack, player);

    useEffect(() => {
        function updateAutoABR() {
            if (videoElement.readyState === 4 && mpdSrc) {
                if (selectedTrack.id === -1) {
                    /* eslint @typescript-eslint/no-explicit-any: "off" */
                    const active = player.getVariantTracks().find((track: any) => track.active);
                    const resolution = Math.min(active?.width || 0, active?.height || 0);
                    dispatch(setAutoResolution(resolution > 0 ? `${resolution}p` : ""));
                }
            }
        }
        const listener = eventEmitter.addListener(VideoEvent.Progress, updateAutoABR);
        return () => {
            listener.remove();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mpdSrc, player, selectedTrack]);

    // Toggle video player play by state
    useEffect(() => {
        if (playing && mpdSrc) {
            videoElement?.play();
        } else {
            videoElement?.pause();
        }
    }, [playing, videoElement, mpdSrc]);

    useEffect(() => {
        videoElement.muted = mute;
    }, [mute, videoElement]);

    useEffect(() => {
        videoElement.volume = volume / 100;
    }, [volume, videoElement]);



    const hideMenuDelay = useCallback((delay = 1000) => {
        setTimeout(() => {
            isMenuHideDelayActive.current = false;
            if (localFullScreenState.current && !isMenuOpenFullscreen.current) {
                setIsHidePlayerMenu(true);
                document.body.style.cursor = 'none';
            }
        }, delay)
    }, []);

    useEffect(() => {
        function fullScreenHandler(isFullscreen: boolean) {
            localFullScreenState.current = isFullscreen;
            if (isFullscreen) {
                hideMenuDelay();
                return;
            }
            setIsHidePlayerMenu(isFullscreen);
            document.body.style.cursor = 'default';
        }

        function showMenuAgain() {
            if (fullScreen && !isMenuHideDelayActive.current) {
                setIsHidePlayerMenu(false);
                isMenuHideDelayActive.current = true;
                document.body.style.cursor = 'default';
                hideMenuDelay(5000);
            }
        }

        function setMenuIsActive(isMenuActive: boolean) {
            isMenuOpenFullscreen.current = isMenuActive;
        }

        const fullScreenListener = eventEmitter.addListener('fullscreenchange', fullScreenHandler);
        const mouseListener = eventEmitter.addListener('mouseMoveFrame', showMenuAgain);
        const menuListener = eventEmitter.addListener('menuIsOpen', setMenuIsActive);

        return () => {
            fullScreenListener.remove();
            mouseListener.remove();
            menuListener.remove();
        }
    }, [fullScreen, hideMenuDelay]);

    useEffect(() => {
        setIsHidePlayerMenu(fullScreen);
    }, [fullScreen]);

    const hideVolumeSlider = () => {
        dispatch(setIsVolumeSliderActive(false));
    }

    const handleVolumeChange = (value: number) => {
        dispatch(setVolume(value));
    }

    return (
        <VideoPlayerFrame mpdSrc={mpdSrc} videoElement={videoElement}>
            <div ref={cueContainer}
                style={{ fontSize: fullScreen ? "24px" : "16px" }}
                className={` ${isMobileMode ? 'sm:bottom-12' : 'sm:bottom-20'} absolute bottom-12 left-0 right-0 text-white z-50`}></div>
            {
                loaded &&
                <div style={{
                    width: "100%",
                    height: "auto",
                    position: "absolute",
                    zIndex: "99",
                    left: "0px",
                    bottom: "0px",
                    background: "linear-gradient(rgba(0,0,0,0), #000000)"
                }}
                    className=' pb-0 sm:pb-3'
                >
                    <div style={{ opacity: isHidePlayerMenu ? 0 : 1, transition: "opacity .5s" }}>
                        <>
                            <div className=' px-0'>
                                <MovieProgressbar src={mpdSrc} player={player} videoElement={videoElement}></MovieProgressbar>
                            </div>
                            <MoviePlayerBar player={player} videoElement={videoElement} src={mpdSrc}></MoviePlayerBar>
                        </>
                    </div>



                </div>
            }
            <SettingMenu player={player} src={mpdSrc} />
            {
                showQualityMenu && <QualitySwitcher player={player} src={mpdSrc}></QualitySwitcher>
            }

            {/* test vertival range slider */}
            {
                isVolumeSliderActive && <VerticalSlider onClickOutside={hideVolumeSlider} left={volumeSliderLeft} value={volume} onChange={handleVolumeChange} />
            }

        </VideoPlayerFrame>
    )
}

export default ActualDashPlayer;

