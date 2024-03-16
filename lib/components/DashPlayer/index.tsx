import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ActualDashPlayer from './ActualDashPlayer';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

export interface DashPlayerProps {
    mpdUrl: string;
}
export const DashPlayer = ({ mpdUrl }: DashPlayerProps) => {

    return (
        <Provider store={store}>
            <ActualDashPlayer mpdSrc={mpdUrl}></ActualDashPlayer>
        </Provider>
    )
}

