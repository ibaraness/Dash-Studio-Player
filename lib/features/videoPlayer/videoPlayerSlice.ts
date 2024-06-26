import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

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
    isMobileMode: boolean;
    isVolumeSliderActive: boolean;
    volumeSliderLeftPosition: number;
    isDisplayCaptions: boolean;
    captionsLanguage: string;
    speed: number;
}

const initialState: VideoPlayState = {
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
    settingIsOpen: false,
    isMobileMode: false,
    isVolumeSliderActive: false,
    volumeSliderLeftPosition:0,
    isDisplayCaptions: false,
    captionsLanguage: '',
    speed:1
}

export const videoPlayerSlice = createSlice({
    name: 'videoPlayer',
    initialState,
    reducers: {
        setPlaying: (state, action: PayloadAction<boolean>) => {
            state.playing = action.payload;
        },
        setLoaded: (state, action: PayloadAction<boolean>) => {
            state.loaded = action.payload;
        },
        unloadAll: (state) => {
            state.buffer = 0;
            state.parsedTime = "00:00:00";
            state.videoDuration = "00:00:00";
            state.variantTracks = [];
            state.loaded = false;
            // state.playing = false;
        },
        setIsSupported: (state, action: PayloadAction<boolean>) => {
            state.isSupported = action.payload;
        },
        setSettingIsOpen: (state, action: PayloadAction<boolean>) => {
            state.settingIsOpen = action.payload;
        },
        setBuffer: (state, action: PayloadAction<number>) => {
            state.buffer = action.payload;
        },
        setProgressValue: (state, action: PayloadAction<number>) => {
            state.progressValue = action.payload;
        },
        setVariantTracks: (state, action: PayloadAction<any[]>) => {
            state.variantTracks = action.payload;
        },
        setVideoDuration: (state, action: PayloadAction<string>) => {
            state.videoDuration = action.payload;
        },
        setParsedTime: (state, action: PayloadAction<string>) => {
            state.parsedTime = action.payload;
        },
        setFullScreen: (state, action: PayloadAction<boolean>) => {
            state.fullScreen = action.payload;
        },
        setMute: (state, action: PayloadAction<boolean>) => {
            state.mute = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setSelectedTrack: (state, action: PayloadAction<SelectedTrackInfo>) => {
            state.selectedTrack = action.payload;
        },
        setShowQualityMenu: (state, action: PayloadAction<boolean>) => {
            state.showQualityMenu = action.payload;
        },
        setIsBuffering: (state, action: PayloadAction<boolean>) => {
            state.isBuffering = action.payload;
        },
        setAutoResolution: (state, action: PayloadAction<string>) => {
            state.autoResolution = action.payload;
        },
        setInitialized: (state, action: PayloadAction<boolean>) => {
            state.initialized = action.payload;
        },
        setIsMobileMode: (state, action: PayloadAction<boolean>) =>{
            state.isMobileMode = action.payload;
        },
        setIsVolumeSliderActive: (state, action: PayloadAction<boolean>) =>{
            state.isVolumeSliderActive = action.payload;
        },
        setIsDisplayCaptions:(state, action: PayloadAction<boolean>) => {
            state.isDisplayCaptions = action.payload;
        },
        setCaptionsLanguage:(state, action: PayloadAction<string>) => {
            state.captionsLanguage = action.payload;
        },
        setVideoSpeed:(state, action: PayloadAction<number>) => {
            state.speed = action.payload;
        },
        setVolumeLeftPosition:(state, action: PayloadAction<number>) => {
            state.volumeSliderLeftPosition = action.payload;
        }
    }
});

export const selectPlaying = (state: RootState) => state.videoPlayer.playing;
export const selectLoaded= (state: RootState) => state.videoPlayer.loaded;
export const selectIsSupported = (state: RootState) => state.videoPlayer.isSupported;
export const selectBuffer = (state: RootState) => state.videoPlayer.buffer;
export const selectVariantTracks = (state: RootState) => state.videoPlayer.variantTracks;
export const selectVideoDuration = (state: RootState) => state.videoPlayer.videoDuration;
export const selectParsedTime = (state: RootState) => state.videoPlayer.parsedTime;
export const selectProgressValue = (state: RootState) => state.videoPlayer.progressValue; 
export const selectFullScreen = (state: RootState) => state.videoPlayer.fullScreen;
export const selectMute = (state: RootState) => state.videoPlayer.mute; 
export const selectVolume = (state: RootState) => state.videoPlayer.volume;
export const selectSelectedTrack = (state: RootState) => state.videoPlayer.selectedTrack;  
export const selectShowQualityMenu = (state: RootState) => state.videoPlayer.showQualityMenu;  
export const selectIsBuffering = (state: RootState) => state.videoPlayer.isBuffering;  
export const selectAutoResolution = (state: RootState) => state.videoPlayer.autoResolution;  
export const selectInitialized = (state: RootState) => state.videoPlayer.initialized; 
export const selectSettingIsOpen = (state: RootState) => state.videoPlayer.settingIsOpen; 
export const selectIsMobileMode = (state: RootState) => state.videoPlayer.isMobileMode; 
export const selectIsVolumeSliderActive = (state: RootState) => state.videoPlayer.isVolumeSliderActive;
export const selectIsDisplayCaptions = (state: RootState) => state.videoPlayer.isDisplayCaptions; 
export const selectCaptionsLanguage = (state: RootState) => state.videoPlayer.captionsLanguage; 
export const selectVideoSpeed = (state: RootState) => state.videoPlayer.speed;
export const selectVolumeLeftPosition = (state: RootState) => state.videoPlayer.volumeSliderLeftPosition;

export const {
    setPlaying,
    setLoaded,
    setIsSupported,
    setBuffer, 
    setVariantTracks, 
    setParsedTime,
    setProgressValue,
    unloadAll,
    setFullScreen,
    setMute,
    setVolume,
    setSelectedTrack,
    setShowQualityMenu,
    setIsBuffering,
    setAutoResolution,
    setInitialized,
    setVideoDuration,
    setSettingIsOpen,
    setIsMobileMode,
    setIsVolumeSliderActive,
    setIsDisplayCaptions,
    setCaptionsLanguage,
    setVideoSpeed,
    setVolumeLeftPosition
} = videoPlayerSlice.actions


export default videoPlayerSlice.reducer;