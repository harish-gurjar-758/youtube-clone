import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [videoData, setVideoData] = useState([]);

    const API_KEY = `AIzaSyDCutpPZtubntx_26yLFggCvvt_-TtNGgw`;
    const TARGET_VIDEO_COUNT = 1000; // Desired total videos to fetch

    const fetchVideos = async (pageToken = '', videos = []) => {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&key=${API_KEY}&pageToken=${pageToken}`;

        try {
            const response = await axios.get(url);
            const newVideos = videos.concat(response.data.items);

            if (response.data.nextPageToken && newVideos.length < TARGET_VIDEO_COUNT) {
                fetchVideos(response.data.nextPageToken, newVideos);
            } else {
                setVideoData(newVideos);
            }
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className='Home'>
            <div className="video-card-groups">
                {videoData.length > 0 ? (
                    videoData.map((video) => {
                        // Split the title into an array of words and join the first 7 words
                        const titleWords = video.snippet.title.split(" ");
                        const truncatedTitle = titleWords.slice(0, 10).join(" ") + (titleWords.length > 7 ? "..." : "");

                        return (
                            <Link
                                to={`/video-details/${video.id}`}
                                key={video.id}
                                className='react-link'
                            >
                                <div className='video-card'>
                                    <img
                                        src={
                                            video.snippet.thumbnails.maxres
                                                ? video.snippet.thumbnails.maxres.url
                                                : video.snippet.thumbnails.high.url
                                        }
                                        alt="Thumbnail"
                                    />
                                    <h5>{truncatedTitle}</h5>
                                </div>
                            </Link>

                        );
                    })
                ) : (
                    <p>Loading videos...</p>
                )}
            </div>
        </div>
    );
}
