import { apiClient } from "@/api/api-client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "@/features/group-task/group-task-slice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RootState } from "@/app/store";
import { getThemes } from "@/features/department-theme/department-theme-slice";

export default function TaskForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { themes } = useSelector((state: RootState) => state.theme);
  const [theme, setTheme] = useState<string>()

  const { id } = useParams();
  const dispatch = useDispatch();

  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const taskData = {
        themeId: theme,
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
      dispatch(addTask(res.data.task));
    } catch (error) {
      const result = error as Error;
      toast.error(result.message);
    }
  };


  useEffect(() => {
    (async function () {
      try {
        if (id !== themes?.id) {
          const res = await apiClient.get(`/themes/group/${id}`);
          dispatch(getThemes({ themes: res.data, id: id ?? "" }));
        }
      } catch (error) {
        const result = error as Error;
        toast.error(result.message);
      }
    })();
  }, []);

  return (
    <form onSubmit={(e) => createTask(e)} className="flex flex-col gap-2 mb-4">
      <Select onValueChange={(e) => setTheme(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Mavzu tanlang!" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {themes?.themes &&
              themes?.themes?.map((theme) => {
                return (
                  <SelectItem key={theme._id} value={theme._id}>
                    {theme?.departmentId?.title}-{theme?.title}
                  </SelectItem>
                );
              })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input ref={fileRef} type="file" />
      <Button>Yuborish</Button>
    </form>
  );
}
