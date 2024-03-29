import { PropsWithChildren } from "react";
import { useAppSelector } from "../../lib-hooks/hooks";
import { selectIsMobileMode } from "../../features/videoPlayer/videoPlayerSlice";

interface ClickableIconProps extends PropsWithChildren {
    onClick?: () => void;
    "aria-label"?: string;
    className?: string
}
const ClickableIcon = ({onClick, className = '', children, ...props}:ClickableIconProps) => {

    const isMobileMode = useAppSelector(selectIsMobileMode);
    
    return (
        <div className={`${isMobileMode ? 'w-5' : 'w-10'} flex h-10 shrink-0 justify-center items-center ${className}`} role="button" onClick={() => onClick && onClick()} aria-label={props["aria-label"] || 'a button'}>
        {
            children
        }
        </div>

    )
}

export default ClickableIcon;