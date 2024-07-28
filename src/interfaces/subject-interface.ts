import { FilialInterface } from "./filial-interface";

export interface SubjectInterface {
  _id: string;
  filial: FilialInterface | null;
  title: string;
  photo?: File | string | null;
}
