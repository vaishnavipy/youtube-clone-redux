export default function fetchVideos() {
    return (dispatch) => {
        console.log('here');
        fetch(
            'https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyA36P_bRr_9FJbH7iIKV2CJ5laogiQPzLY&maxResults=20&part=snippet'
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.items) {
                    dispatch({ type: 'FETCH_VIDEOS', videoArr: data.items });
                    data.items.forEach((video) => {
                        fetch(
                            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${video.snippet.channelId}&key=AIzaSyA36P_bRr_9FJbH7iIKV2CJ5laogiQPzLY`
                        )
                            .then((response) => response.json())
                            .then((channelData) => {
                                if (channelData.items) {
                                    dispatch({
                                        type: 'FETCH_CHANNELS',
                                        channelArr: channelData.items,
                                    });
                                }
                            });

                        fetch(
                            `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${video.id}&key=AIzaSyA36P_bRr_9FJbH7iIKV2CJ5laogiQPzLY`
                        )
                            .then((response) => response.json())
                            .then((statistics) => {
                                if (statistics.items) {
                                    dispatch({
                                        type: 'FETCH_STATISTICS',
                                        statistics: statistics.items,
                                    });
                                }
                            });
                    });
                }
            });
    };
}
