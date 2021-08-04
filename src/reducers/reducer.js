const initState = {
    videos: [],
    channelArr: [],
    statisticsArr: [],
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case 'FETCH_VIDEOS':
            return { ...state, videos: [...state.videos, ...action.videoArr] };
        case 'FETCH_CHANNELS':
            return {
                ...state,
                channelArr: [...state.channelArr, ...action.channelArr],
            };
        case 'FETCH_STATISTICS':
            return {
                ...state,
                statisticsArr: [...state.statisticsArr, ...action.statistics],
            };
        default:
            return state;
    }
}
