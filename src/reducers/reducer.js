const initState = {
    videos: [],
    channelArr: [],
    statisticsArr: [],
    openSidebar: false,
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
        case 'OPEN_SIDEBAR':
            return {
                ...state,
                openSidebar: !state.openSidebar,
            };
        default:
            return state;
    }
}
