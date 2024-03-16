import { configureStore } from '@reduxjs/toolkit';
import videoPlayerSlice from '../features/videoPlayer/videoPlayerSlice';
import { VideoPlayState } from '../components/DashPlayer/store/state';

export const store = configureStore<{videoPlayer: VideoPlayState}>({
    reducer: {
        videoPlayer: videoPlayerSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;