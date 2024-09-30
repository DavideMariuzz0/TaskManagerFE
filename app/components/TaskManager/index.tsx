"use client";
import { useModalContext } from "@/app/context/modalContext";
import { useTasksContext } from "@/app/context/taskContext";
import { Task } from "@/app/utils/types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { SelectChangeEvent, Skeleton } from "@mui/material";
import Button from "@mui/material/Button";

import dayjs from "dayjs";
import { useState } from "react";
import TaskCard from "../TaskCard";
import TaskSorter from "../TaskSorter";

export default function TaskManager() {
  const { tasks, loading, deleteTask, getTasksOrdered } = useTasksContext();

  const { setIsEdit, setFormData, handleOpen, formInitialValues } =
    useModalContext();

  const onEditTask = (task: Partial<Task>) => {
    setIsEdit(true);
    task.dueDate = dayjs(task.dueDate);
    setFormData(task);
    handleOpen();
  };

  const onCreateTask = () => {
    setIsEdit(false);
    setFormData(formInitialValues);
    handleOpen();
  };

  const onDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const [orderBy, setOrderBy] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setOrderBy(event.target.value as string);
    getTasksOrdered(value);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-10">
        Welcome to Task Manager!
      </h1>

      <div className="mb-10 flex justify-between flex-wrap ">
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={onCreateTask}
        >
          Create New Task
        </Button>
        <TaskSorter />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-5">All tasks:</h2>
        <div className="flex flex-row flex-wrap gap-3">
          {loading
            ? Array(9)
                .fill("")
                .map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      key={index}
                      sx={{ borderRadius: 2 }}
                      variant="rectangular"
                      width={320}
                      height={280}
                    />
                  </div>
                ))
            : tasks?.map((task: Task) => (
                <TaskCard
                  key={task._id}
                  {...task}
                  onEditTask={onEditTask}
                  onDeleteTask={onDeleteTask}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
