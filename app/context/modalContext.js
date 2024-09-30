import { Status } from "@/app/utils/types";
import React, { createContext, useState } from "react";

import dayjs from "dayjs";

const ModalContext = createContext();
const formInitialValues = {
  title: "",
  description: "",
  status: Status.PENDING,
  dueDate: dayjs(),
};

export const ModalContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(formInitialValues);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <ModalContext.Provider
      value={{
        formInitialValues,
        open,
        setOpen,
        isEdit,
        setIsEdit,
        formData,
        setFormData,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return React.useContext(ModalContext);
};
