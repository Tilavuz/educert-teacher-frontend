import { TeacherInterface } from "./teacher-interface";

export interface WorkTableInterface {
    _id: string;
    day: 'dushanba' | 'seshanba' | 'chorchanba' | 'payshanba' | 'juma' | 'shanba' | 'yakshanba',
    start: string,
    end: string,
    teacher: TeacherInterface
}