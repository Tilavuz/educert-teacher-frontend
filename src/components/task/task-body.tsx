import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getGroupTasks } from "@/features/group-task/group-task-slice";
import { serverUrl } from "@/helpers/shared";
import { Ellipsis } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { Button } from "../ui/button";

export default function TaskBody() {
  const { id } = useParams();
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

  const deleteTask = async (id: string) => {
    try {
      const res = await apiClient.delete(`/teacher-tasks/delete/${id}`);
      toast.success(res.data.message);
    } catch (error) {
      const result = error as Error;
      toast.error(result.message);
    }
  };

  return (
    <tbody>
      {groupTasks !== null && groupTasks[0] ? (
        groupTasks.map((task) => {
          return (
            <tr key={task?._id} className="border-t border-t-[#a6b3c4]">
              <td className="py-2 font-bold">
                {task?.themeId?.departmentId?.title}
              </td>
              <td className="py-2 font-bold">{task?.themeId?.title}</td>
              <td className="py-2 font-bold">{task?.group.title}</td>
              <td className="py-2 font-bold">{task?.group?.subject?.title}</td>
              <td className="py-2 font-bold">
                <Link to={`${serverUrl}/uploads/${task?.file}`} download>
                  Download
                </Link>
              </td>
              <td>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"ghost"}>
                      <Ellipsis />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col max-w-[80px] gap-2">
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-sm text-left hover:underline text-red-500"
                    >
                      delete
                    </button>
                    <button className="text-sm text-left hover:underline">
                      edit
                    </button>
                  </PopoverContent>
                </Popover>
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
  );
}
