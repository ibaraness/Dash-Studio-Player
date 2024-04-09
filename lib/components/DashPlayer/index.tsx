import ActualDashPlayer from './ActualDashPlayer';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import '../../modern-normalize.css'
import './index.css';

export interface DashPlayerProps {
    mpdUrl?: string;
    videoItem?: DashVideoItem;

    // Should the captions be displayed by default. If language is not found, then the first track will be displayed
    displayCaptions?: boolean;

    // Default subtitles language. defalt is english ('en')
    captionLanguage?: string;
}
export const DashPlayer = ({ mpdUrl, videoItem, displayCaptions, captionLanguage ='en' }: DashPlayerProps) => {
    return (
        <Provider store={store}>
            <ActualDashPlayer 
            mpdSrc={mpdUrl || videoItem?.src || ''} 
            captions={videoItem?.captions || []}
            displayCaptions={displayCaptions}
            captionLanguage={captionLanguage}
            ></ActualDashPlayer>
        </Provider>
    )
}

export class DashPlayerCaption {
    // SRT source URL
    src: string = '';

    // Subtitle language
    language: string = 'en';

    // Subtitle label
    label: string = '';

    // SRT or other  mimetype
    mimeType: string = "text/srt"

    // Select between captions and subtitles
    kind: "captions" | "subtitle" = "captions";
}



export interface DashVideoItem {
    // Video ID
    id: string;

    // MPD source URL
    src: string;

    captions: DashPlayerCaption[];

    // Video Title
    title: string;
}
