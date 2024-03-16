// MUI direct checked
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";

import { selectSettingIsOpen, setSettingIsOpen } from "../../../features/videoPlayer/videoPlayerSlice";
import SettingsQualitySelector from "./SettingsQualitySelector";
import { useAppDispatch, useAppSelector } from "../../../lib-hooks/hooks";

export interface SettingMenuProps {
    player: any,
    src: string;
}

const SettingMenu = ({ player, src }: SettingMenuProps) => {
    const settingIsOpen = useAppSelector(selectSettingIsOpen);
    
    const dispatch = useAppDispatch();

    const handleClose = (approved: boolean) => {
        dispatch(setSettingIsOpen(approved));
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            style={{height:"100%"}}
            open={settingIsOpen}
            onClose={() => { handleClose(false) }}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Settings"}
            </DialogTitle>
            <DialogContent style={{height:"100%"}}>
                <Box sx={{ position: "relative" }}>
                    <SettingsQualitySelector player={player} src={src} />
                </Box>
            </DialogContent>
        </Dialog>
    )
}
export default SettingMenu;