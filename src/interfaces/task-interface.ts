import { GroupInterface } from "./group-interface";
import { ThemeInterface } from "./theme-interface";

export interface TaskInterface {
  _id: string;
  group: GroupInterface;
  teacherId: string;
  themeId: ThemeInterface;
  file: string;
}
