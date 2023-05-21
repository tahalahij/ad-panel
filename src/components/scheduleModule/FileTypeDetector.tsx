import { FC } from "react";
import { ScreenItem } from "./types/ScreenItem";
import {
  ImageViewer,
  MusicPlayer,
  ScheduledComponent,
  VideoPlayer,
} from "./index";
import { BASE_API_URL } from "../../network/Constants";
import { getToken } from "../../network/NetworkHandler";

type FileTypeDetectorProps = {
  onEnd: () => void;
} & ScreenItem;

export const FileTypeDetector: FC<FileTypeDetectorProps> = ({
  path,
  name,
  _id,
  type,
  delay,
  resetKey,
  onEnd,
  animationName,
}) => {
  //@ts-ignore
  const _fileType: "image" | "video" | "audio" = type!;
  const uri = encodeURI(BASE_API_URL + "files/admin/download/stream/" + name + '?auth_token=' + getToken());

  if (_fileType === "image") {
    return (
      <ScheduledComponent duration={delay!} resetKey={resetKey!} onEnd={onEnd}>
        <ImageViewer uri={uri} animation={animationName ?? 'none'}/>
      </ScheduledComponent>
    );
  }

  if (_fileType === "audio") {
    return <MusicPlayer resetKey={resetKey!} uri={uri} onEnd={onEnd} />;
  }

  if (_fileType === "video") {
    return <VideoPlayer resetKey={resetKey!} uri={uri} onEnd={onEnd} />;
  }

  return null;
};
