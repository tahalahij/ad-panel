import { useRouteError } from "react-router-dom";
import Typography from "@mui/material/Typography";

export function PageNotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Typography variant="h1">خطا!</Typography>
      <Typography variant="body1">
        با عرض پوزش، صفحه مورد نظر یافت نشد!
      </Typography>
      <Typography variant="subtitle1">
        {/* @ts-ignore */}
        <i>{error?.statusText || error?.message}</i>
      </Typography>
    </div>
  );
}
