import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from "@material-ui/core";

const VideoDetail = ({
  video: {
    id: { videoId },
    snippet: { title, channelTitle, description }
  }
}) => {
  const [randomVideos, setRandomVideos] = useState([]);

  useEffect(() => {
    // Fetch three random videos from YouTube API
    const fetchRandomVideos = async () => {
      try {
        const response1 = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=ElZfdU54Cp8&key=AIzaSyAlQg7NeWOj9OKWDXrFdC2Fg_w4L7RQ0Jg`
        );
        const response2 = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=JSwT3vWazFo&key=AIzaSyAlQg7NeWOj9OKWDXrFdC2Fg_w4L7RQ0Jg`
        );
        const response3 = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=Q9A4iiKwhNI&key=AIzaSyAlQg7NeWOj9OKWDXrFdC2Fg_w4L7RQ0Jg`
        );

        if (response1.ok && response2.ok && response3.ok) {
          const data1 = await response1.json();
          const data2 = await response2.json();
          const data3 = await response3.json();

          setRandomVideos([...data1.items, ...data2.items, ...data3.items]);
        } else {
          throw new Error("Failed to fetch random videos");
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Call the function to fetch random videos
    fetchRandomVideos();
  }, []);

  if (!videoId && randomVideos.length === 0) {
    return <div>Loading...</div>;
  }

  const videosToDisplay = videoId
    ? [{ id: videoId, snippet: { title, channelTitle, description } }]
    : randomVideos;

  return (
    <Grid container spacing={4}>
      {videosToDisplay.map((video) => (
        <Grid item lg={10} key={video.id}>
          <Card>
            <CardMedia
              component="iframe"
              title="Video Player"
              src={`https://www.youtube.com/embed/${video.id}`}
              height="300"
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                {video.snippet.title}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {video.snippet.channelTitle}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoDetail;
