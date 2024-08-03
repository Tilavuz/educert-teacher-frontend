import { DepartmentInterface } from "./department-interface";

export interface ThemeInterface {
  _id: string;
  subjectId: string;
  departmentId: DepartmentInterface;
  title: string;
}
