import { PropsWithChildren } from "react";

interface ClickableIconProps extends PropsWithChildren {
    onClick?: () => void;
    "aria-label"?: string;
    className?: string
}
const ClickableIcon = ({onClick, className = '', children, ...props}:ClickableIconProps) => {
    return (
        <div className={`flex w-10 h-10 shrink-0 justify-center items-center ${className}`} role="button" onClick={() => onClick && onClick()} aria-label={props["aria-label"] || 'a button'}>
        {
            children
        }
        </div>

    )
}

export default ClickableIcon;