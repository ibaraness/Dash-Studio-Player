// Mui removed
import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import VideoLoaderAnimation from "./VideoLoaderAnimation";
import { selectFullScreen, selectPlaying, setFullScreen, setIsMobileMode, setPlaying } from "../../features/videoPlayer/videoPlayerSlice";
import useFullScreenEvent from "./hooks/useFullScreenEvent";
import eventEmitter from "./utils/eventEmitter";
import MobileMuteButton from "./MobileMuteButton";
import { useAppSelector, useAppDispatch } from "../../lib-hooks/hooks";
import useThrottle from "./hooks/useThrottle";


interface VideoPlayerFrameProps extends PropsWithChildren {
    mpdSrc: string;
    videoElement: HTMLVideoElement;
}

const VideoPlayerFrame = ({ mpdSrc, videoElement, children }: VideoPlayerFrameProps) => {
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);
    const playing = useAppSelector(selectPlaying);
    const fullScreen = useAppSelector(selectFullScreen);


    const throttle = useThrottle()

    const dispatch = useAppDispatch();

    const mousePosition = useRef<{ x: number, y: number } | null>(null);

    const updateFrameAspectRatio = useCallback((_: HTMLElement, isFullscreen: boolean = false) => {
        if (!videoContainerRef.current) {
            return;
        }
        if (isFullscreen) {
            videoElement.style.width = "100vw";
            videoElement.style.height = "100vh";
            videoElement.style.position = "absolute";
            videoElement.style.top = '0';// `${videoElement.offsetHeight / 2}px`;
            return;
        }
        videoElement.style.position = "static";
        videoElement.style.top = `0px`;
        // const width = videoContainerRef.current.offsetWidth;
        videoElement.style.width = "100%";
        videoElement.style.height = "auto";
        videoElement.style.aspectRatio = "16/9";
        
        // setFrameAspectRatio(htmlElement, width, AspectRatioAlg.W16H9);
    }, [videoElement.style])

    useEffect(() => {
        // Append video element to div container
        if (videoContainerRef.current && videoContainerRef.current.firstChild !== videoElement) {
            videoContainerRef.current.appendChild(videoElement);
            updateFrameAspectRatio(videoElement);
        }
    }, [videoContainerRef, updateFrameAspectRatio, videoElement])

    // Handler window resize
    useEffect(() => {
        function handleResize() {
            if (!videoElement || !!document.fullscreenElement) {
                return;
            }
            updateFrameAspectRatio(videoElement);
        }

        const listener = eventEmitter.addListener("resize", handleResize);
        return () => {
            listener.remove();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mpdSrc]);

    // Handle fullscreen events
    const fullscreenHandler = useCallback((isFullscreen: boolean) => {
        updateFrameAspectRatio(videoElement, isFullscreen);
        dispatch(setFullScreen(isFullscreen));
    }, [updateFrameAspectRatio, videoElement, dispatch])

    useFullScreenEvent(playerContainerRef.current!, fullScreen);

    useEffect(() => {
        const listener = eventEmitter.addListener("fullscreenchange", fullscreenHandler);
        return () => {
            listener.remove();
        }
    }, [fullScreen, fullscreenHandler])



    const togglePlayVideo = () => {
        dispatch(setPlaying(!playing));
    }

    // Notify eventEmitter listeners for mouse move during full screen
    const fullscreenMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        throttle(() => {
            if (mousePosition.current === null) {
                mousePosition.current = { x: event.clientX, y: event.clientY }
                return;
            }
            const distanceX = Math.max(mousePosition.current.x, event.clientX) - Math.min(mousePosition.current.x, event.clientX);
            const distanceY = Math.max(mousePosition.current.y, event.clientY) - Math.min(mousePosition.current.y, event.clientY);
            mousePosition.current = null;
            if (Math.max(distanceX, distanceY) > 30) {
                eventEmitter.emit("mouseMoveFrame", distanceX);
            }
        }, 50)
    }

    useEffect(() =>{
        const container = playerContainerRef.current;
        if(!container){
            return;
        }
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    const contentBoxSize = entry.contentBoxSize[0];
                    dispatch(setIsMobileMode(contentBoxSize.inlineSize < 500))
                }
            }
        });
        resizeObserver.observe(container);
        return () => {
            if(container){
                resizeObserver.unobserve(container);
            }
            
        }
    });

    return (
        <div ref={playerContainerRef} className=" dsp-app relative aspect-video" >
                <div style={{ position: 'relative' }} >
                    <div className=" bg-black w-full" ref={videoContainerRef}></div>
                    <div
                        onClick={() => togglePlayVideo()}
                        onMouseMove={fullscreenMouseMove}
                        style={{
                            position: fullScreen ? "fixed" : "absolute",
                            display: "flex",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            zIndex: "9",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <VideoLoaderAnimation src={mpdSrc} videoElement={videoElement} />

                        {/* Add mute icons to top right here */}
                        <div style={{ position: "absolute", top: "5px", right: "10px" }}>
                            <MobileMuteButton />
                        </div>
                    </div>

                </div>
                {children}
            </div>
    )
}

export default VideoPlayerFrame;

