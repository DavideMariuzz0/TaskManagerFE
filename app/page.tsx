"use client";
import ModalForm from "./components/ModalForm";
import TaskManager from "./components/TaskManager";

export default function Home() {
  return (
    <>
      <ModalForm />
      <main className="p-8 flex h-ful max-w-[1048px] w-full">
        <TaskManager />
      </main>
    </>
  );
}
