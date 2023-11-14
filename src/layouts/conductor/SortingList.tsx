import "./sortingList.scss";
import {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { SortableList } from "../../components/sortableList/SortableList";
import { Schedule } from "../../types/ScheduleTypes";
import Typography from "@mui/material/Typography";
import { FileUploadItem } from "../../types/FileTypes";
import {
  MdOutlineAudioFile,
  MdOutlineDeleteOutline,
  MdOutlineVideoFile,
  MdOutlineImage,
  MdOutlineInsertDriveFile,
} from "react-icons/md";
import { BASE_API_URL } from "../../network/Constants";

export function createRange<T>(
  length: number,
  initializer: (index: number) => T
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}

// function getMockItems() {
//   return createRange(50, (index) => ({ id: index + 1 }));
// }

type SortingListProps = {
  listData: FileUploadItem[];
  onRemove: (_id: string) => void;
};

export type WithOrderId = FileUploadItem & { id: number | string };
export type SortListMethods = {
  getOrderedList: () => WithOrderId[];
};
const initialList: WithOrderId[] = [];

export const SortingList = forwardRef<SortListMethods, SortingListProps>(
  ({ listData, onRemove }, ref) => {
    const [items, setItems] = useState<WithOrderId[]>(initialList);

    useEffect(() => {
      const tempArray = listData.map((item, index) =>
        Object.assign(item, { id: index + 1 })
      );

      setItems(tempArray);
    }, [listData.length]);

    useImperativeHandle(ref, () => ({
      getOrderedList: () => items,
    }));

    const convertSecondToHumanReadable = (seconds: number = 0) => {
      let result: string;

      const minute = Math.floor(seconds / 60);
      result = `${minute < 10 ? "0" + minute : minute}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;

      return result;
    };

    const getFileIcon = (type: string, path: string) => {
      // const prefixUrl = 'http://localhost:3000/'
      // const url = prefixUrl+path.replace('files\\', 'files/');
      switch (type) {
        case "video":
          return <MdOutlineVideoFile fontSize={"large"} fontSizeAdjust={40} />;
        case "audio":
          return <MdOutlineAudioFile fontSize={"large"} fontSizeAdjust={40} />;
        case "image":
          // return <img src={url} alt="thumbnail" className="img" />
          return <MdOutlineImage fontSize={"large"} fontSizeAdjust={140} />;
        default:
          return (
            <MdOutlineInsertDriveFile
              fontSize={"large"}
              fontSizeAdjust={40}
            />
          );
      }
    };

    return (
      <div className="sortingList">
        <SortableList
          items={items}
          onChange={setItems}
          renderItem={(item) => (
            <SortableList.Item id={item.id!}>
              <div className="item">
                <div className="part id">{item.id}</div>
                <div className="part thumbnail">
                  <div className="thumbnail">
                    {getFileIcon(item.type, item.path)}
                    {/* <img src="" alt="thumbnail" className="img" /> */}
                  </div>
                </div>
                <div className="part">
                  <Typography>
                    <a href={encodeURI(BASE_API_URL + "files/download/stream/" + item.name.replace('files:/', ''))} target="_blank" rel="noreferrer">
                      {item.originalName}
                    </a>
                  </Typography>
                </div>
                {/* <div className="part">
                  <Typography>
                    {convertSecondToHumanReadable(item.onScreenDuration!)}
                  </Typography>
                </div> */}
              </div>
              <div className="part delete" onClick={() => onRemove(item._id)}>
                <MdOutlineDeleteOutline />
              </div>
              <SortableList.DragHandle iconWidth={18} />
            </SortableList.Item>
          )}
        />
      </div>
    );
  }
);
