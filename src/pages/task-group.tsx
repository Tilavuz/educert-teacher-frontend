import TaskBody from "@/components/task/task-body";
import TaskForm from "@/components/task/task-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function TaskGroup() {
  return (
    <div className="container py-8">
      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center justify-center gap-1 bg-[#4fd1c5] rounded-none hover:bg-green-400">
              <Plus size={18} />
              <span>Qo'shish</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <TaskForm />
          </DialogContent>
        </Dialog>
      </div>
      <table className="w-full">
        <thead>
          <tr className="">
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Department
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Theme
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Group
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Subject
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Task
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3"></th>
          </tr>
        </thead>
        <TaskBody />
      </table>
    </div>
  );
}
