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
    const [sessionDuration, setSessionDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)
    const [sessionDurationIntervalId, setSessionDurationIntervalId] = useState(null);
    const [wholeSession, setWholeSession] = useState(0);

    const handlePlay = () => {
        setIsPlaying(true);
        console.log(isPlaying)
        // Capture the time when the video starts or resumes playing
        const currentTime = videoRef.current.currentTime;
        setStartedFrom(currentTime);

        setLastPlayedAt(currentTime);
        console.log(`Started/resumed at: ${currentTime} seconds`);

        // Start counting played seconds when playback starts
            const playedSecondsInterval = setInterval(() => {
                setPlayedSeconds(prev => prev + (isPlaying ? 1 : 0)); // Increment playedSeconds only if playing
            }, 1000);

        // Start counting session duration
        if (sessionDurationIntervalId == null) {
            setSessionDurationIntervalId(setInterval(() => {
                setSessionDuration(prev =>  prev +  1 ); // Increment sessionDuration only if playing
            }, 1000))
        }
    };

    useEffect(()=> {
        console.log(sessionDurationIntervalId)
        const handleClearInterval = () => {
            clearInterval(sessionDurationIntervalId);
        }
        handleClearInterval()
    },[sessionDurationIntervalId])

    useEffect(() => {
        const gettingSessionDuration = () => {
            const newSessionDuration = videoRef.current?.currentTime - startedFrom;
            setWholeSession(prev => prev + newSessionDuration)
            console.log(`Session duration: ${newSessionDuration} seconds`); // Log the updated duration
        };
        gettingSessionDuration();
    }, [videoRef.current?.currentTime, startedFrom, sessionDuration]);
    console.log(`whole duration: ${wholeSession} seconds`); // Log the updated duration

    const handlePause = () => {
        setSessionDurationIntervalId(sessionDurationIntervalId)
        // Count the pause
        setPauseCount(prevCount => prevCount + 1);
        setIsPlaying(false);

        // Log the time of the pause and calculate how long it was played continuously
        const pausedAt = videoRef.current.currentTime;
        const minutes = Math.floor(pausedAt / 60);
        const seconds = Math.floor(pausedAt % 60);
        console.log(`Paused at: ${minutes} minute(s) and ${seconds} second(s)`);


        // Calculate session duration (from play to pause)
        const sessionDuration = videoRef.current?.currentTime - startedFrom;
        setSessionDuration(sessionDuration)


        // Reset session duration for the next session

        setPlaySessions(prevSessions => [...prevSessions, sessionDuration]);

        // Log the total seconds played up until now
        console.log(`Total seconds played so far: ${playedSeconds}`);
    };

    const handleSeek = () => {
        // Calculate and store the session before the seek
        const sessionDuration = videoRef.current.currentTime - startedFrom;
        if (isPlaying) {
            setPlaySessions(prevSessions => [...prevSessions, sessionDuration]);
            setWholeSession(prev => prev + sessionDuration);
        }

        // Reset the starting point after the seek
        setStartedFrom(videoRef.current.currentTime);
        console.log(`Seeked to: ${videoRef.current.currentTime} seconds`);
    };

    const handleTimeUpdate = () => {
        // This triggers on every timeupdate event (each second, approx.)
        console.log(`Video is currently at: ${videoRef.current?.currentTime} seconds`);
    };

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

        // const videoElement = videoRef.current;

        // Attach the event listeners
        if (isPlaying === false) {
            setIsPlaying(true);
            videoRef.current.addEventListener('play', handlePlay);
        }
        videoRef.current.addEventListener('seeking', handleSeek); // Detect seeking
        videoRef.current.addEventListener('seeked', handlePlay); // Restart session tracking after seeking
        videoRef.current.addEventListener('pause', handlePause);
        // videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

        // Clean up event listeners when the component unmounts
        return () => {
            videoRef.current?.removeEventListener('play', handlePlay);
            videoRef.current?.removeEventListener('pause', handlePause);
            // videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
            videoRef.current?.removeEventListener('seeking', handleSeek);
            videoRef.current?.removeEventListener('seeked', handlePlay);
        };
    }, [src]);


    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.returnValue = 'Are you sure you want to leave the page?';
            if (wholeSession !== 0) {
                console.log("Whole Session:", wholeSession)
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        console.log("Whole Session:",wholeSession)

        return () => {
            window.removeEventListener('beforeunload',
                handleBeforeUnload);
        };
    }, [wholeSession]);

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
