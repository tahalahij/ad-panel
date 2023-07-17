import "./currentPlaying.scss";
import { FC, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment-jalaali";
import { digitsEnToFa } from "@persian-tools/persian-tools";

import { useDeviceData } from "../useDeviceData";
import {
  getDeviceCurrentScheduleByAdminRequest,
  getDeviceCurrentScheduleByOperatorRequest,
} from "../../../network/requests";
import { FileTypeDetector } from "../../../components";
import { FileUploadItem } from "../../../types/FileTypes";
import { Schedule, ScheduleTypeEnum } from "../../../types/ScheduleTypes";
import { getReadableDay } from "../../../utils/Utils";
import { useAuthenticationState } from "../../../context";

type CurrentPlayingProps = {};

export const CurrentPlaying: FC<CurrentPlayingProps> = () => {
  const { list, loading } = useDeviceData();
  const auth = useAuthenticationState();

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentItem, setCurrentItem] = useState<{
    file: FileUploadItem;
    schedule: Schedule;
  }>();

  const onDeviceChange = (event: SelectChangeEvent<number>) => {
    const {
      target: { value },
    } = event;
    setCurrentIndex(Number(value));
  };

  const fetchData = async () => {
    const getCurrentScheduleRequest =
      auth.role === "OPERATOR"
        ? getDeviceCurrentScheduleByOperatorRequest
        : getDeviceCurrentScheduleByAdminRequest;

    getCurrentScheduleRequest(list[currentIndex]._id)
      .then((res) => {
        if (res.success)
          setCurrentItem({
            schedule: res.payload?.schedule!,
            file: {
              ...res.payload?.file!,
              resetKey: Date.now().toString(),
            },
          });
      })
      .catch(console.log);
  };

  const onEnd = (id?: string) => {
    fetchData();
  };

  useEffect(() => {
    if (currentIndex > -1 && list?.length > 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className="currentPlaying">
      <div className="header">
        <Typography variant="h6">{"برنامه در حال پخش"}</Typography>
      </div>
      {loading ? <CircularProgress /> : null}

      <div className="bottom">
        <FormControl sx={{ width: "40ch" }}>
          <InputLabel id="demo-simple-select-label">دستگاه</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="type"
            name="type"
            value={currentIndex}
            label="دستگاه"
            onChange={onDeviceChange}
          >
            {list?.map((item, index) => (
              <MenuItem key={item.ip} value={index}>
                {item.name + " " + item.ip}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {currentItem?.file && currentItem.schedule && (
          <>
            <div className="scheduleDetails">
              <div className="tableDetails">
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    borderWidth: "0px 0px 1px 0px",
                    borderColor: "rgba(0, 0, 0, 0.87)",
                    // borderRadius: "4px",
                    borderStyle: "solid",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderLeftWidth: "1px",
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      borderRightWidth: 0,
                      width: "30%",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingRight: "6px",
                      borderStyle: "solid",
                      borderLeftColor: "rgba(0, 0, 0, 0.87)",
                    }}
                  >
                    نام فایل
                  </div>
                  <div className="divider"></div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "4px",
                      flex: 1,
                    }}
                  >
                    {"‏" + currentItem.file.name + "‏"}
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    borderWidth: "0px 0px 1px 0px",
                    borderColor: "rgba(0, 0, 0, 0.87)",
                    // borderRadius: "4px",
                    borderStyle: "solid",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderLeftWidth: "1px",
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      borderRightWidth: 0,
                      width: "30%",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingRight: "6px",
                      borderStyle: "solid",
                      borderLeftColor: "rgba(0, 0, 0, 0.87)",
                    }}
                  >
                    نام دستگاه
                  </div>
                  <div className="divider"></div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "4px",
                      flex: 1,
                    }}
                  >
                    {"‏" +
                      list[currentIndex].name +
                      " " +
                      list[currentIndex].ip +
                      "‏"}
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    borderWidth: "0px 0px 1px 0px",
                    borderColor: "rgba(0, 0, 0, 0.87)",
                    // borderRadius: "4px",
                    borderStyle: "solid",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderLeftWidth: "1px",
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      borderRightWidth: 0,
                      width: "30%",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingRight: "6px",
                      borderStyle: "solid",
                      borderLeftColor: "rgba(0, 0, 0, 0.87)",
                    }}
                  >
                    برنامه
                  </div>
                  <div className="divider"></div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "4px",
                      flex: 1,
                    }}
                  >
                    {"‏" + currentItem.schedule.name + "‏"}
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    borderWidth: "0px 0px 1px 0px",
                    borderColor: "rgba(0, 0, 0, 0.87)",
                    // borderRadius: "4px",
                    borderStyle: "solid",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderLeftWidth: "1px",
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      borderRightWidth: 0,
                      width: "30%",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingRight: "6px",
                      borderStyle: "solid",
                      borderLeftColor: "rgba(0, 0, 0, 0.87)",
                    }}
                  >
                    نوع برنامه
                  </div>
                  <div className="divider"></div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "4px",
                      flex: 1,
                    }}
                  >
                    {"‏" +
                      (currentItem.schedule.type === ScheduleTypeEnum.ONE_TIME
                        ? "یکبار پخش"
                        : "دوره ای") +
                      "‏"}
                  </div>
                </div>
                {currentItem.schedule.day &&
                  currentItem.schedule.day.length > 0 && (
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "row",
                        borderWidth: "0px 0px 1px 0px",
                        borderColor: "rgba(0, 0, 0, 0.87)",
                        // borderRadius: "4px",
                        borderStyle: "solid",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderLeftWidth: "1px",
                          borderTopWidth: 0,
                          borderBottomWidth: 0,
                          borderRightWidth: 0,
                          width: "30%",
                          paddingTop: "4px",
                          paddingBottom: "4px",
                          paddingRight: "6px",
                          borderStyle: "solid",
                          borderLeftColor: "rgba(0, 0, 0, 0.87)",
                        }}
                      >
                        روز های پخش
                      </div>
                      <div className="divider"></div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",

                          flex: 1,
                        }}
                      >
                        {"‏" +
                          [
                            currentItem.schedule.day?.map((d) =>
                              getReadableDay(d)
                            ),
                          ].join(" ,") +
                          "‏"}
                      </div>
                    </div>
                  )}
                {currentItem.schedule.from && (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "row",
                      borderWidth: "0px 0px 1px 0px",
                      borderColor: "rgba(0, 0, 0, 0.87)",
                      // borderRadius: "4px",
                      borderStyle: "solid",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderLeftWidth: "1px",
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        borderRightWidth: 0,
                        width: "30%",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        paddingRight: "6px",
                        borderStyle: "solid",
                        borderLeftColor: "rgba(0, 0, 0, 0.87)",
                      }}
                    >
                      زمان شروع
                    </div>
                    <div className="divider"></div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",

                        flex: 1,
                      }}
                    >
                      {"‏" +
                        digitsEnToFa(
                          moment(currentItem.schedule.start).format(
                            "jYYYY-jMM-jDD"
                          ) +
                            " " +
                            moment(currentItem.schedule.from).format("HH:mm")
                        ) +
                        "‏"}
                    </div>
                  </div>
                )}
                {currentItem.schedule.from && (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "row",
                      borderWidth: "0px 0px 1px 0px",
                      borderColor: "rgba(0, 0, 0, 0.87)",
                      // borderRadius: "4px",
                      borderStyle: "solid",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderLeftWidth: "1px",
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        borderRightWidth: 0,
                        width: "30%",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        paddingRight: "6px",
                        borderStyle: "solid",
                        borderLeftColor: "rgba(0, 0, 0, 0.87)",
                      }}
                    >
                      زمان پایان
                    </div>
                    <div className="divider"></div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",

                        flex: 1,
                      }}
                    >
                      {"‏" +
                        digitsEnToFa(
                          moment(currentItem.schedule.end).format(
                            "jYYYY-jMM-jDD"
                          ) +
                            " " +
                            moment(currentItem.schedule.to).format("HH:mm")
                        ) +
                        "‏"}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mediaPlayer">
              <FileTypeDetector onEnd={onEnd} {...currentItem?.file} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
