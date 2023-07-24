import React, { useEffect, useState } from "react";

const VideoPlayer = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const address = "1600 Amphitheatre Pkwy, Mountain View, CA 94043";
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`https://aerialview.googleapis.com/v1beta/videos?key=${apiKey}&address=1600%20Amphitheatre%20Pkwy%2C%20Mountain%20View%2C%20CA%2094043`);

        if (!response.ok) {
            console.log('failed here')
          throw new Error("Failed to fetch video");
        }

        const data = await response.json();
        setVideoUrl(data.url);
        
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [apiKey, address]);

  return (
    <div>
      {videoUrl ? (
        <video controls width="640" height="360">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoPlayer;
