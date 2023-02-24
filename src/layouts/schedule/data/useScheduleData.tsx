import { useState } from "react";
import { useFilesState } from "../../../context/file";
import { Schedule } from "../../../types/ScheduleTypes";
import { useFileData } from "../../file/useFileData";

const FAKE_DATA: Array<Schedule> = [
  {
    objectId: "1",
    title: "یک ویدیو",
    fileName: "unknown",
    fileType: "video",
    uri: "https://aspb19.asset.aparat.com/aparat-video/f7853f4961c85408c83289a2bdca2bbb28797532-360p.mp4?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI3ZWFkNjU5MjI1MGVjYzFkODlmOWUwYmI5Y2U1ZTFhIiwiZXhwIjoxNjc0Njc3MjkwLCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.gO1dplFKBleI98lt_H6ED7k29jt0aX4F1rfDf91QGmE",
  },
  {
    objectId: "2",
    title: "یک تصویر",
    fileName: "unknown",
    fileType: "image",
    uri: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
    onScreenDuration: 10,
  },
  {
    objectId: "3",
    title: "یک صدا",
    fileName: "unknown",
    fileType: "music",
    uri: "https://ups.music-fa.com/tagdl/8e401/Mohammad%20Taher%20-%20Golam%20(320).mp3",
  },
];

export const useScheduleData = () => {
  const data = useFilesState();
  useFileData();
  
  return data;
};
