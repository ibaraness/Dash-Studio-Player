export interface SettingMenuItemProps {
    subjectTitle: string;
    valueTitle: string;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const SettingMenuItem = ({subjectTitle, valueTitle, onClick}: SettingMenuItemProps) => {
    return (
        <div className=" mt-2 border-t-2 min-w-28 pt-2 flex justify-between items-center">
            <h4 className="p-0 m-0 font-normal min-w text-sm mr-5">{subjectTitle}</h4>
            <div
                onClick={onClick}
                role="button"
                className=" capitalize cursor-pointer text-xs text-cyan-800 underline">{valueTitle}</div>
        </div>
    )
}