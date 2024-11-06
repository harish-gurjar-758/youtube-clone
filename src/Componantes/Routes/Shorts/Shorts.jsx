import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";

export default function Shorts() {
    const [shortVideo, setShortVideo] = useState([]);
    const API_KEY = `AIzaSyDCutpPZtubntx_26yLFggCvvt_-TtNGgw`;

    const TARGET_VIDEO_COUNT = 100;

    const fetchVideos = async (pageToken = '', videos = []) => {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=IN&videoDuration=short&pageToken=${pageToken}&key=${API_KEY}`;


        try {
            const response = await axios.get(url);
            const newShorts = videos.concat(response.data.items);

            if (response.data.nextPageToken && newShorts.length < TARGET_VIDEO_COUNT) {
                fetchVideos(response.data.nextPageToken, newShorts);
            } else {
                setShortVideo(newShorts);
            }
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    // Helper function to format numbers
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };

    return (
        <div className='Shorts'>
            <div className='shorts-container'>
                {shortVideo.length > 0 ? (
                    shortVideo.map((short) => {
                        const { id, snippet, statistics } = short;
                        const channelUrl = `https://www.youtube.com/channel/${snippet.channelId}`;

                        return (
                            <div key={id} className="short-video">
                                <div className="video-container">
                                    <YouTube videoId={id} className='short-video' />
                                    <div className="video-details">
                                        <div className="channel-info">
                                            <a href={channelUrl} target="_blank" rel="noopener noreferrer">
                                                <p>{snippet.channelTitle}</p>
                                                <img
                                                    src={snippet.thumbnails.default.url}
                                                    alt={`${snippet.channelTitle} Channel Avatar`}
                                                    style={{ borderRadius: '50%' }}
                                                />
                                            </a>
                                        </div>
                                        <h3>{snippet.title}</h3>
                                    </div>
                                </div>
                                <div className="video-stats">
                                    <div className="stat">
                                        <AiOutlineLike />
                                        <p>{formatNumber(statistics.likeCount)}</p>
                                    </div>
                                    <div className="stat">
                                        <AiOutlineDislike />
                                        <p>Dislike</p> {/* Dislike count is no longer available via YouTube API */}
                                    </div>
                                    <div className="stat">
                                        <AiOutlineComment />
                                        <p>{formatNumber(statistics.commentCount)}</p>
                                    </div>
                                    <div className="stat">
                                        <AiOutlineShareAlt />
                                        <p>Share</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading Shorts...</p>
                )}
            </div>
        </div>
    );
}
