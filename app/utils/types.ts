import { Dayjs } from "dayjs";

export enum Status {
  PENDING = "pending",
  IN_PROGRESS = "in progress",
  COMPLEATED = "completed",
}
export enum ORDER {
  ASC = "ASC",
  DESC = "DESC",
}
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: Status;
  dueDate: Dayjs;
  createdAt: Date;
  updatedAt: Date;
}
