import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { toast } from "sonner";
import { apiClient } from "@/api/api-client";
import { getWorkTables } from "@/features/worktable/work-table-slice";

export default function TeacherWorkTableBody() {
  const { worktables } = useSelector(
    (state: RootState) => state.worktable
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    (async function () {
      try {
        const res = await apiClient.get(`/worktimes/teacher/${user?._id}`);
        dispatch(getWorkTables(res.data))
      } catch (error) {
        const result = error as Error;
        toast.error(result.message);
      }
    })()
  }, []);

  return (
    <table className="w-full border">
      <thead>
        <tr className="">
          <th className="uppercase px-2 text-[#A6B3C4] text-xs text-left py-3">
            Teacher
          </th>
          <th className="uppercase px-2 text-[#A6B3C4] text-xs text-left py-3">
            day
          </th>
          <th className="uppercase px-2 text-[#A6B3C4] text-xs text-left py-3">
            start
          </th>
          <th className="uppercase px-2 text-[#A6B3C4] text-xs text-left py-3">
            end
          </th>
        </tr>
      </thead>
      <tbody className="">
        {worktables !== null && worktables[0] ? (
          worktables.map((time) => {
            return (
              <tr key={time?._id} className="border-t border-t-[#a6b3c4]">
                <td className="py-2 px-2 font-bold  cursor-pointer select-none">
                  {time?.teacher?.name} {time?.teacher?.lastname}
                </td>
                <td className="py-2 px-2 font-bold">{time?.day}</td>
                <td className="py-2 px-2 font-bold">{time?.start}</td>
                <td className="py-2 px-2 font-bold">{time?.end}</td>
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
  );
}
