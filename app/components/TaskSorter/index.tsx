"use client";
import { useTasksContext } from "@/app/context/taskContext";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useState } from "react";

export default function TaskSorter() {
  const { getTasksOrdered } = useTasksContext();

  const [orderBy, setOrderBy] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setOrderBy(event.target.value as string);
    getTasksOrdered(value);
  };

  return (
    <div className=" w-52">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort BY</InputLabel>
        <Select value={orderBy} label="Sort BY" onChange={handleChange}>
          <MenuItem value={"none"}>None</MenuItem>
          <MenuItem value={"ASC"}>Due date ASC</MenuItem>
          <MenuItem value={"DESC"}>Due date DESC</MenuItem>
          <MenuItem value={"STATUS"}>Status</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
