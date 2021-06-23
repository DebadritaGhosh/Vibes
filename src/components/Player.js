import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { playAudio } from '../util';

const Player = ({ setSongs, setCurrentSong, audioRef, currentSong, setIsPlaying, isPlaying, setSongInfo, songInfo, songs }) => {
    //Use Effect
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return {
                    ...song,
                    active: true,
                };
            }
            else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
    }, [currentSong]);

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    }
    const getTime = time => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
    const skipTrackHandler = (direction) => {

        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === "skip-forward") {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);

        }
        if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                playAudio(isPlaying, audioRef);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        playAudio(isPlaying, audioRef);
    }
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        onChange={dragHandler}
                        value={songInfo.currentTime}
                        type="range" />
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    size="2x"
                    color="#E03B8B"
                    icon={faAngleLeft}
                    onClick={() => skipTrackHandler('skip-back')}

                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    color="#E03B8B"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                    color="#E03B8B"
                    onClick={() => skipTrackHandler('skip-forward')}
                />
            </div>
        </div>
    )
}

export default Player;