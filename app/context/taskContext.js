import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const TasksContext = createContext();

const serverURl = `${process.env.NEXT_PUBLIC_API_URL}:8000/api/v1`;
export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverURl}/tasks`);

      setTasks(response.data.tasks);
    } catch (error) {
      console.log("getTasks error: ", error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const getTasksOrdered = async (order) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverURl}/tasks/ordered/${order}`);

      setTasks(response.data.tasks);
    } catch (error) {
      console.log("getTasksOrdered error: ", error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const getTask = async (taskId) => {
    try {
      const response = await axios.get(`${serverURl}/task/${taskId}`);

      setTask(response.data);
    } catch (error) {
      console.log("getTask error: ", error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await axios.post(`${serverURl}/task/create`, task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.log("createTask error: ", error);
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await axios.patch(`${serverURl}/task/${task._id}`, task);

      const newTasks = tasks.map((_task) => {
        return _task._id === response.data._id ? response.data : _task;
      });

      setTasks(newTasks);
    } catch (error) {
      console.log("updateTask error: ", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${serverURl}/task/${taskId}`);

      const newTasks = tasks.filter((_task) => _task._id !== taskId);
      setTasks(newTasks);
    } catch (error) {
      console.log("deleteTask error: ", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        task,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        getTasksOrdered,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  return React.useContext(TasksContext);
};
