import React from "react";
import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import { TasksContextProvider, useTasksContext } from "./taskContext.js";
jest.mock("axios");

const TestComponent = () => {
  const { tasks, loading } = useTasksContext();

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

describe("TasksContextProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches tasks on mount", async () => {
    const tasksMock = [
      { _id: "1", title: "Task 1" },
      { _id: "2", title: "Task 2" },
    ];

    axios.get.mockResolvedValueOnce({ data: { tasks: tasksMock } });

    render(
      <TasksContextProvider>
        <TestComponent />
      </TasksContextProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    tasksMock.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  it("creates a new task", async () => {
    const newTask = { _id: "3", title: "New Task" };
    axios.post.mockResolvedValueOnce({ data: newTask });

    const { result } = renderHook(() => useTasksContext(), {
      wrapper: TasksContextProvider,
    });

    await act(async () => {
      await result.current.createTask(newTask);
    });

    expect(result.current.tasks).toContainEqual(newTask);
  });

  it("updates an existing task", async () => {
    const newTask = { _id: "1", title: "New Task" };
    axios.post.mockResolvedValueOnce({ data: newTask });

    const { result } = renderHook(() => useTasksContext(), {
      wrapper: TasksContextProvider,
    });

    await act(async () => {
      await result.current.createTask(newTask);
    });

    const updatedTask = { _id: "1", title: "Updated Task" };
    axios.patch.mockResolvedValueOnce({ data: updatedTask });

    await act(async () => {
      await result.current.updateTask(updatedTask);
    });

    expect(result.current.tasks).toContainEqual(updatedTask);
  });

  it("deletes a task", async () => {
    const tasksMock = [
      { _id: "1", title: "Task 1" },
      { _id: "2", title: "Task 2" },
    ];

    axios.get.mockResolvedValueOnce({ data: { tasks: tasksMock } });
    axios.delete.mockResolvedValueOnce({});

    const { result } = renderHook(() => useTasksContext(), {
      wrapper: TasksContextProvider,
    });

    await waitFor(() => expect(result.current.tasks.length).toBe(2));

    await act(async () => {
      await result.current.deleteTask("1");
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks).not.toContainEqual(tasksMock[0]);
  });

  it("fetches tasks in ordered form", async () => {
    const orderedTasksMock = [
      { _id: "2", title: "Task 2" },
      { _id: "1", title: "Task 1" },
    ];

    axios.get.mockResolvedValueOnce({ data: { tasks: orderedTasksMock } });

    const { result } = renderHook(() => useTasksContext(), {
      wrapper: TasksContextProvider,
    });

    await act(async () => {
      await result.current.getTasksOrdered("ASC");
    });

    expect(result.current.tasks).toEqual(orderedTasksMock);
  });
});
