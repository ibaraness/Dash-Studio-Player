import { useState, useRef, useEffect } from "react";
import { selectIsMobileMode } from "../../features/videoPlayer/videoPlayerSlice";
import { useAppSelector } from "../../lib-hooks/hooks";

interface VerticalSliderProps {
    value?: number;
    onChange?: (value: number) => void;
    onClickOutside?: () => void;
    left?:number;
}
const VerticalSlider = ({ value = 100, onChange, onClickOutside, left=10 }: VerticalSliderProps) => {

    const trackElement = useRef<HTMLDivElement | null>(null);

    const containerElement = useRef<HTMLDivElement | null>(null);

    // Height of slider and track
    const height = 128;

    // Width of track line
    const width = 2;

    // Slider Handle width and height
    const handleSize = 16;

    // Top and bottom paddding offest of slider track
    const trackOffset = 4;

    const topBoundary = height - handleSize - trackOffset;

    const percentageUnit = 100 / (topBoundary - trackOffset);

    const [handlePositon, setHandlePosition] = useState((100 - (percentageUnit * value)) + (handleSize / 2) - trackOffset);
    const lastHandlePosition = useRef((100 - (percentageUnit * value)) + (handleSize / 2) - trackOffset);

    // Track
    const isMouseDown = useRef(false);
    const lastPoint = useRef(0);

    const isActiveDrag = useRef(false);
    const isClickedOutside = useRef(false);

    const isMobileMode = useAppSelector(selectIsMobileMode);

    const handleClose = () => {
        if (onClickOutside && isClickedOutside.current) {
            isClickedOutside.current = false;
            onClickOutside();
        }
    }

    useEffect(() => {
        function handleTouchMove(event: TouchEvent) {
            event.preventDefault();
            mouseMoveAll(event.touches[0].clientY);
        }
        if (containerElement.current) {
            containerElement.current.addEventListener('touchmove', handleTouchMove, { passive: false })
        }
        return () => {
            if (containerElement.current) {
                containerElement.current.removeEventListener('touchmove', handleTouchMove);
            }
        }
    })

    // Abstract mouse and touch handlers
    const startDragAll = (currentPosition: number) => {
        isMouseDown.current = true;
        lastPoint.current = currentPosition;
        isActiveDrag.current = true;
    }

    const calculatePercentage = (currentHandlePosition = handlePositon) => {
        const percent = Math.round((currentHandlePosition - trackOffset) * percentageUnit);
        if (onChange) {
            onChange(100 - percent);
        }
    }

    const stopDragAll = (currentPosition: number) => {
        if (!isActiveDrag.current) {
            return;
        }
        isMouseDown.current = false;
        lastPoint.current = currentPosition;
        lastHandlePosition.current = handlePositon;
        isActiveDrag.current = false;
        calculatePercentage();
    }

    const mouseMoveAll = (currentPosition: number) => {
        if (isMouseDown.current) {
            const offset = currentPosition - lastPoint.current;
            const newPosition = lastHandlePosition.current + offset;

            if (newPosition >= trackOffset && newPosition <= topBoundary) {
                setHandlePosition(newPosition);
                calculatePercentage();
            }
        }
    }

    const trackClick = (currentPosition: number) => {
        if (trackElement.current && !isActiveDrag.current) {
            const trackY = trackElement.current.getBoundingClientRect().top;
            const difference = currentPosition - trackY;
            if (difference >= trackOffset && difference <= topBoundary) {
                setHandlePosition(difference);
                lastHandlePosition.current = difference;
                lastPoint.current = currentPosition;
                calculatePercentage(difference);
            }
        }
    }

    return (
        <div
            onClick={() => { handleClose() }}
            onMouseDown={() => { isClickedOutside.current = true }}
            onMouseUp={(event) => { event.stopPropagation(); stopDragAll(event.clientY) }}
            onTouchEnd={(event) => { event.stopPropagation(); stopDragAll(event.changedTouches[0].clientY) }}
            onMouseMove={(event) => { mouseMoveAll(event.clientY) }}
            onMouseLeave={(event) => { stopDragAll(event.clientY) }}
            role='button'
            ref={containerElement}
            className={` ${isMobileMode ? 'bottom-[52px]' : 'bottom-[70px]'} absolute top-0 left-0 z-50 right-0  text-slate-700  bg-transparent `}>
            <div
                style={{ height: `${height}px`, left:`${left}px` }}
                onClick={(event) => { event.stopPropagation(); }}
                role='button'
                onMouseUp={(event) => { trackClick(event.clientY) }}
                onTouchEnd={(event) => { trackClick(event.changedTouches[0].clientY) }}
                className=' absolute w-7 bottom-7 bg-slate-500/40 rounded-xl'>
                {/* Track */}
                <div
                    style={{ width: `${width}px` }}
                    ref={trackElement}
                    className=' absolute top-2 bottom-2 -translate-x-1/2 left-2/4 bg-slate-50'></div>
                {/* Handle */}
                <div
                    onClick={(event) => { event.stopPropagation(); }}
                    onMouseDown={(event) => { event.stopPropagation(); event.preventDefault(); startDragAll(event.clientY) }}
                    onTouchStart={(event) => { event.stopPropagation(); startDragAll(event.touches[0].clientY) }}
                    style={{ top: `${handlePositon}px`, width: `${handleSize}px`, height: `${handleSize}px` }}
                    role='button'
                    tabIndex={0}
                    className=' cursor-pointer absolute -translate-x-1/2 left-2/4 hover:scale-110 transition-transform rounded-full bg-blue-400'></div>
            </div>
        </div>
    )
}
export default VerticalSlider;