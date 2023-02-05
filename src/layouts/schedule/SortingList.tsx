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
  listData: Schedule[];
};

type WithOrderId = Schedule & { id: number | string };
export type SortListMethods = {
  getOrderedList: () => WithOrderId[];
};
const initialList: WithOrderId[] = [];

export const SortingList = forwardRef<SortListMethods, SortingListProps>(
  ({ listData }, ref) => {
    const [items, setItems] = useState<WithOrderId[]>(initialList);

    useEffect(() => {
      const tempArray = listData.map((item, index) =>
        Object.assign(item, { id: index + 1 })
      );

      setItems(tempArray);
    }, []);

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

    return (
      <div className="sortingList">
        <SortableList
          items={items}
          onChange={setItems}
          renderItem={(item) => (
            <SortableList.Item id={item.id!}>
              <div className="item">
                <div className="part id">{item.id}</div>
                <div className="part">
                  <div className="thumbnail">
                    <img src="" alt="thumbnail" className="img" />
                  </div>
                </div>
                <div className="part">
                  <Typography>{item.title}</Typography>
                </div>
                <div className="part">
                  <Typography>
                    {convertSecondToHumanReadable(item.onScreenDuration!)}
                  </Typography>
                </div>
              </div>

              <SortableList.DragHandle iconWidth={18} />
            </SortableList.Item>
          )}
        />
      </div>
    );
  }
);
