import "./calendar.scss";
import { FC, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import { DataTable } from "../../../components";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useGetSchedule, useScheduleData } from "../data/useScheduleData";

const events = [{ title: "Meeting", start: new Date() }];

type ScheduleCalendarProps = {};

export const ScheduleCalendar: FC<ScheduleCalendarProps> = () => {
  const navigate = useNavigate();
  const scheduleList = useScheduleData();
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<{
    title: string;
    type?: "success" | "error";
  }>({ title: "" });

  return (
    <div className="schedule">
      <div className="header">
        <Typography variant="h6">{"افزودن برنامه جدید"}</Typography>
      </div>
      {/* <SortingList listData={scheduleList} ref={sortListRef} /> */}
      <>
        {loading ? (
          <CircularProgress />
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={
              {
                // right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }
            }
            locale={"fa"}
            firstDay={6}
            direction="rtl"
            weekends={true}
            events={events}
            eventContent={renderEventContent}
          />
        )}
      </>

      <Snackbar
        open={!!message.title}
        // message={error}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setMessage({ title: "" })}
      >
        <Alert severity={message.type} sx={{ width: "100%" }}>
          {message.title}
        </Alert>
      </Snackbar>
    </div>
  );
};

// a custom render function
function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
