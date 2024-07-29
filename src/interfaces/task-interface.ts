import { GroupInterface } from "./group-interface";

export interface TaskInterface {
  _id: string;
  group: GroupInterface;
  teacherId: string;
  title: string;
  file: string;
}
