import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGroupTasks } from "@/features/group-task/group-task-slice";
import { serverUrl } from "@/helpers/shared";
import { FormEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function TaskGroup() {
  const { id } = useParams();
  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { groupTasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    (async function () {
      try {
        if ((groupTasks && groupTasks[0]._id !== id) || !groupTasks) {
          const res = await apiClient.get(`/group/tasks/${id}`);
          dispatch(getGroupTasks(res.data));
        }
      } catch (error) {
        const result = error as Error;
        toast.error(result.message);
      }
    })();
  }, []);

  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const taskData = {
        title: titleRef?.current?.value,
        file: fileRef?.current?.files ? fileRef?.current?.files[0] : null,
      };

      const res = await apiClient.post(
        `/teacher-tasks/create/${id}`,
        taskData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      const result = error as Error;
      toast.error(result.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={(e) => createTask(e)} className="flex flex-col gap-2 mb-4">
        <Input placeholder="Mavzu qo'shing!" ref={titleRef} type="text" />
        <Input ref={fileRef} type="file" />
        <Button>Yuborish</Button>
      </form>
      <table className="w-full">
        <thead>
          <tr className="">
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Title
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Group
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Subject
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              File
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3"></th>
          </tr>
        </thead>
        <tbody>
          {groupTasks !== null && groupTasks[0] ? (
            groupTasks.map((task) => {
              return (
                <tr key={task?._id} className="border-t border-t-[#a6b3c4]">
                  <td className="py-2 font-bold">{task?.title}</td>
                  <td className="py-2 font-bold">{task?.group.title}</td>
                  <td className="py-2 font-bold">
                    {task?.group?.subject?.title}
                  </td>
                  <td className="py-2 font-bold">
                    <Link to={`${serverUrl}/uploads/${task?.file}`} download>
                      Download
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="font-bold">Malumot mavjut emas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
