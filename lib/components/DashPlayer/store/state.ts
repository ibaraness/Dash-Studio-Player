import { createContext } from "react";

export interface SelectedTrackInfo {
    id: number;
    title: string;
}

export interface VideoPlayState {
    playing: boolean;
    loaded: boolean;
    isSupported: boolean;
    buffer?: number;
    progressValue?: number;
    variantTracks: any[];
    selectedTrack: SelectedTrackInfo;
    videoDuration: string;
    parsedTime: string;
    fullScreen: boolean;
    mute: boolean;
    volume: number;
    showQualityMenu: boolean;
    isBuffering: boolean;
    autoResolution: string;
    initialized: boolean;
    settingIsOpen: boolean;
}

export const initialState: VideoPlayState = {
    playing: true,
    loaded: false,
    isSupported: true,
    buffer: 0,
    progressValue: 0,
    variantTracks: [],
    selectedTrack: {id:-1, title:"Auto"},
    videoDuration: "00:00:00",
    parsedTime: "00:00:00",
    fullScreen:false,
    mute: false,
    volume: 100,
    showQualityMenu: false,
    isBuffering: false,
    autoResolution: "",
    initialized: false,
    settingIsOpen: false
}

export const PlayerContext = createContext(initialState);