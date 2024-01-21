import { FC, useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";

type MusicPlayerType = {
  uri: string;
  resetKey: string;
  onEnd: () => void;
};

export const MusicPlayer: FC<MusicPlayerType> = ({ uri, resetKey, onEnd }) => {
  //   const [isPlaying, togglePlay] = useAudio(uri);
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    ref.current?.pause();
    ref.current?.load();
    ref.current?.play();
  }, [resetKey]);

  return (
    <div style={{ display: 'flex', flex: 1, height: '100%', alignItems: 'center' }}>
      {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton aria-label="delete">
              {isPlaying ? <PauseCircle /> : <PlayArrow />}
            </IconButton>
          </div> */}
      <audio controls autoPlay={true} onEnded={onEnd} ref={ref}>
        <source src={uri} type="audio/mp3" />
        Sorry, your browser doesn't support audio.
      </audio>
    </div>
  );
};

export const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);

  useEffect(
    () => {
      playing ? audio.play() : audio.pause();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playing]
  );

  //   useEffect(() => {
  //     audio.load();
  //     audio.addEventListener("load", () => {
  //       setPlaying(true);
  //       audio.play();
  //     });
  //   }, []);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [playing, toggle];
};
