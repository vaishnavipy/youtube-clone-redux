export default function fetchUserSearch(searchInput) {
    return (dispatch) => {
        fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput}&key=${process.env.REACT_APP_API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: 'FETCH_USER_SEARCH',
                    searchVideoArr: data.items,
                });
                data.items.forEach((videoObj) => {
                    fetch(
                        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${videoObj.snippet.channelId}&key=${process.env.REACT_APP_API_KEY}`
                    )
                        .then((response) => response.json())
                        .then((channelData) => {
                            dispatch({
                                type: 'FETCH_CHANNELS',
                                channelArr: channelData.items,
                            });
                        });
                    fetch(
                        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoObj.id.videoId}&key=${process.env.REACT_APP_API_KEY}`
                    )
                        .then((response) => response.json())
                        .then((statistics) => {
                            dispatch({
                                type: 'FETCH_STATISTICS',
                                statistics: statistics.items,
                            });
                        });
                });
            });
    };
}
