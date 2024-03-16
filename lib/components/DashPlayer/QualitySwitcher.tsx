// MUI direct checked
import Box from "@mui/material/Box";
import { useEffect } from "react";
import DashPlayerQualityMenu from "./DashPlayerQualityMenu";
import { selectVariantTracks, setVariantTracks } from "../../features/videoPlayer/videoPlayerSlice";
import { useAppDispatch, useAppSelector } from "../../lib-hooks/hooks";

export interface QualitySwitcherProps {
    player: any;
    src: string;
}

const QualitySwitcher = ({ player, src }: QualitySwitcherProps) => {

    const variantTracks = useAppSelector(selectVariantTracks);

    const dispatch = useAppDispatch();

    useEffect(() => {
        try {
            const variantTracks = player.getVariantTracks();
            dispatch(setVariantTracks(variantTracks.reverse()));
        } catch (e) {
            console.error(e);
        }
    }, [src, player, dispatch]);

    return (
        <Box sx={{ width: "200px", position: "absolute", right: "4px", bottom: "60px" }}>
            <DashPlayerQualityMenu variantTracks={variantTracks}></DashPlayerQualityMenu>
        </Box>
    )
}

export default QualitySwitcher;