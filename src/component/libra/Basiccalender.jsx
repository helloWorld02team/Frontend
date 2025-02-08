import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/th";

dayjs.locale("th");

const theme = createTheme({
  typography: {
    fontFamily: '"LINE Seed Sans TH", sans-serif',
  },
});

export default function ThaiDateCalendar() {
  return (
    <div style={{ fontFamily: "LINE Seed Sans TH" }}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
          <DateCalendar
            showDaysOutsideCurrentMonth // ✅ แสดงวันที่ของเดือนที่แล้ว
            sx={{
              fontFamily: '"LINE Seed Sans TH", sans-serif !important',
              "& .MuiPickersCalendarHeader-label": {
                fontSize: "23px",
                fontWeight: "bold",
                color: "#000000",
              },
              "& .MuiPickersDay-today": {
                backgroundColor: "#89BBFE !important",
                fontWeight: "bold",
                border: "none !important",
                borderColor: "#89BBFE",
              },
              "& .MuiPickersArrowSwitcher-root button": {
                backgroundColor: "transparent",
                color: "#000",
                fontWeight: "bold",
                fontSize: "2rem",
                padding: "4px",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: "50%",
                },
              },
              "& .MuiPickersDay-root": {
                fontSize: "1rem",
                fontWeight: "500",
                color: "#000",
                "&.Mui-selected": {
                  backgroundColor: "#e0e0e0",
                  fontWeight: "bold",
                },
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              },
              "& .MuiPickersDay-dayOutsideMonth": {
                color: "#bbb", // ✅ วันที่ของเดือนที่แล้วเป็นสีเทา
              },
              
            }}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}