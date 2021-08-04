const initState = {
    videos: [],
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case 'FETCH_VIDEOS':
            return { ...state, videos: [...state.videos, action.items] };
        default:
            return state;
    }
}
