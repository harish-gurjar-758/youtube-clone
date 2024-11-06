import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { useParams, Link } from 'react-router-dom';

export default function VideoDetails() {
    const { videoId } = useParams(); // Get the video ID from the URL parameters
    const [videoDetails, setVideoDetails] = useState(null);
    const [similarVideos, setSimilarVideos] = useState([]); // State for similar videos

    const API_KEY = `AIzaSyDCutpPZtubntx_26yLFggCvvt_-TtNGgw`; // Replace with your actual API key

    useEffect(() => {
        // Fetch details for the current video
        const fetchVideoDetails = async () => {
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;

            try {
                const response = await axios.get(url);
                setVideoDetails(response.data.items[0]); // Set the video details
            } catch (error) {
                console.error("Error fetching video details:", error);
            }
        };

        // Fetch similar videos based on the current video ID
        const fetchSimilarVideos = async () => {
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=20&key=${API_KEY}`;


            try {
                const response = await axios.get(url);
                setSimilarVideos(response.data.items); // Set similar videos
            } catch (error) {
                console.error("Error fetching similar videos:", error);
            }
        };

        fetchVideoDetails();
        fetchSimilarVideos();
    }, [videoId]);

    if (!videoDetails) {
        return <p>Loading video details...</p>;
    }

    const videoOptions = {
        height: '500',
        width: '100%',
        playerVars: {
            autoplay: 1, // Autoplay the video
        },
    };

    return (
        <div className='VideoDetails'>
            <div className='main-video'>
                <YouTube videoId={videoId} opts={videoOptions} />
                <div>
                    <h1>{videoDetails.snippet.title}</h1>
                    <p>Views: {videoDetails.statistics.viewCount}</p>
                    <p>Likes: {videoDetails.statistics.likeCount}</p>
                </div>
                <div>
                    <p>{videoDetails.snippet.description}</p>
                </div>
            </div>

            {/* Display similar videos */}
            <div className='similar-videos'>
                <h2>Similar Videos</h2>
                <div className='similar-videos-group'>
                    {similarVideos.length > 0 ? (
                        similarVideos.map((video) => {
                            // Truncate the video title if it's too long
                            const titleWords = video.snippet.title.split(" ");
                            const truncatedTitle = titleWords.slice(0, 10).join(" ") + (titleWords.length > 10 ? "..." : "");

                            return (
                                <Link
                                    to={`/video-details/${video.id}`} // Use video.id directly
                                    key={video.id}
                                    className='react-link'
                                >
                                    <div className='video-card'>
                                        <img
                                            src={video.snippet.thumbnails.high.url}
                                            alt="Thumbnail"
                                        />
                                        <div className='details-container'>
                                            <h5>{truncatedTitle}</h5>
                                            <div className='details'>
                                                <p><span>Views:</span> {videoDetails.statistics.viewCount}</p>
                                                <p><span>Likes:</span> {videoDetails.statistics.likeCount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <p>Loading similar videos...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
