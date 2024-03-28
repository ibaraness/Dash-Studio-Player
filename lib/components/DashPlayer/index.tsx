import ActualDashPlayer from './ActualDashPlayer';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import './../../index.css';

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

