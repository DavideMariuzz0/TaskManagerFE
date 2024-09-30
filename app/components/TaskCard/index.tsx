import { Status, Task } from "@/app/utils/types";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";

const StatusComponent = ({ status }: { status: Status }) => {
  const color =
    status === Status.COMPLEATED
      ? "text-green-600"
      : status === Status.PENDING
      ? "text-red-500"
      : "text-yellow-400";
  return (
    <div className={`font-bold capitalize text-xs w-1/4 ${color}`}>
      <CircleIcon className={`text-xs ${color}`} />
      <span>{status}</span>
    </div>
  );
};

export default function TaskCard({
  _id,
  title,
  description,
  dueDate,
  status,
  onEditTask,
  onDeleteTask,
}: Task & {
  onEditTask: (task: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}) {
  const dueDateFormatted = dayjs(dueDate).format("MMM Do YYYY");

  return (
    <div className="bg-white rounded-md shadow-lg w-80 h-72 p-3 flex flex-col justify-between">
      <div className=" ">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg lin font-bold leading-5">{title}</h3>
          <StatusComponent status={status} />
        </div>

        <div className="h-44 overflow-y-auto">
          <p>{description}</p>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <p className="text-xs ">
          <span className="font-bold">Due Date: </span>
          {dueDateFormatted}
        </p>
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() =>
              onEditTask({ _id, title, description, status, dueDate })
            }
          >
            <EditIcon color="primary" />
          </IconButton>

          <IconButton
            aria-label="delete"
            size="small"
            sx={{ marginLeft: 1 }}
            onClick={() => onDeleteTask(_id)}
          >
            <DeleteForeverIcon color="error" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
