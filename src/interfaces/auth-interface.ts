export interface AuthInterface {
  _id: string;
  phone: string;
  password?: string;
  role: "admin" | "user" | "accountant" | "operator" | "teacher";
}