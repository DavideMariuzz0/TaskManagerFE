"use client";

import { ModalContextProvider } from "@/app/context/modalContext";
import { TasksContextProvider } from "@/app/context/taskContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface Props {
  children: React.ReactNode;
}

export default function AppProvider({ children }: Props) {
  return (
    <TasksContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ModalContextProvider>{children}</ModalContextProvider>
      </LocalizationProvider>
    </TasksContextProvider>
  );
}
