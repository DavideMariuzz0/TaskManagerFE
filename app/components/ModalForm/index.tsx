import { Status } from "@/app/utils/types";
import { Modal } from "@mui/material";
import Button from "@mui/material/Button";

import { FormControl, MenuItem } from "@mui/material";
import { Field, Form, Formik } from "formik";

import { useModalContext } from "@/app/context/modalContext";
import { useTasksContext } from "@/app/context/taskContext";
import { Select, TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";

const status = [Status.COMPLEATED, Status.IN_PROGRESS, Status.PENDING];
interface Values {
  title: string;
}
export default function ModalForm() {
  const { createTask, updateTask } = useTasksContext();
  const {
    isEdit,
    setFormData,
    formData,
    formInitialValues,
    handleClose,
    open,
  } = useModalContext();

  const onCancel = (resetForm: () => void) => {
    resetForm();
    setFormData(formInitialValues);
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="bg-white p-10 rounded w-full max-w-[500px]">
          <h2 className="text-xl font-bold mb-5 text-center">
            {isEdit ? "Edit task" : "Add task"}
          </h2>
          <Formik
            initialValues={formData}
            validate={(values) => {
              const errors: Partial<Values> = {};
              if (!values.title) {
                errors.title = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (isEdit) {
                updateTask(values);
              } else {
                createTask(values);
              }
              handleClose();
              setSubmitting(false);
            }}
          >
            {({ submitForm, resetForm, isSubmitting }) => (
              <Form>
                <FormControl sx={{ width: "100%", marginBottom: 3 }}>
                  <Field
                    component={TextField}
                    type="text"
                    name="title"
                    label="Title"
                  />
                </FormControl>

                <FormControl sx={{ width: "100%", marginBottom: 3 }}>
                  <Field
                    component={TextField}
                    multiline={true}
                    maxRows={10}
                    rows={10}
                    type="text"
                    label="Description"
                    name="description"
                  />
                </FormControl>

                <FormControl sx={{ width: "100%", marginBottom: 3 }}>
                  <Field
                    component={Select}
                    type="text"
                    label="status"
                    name="status"
                    multiple={false}
                    inputProps={{ name: "status", id: "status" }}
                  >
                    {status.map((item) => (
                      <MenuItem
                        key={item}
                        value={item}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <FormControl sx={{ width: "100%", marginBottom: 3 }}>
                  <Field
                    component={DatePicker}
                    name="dueDate"
                    label="Due Date"
                    inputFormat="DD/MM/YYYY"
                  />
                </FormControl>

                <div className="flex justify-between">
                  <Button
                    sx={{ margin: 1, width: 100 }}
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                    onClick={() => onCancel(resetForm)}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ margin: 1, width: 100 }}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    {isEdit ? "Edit" : "Add"}
                  </Button>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
}
