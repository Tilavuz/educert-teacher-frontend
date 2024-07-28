import { FilialInterface } from "./filial-interface";
import { SubjectInterface } from "./subject-interface";
import { TeacherInterface } from "./teacher-interface";

export interface GroupInterface {
  _id: string;
  teacher: TeacherInterface | null;
  title: string;
  subject: SubjectInterface | null;
  filial: FilialInterface;
}
