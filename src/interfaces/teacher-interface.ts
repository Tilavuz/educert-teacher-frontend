import { AuthInterface } from "./auth-interface";
import { FilialInterface } from "./filial-interface";

export interface TeacherInterface {
    _id: string,
    auth: AuthInterface,
    name: string,
    lastname: string,
    photo: string,
    about: string,
    grade: string,
    filial: FilialInterface[]
}