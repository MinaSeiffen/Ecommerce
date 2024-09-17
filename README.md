import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

function HlsLive() {
    const videoRef = useRef(null);
    const src = 'https://vz-28ab794b-7bb.b-cdn.net/f36ee17c-8020-4793-b5b4-b14c96695e96/playlist.m3u8';
    const [playedSeconds, setPlayedSeconds] = useState(0); // Tracks total seconds played
    const [pauseCount, setPauseCount] = useState(0); // Tracks number of pauses
    const [lastPlayedAt, setLastPlayedAt] = useState(0); // Tracks when the video resumed playing
    const [playSessions, setPlaySessions] = useState([]); // Stores each play session duration
    const [startedFrom,setStartedFrom] = useState(null);

    useEffect(() => {
        let interval = null;

        // Initialize HLS.js if supported
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play();
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
            videoRef.current.addEventListener('loadedmetadata', () => {
                videoRef.current.play();
            });
        }

        const handlePlay = () => {
            // Capture when the video starts or resumes playing
            setLastPlayedAt(videoRef.current.currentTime);
            setStartedFrom(videoRef.current.currentTime);
            console.log(`Started/resumed at: ${videoRef.current.currentTime} seconds`);

            // Start counting played seconds at 1-second intervals
            setInterval(() => {
                setPlayedSeconds(prev => prev + 1);
            }, 1000);
        };

        const handlePause = () => {
            // Count the pause
            setPauseCount(prevCount => prevCount + 1);

            // Log the time of the pause and calculate how long it was played continuously
            const pausedAt = videoRef.current.currentTime;
            const minutes = Math.floor(pausedAt / 60);
            const seconds = Math.floor(pausedAt % 60);
            console.log(`Paused at: ${minutes} minute(s) and ${seconds} second(s)`);

            // Calculate session duration (from play to pause)
            const sessionDuration = videoRef.current.currentTime - startedFrom;
            setPlaySessions(prevSessions => [...prevSessions, sessionDuration]);
            console.log("started at",startedFrom)
            console.log(`Session duration: ${sessionDuration} seconds`);

            // Log the total seconds played up until now
            console.log(`Total seconds played so far: ${playedSeconds}`);
        };

        const handleTimeUpdate = () => {
            // This triggers on every timeupdate event (each second, approx.)
            console.log(`Video is currently at: ${videoRef.current.currentTime} seconds`);
        };

        // const videoElement = videoRef.current;

        // Attach the event listeners
        videoRef.current.addEventListener('play', handlePlay);
        videoRef.current.addEventListener('pause', handlePause);
        videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

        // Clean up event listeners when the component unmounts
        return () => {
            if (interval) {
                clearInterval(interval);
            }
            videoRef.current.removeEventListener('play', handlePlay);
            videoRef.current.removeEventListener('pause', handlePause);
            videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [src]);

    useEffect(() => {
        setPlayedSeconds(videoRef.current.currentTime);
    }, [playedSeconds]);

    return (
        <div>
            <video ref={videoRef} controls style={{ width: '100%', height: 'auto' }}>
                Your browser does not support HTML5 video.
            </video>
            <p>Total seconds played: {playedSeconds}</p>
            <p>Number of pauses: {pauseCount}</p>
            <p>Play sessions (seconds per session): {playSessions.join(', ')}</p>
        </div>
    );
}

export default HlsLive;
