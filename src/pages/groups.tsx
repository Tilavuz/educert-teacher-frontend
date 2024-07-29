import { apiClient } from "@/api/api-client";
import { RootState } from "@/app/store";
import { getGroups } from "@/features/group/group-slice";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Eye } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Groups() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { groups } = useSelector((state: RootState) => state.group);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const res = await apiClient.get(`/groups/teacher/${user?._id}`);
        dispatch(getGroups(res.data));
      } catch (error) {
        const result = error as Error;
        toast.error(result.message);
      }
    })();
  }, []);

  return (
    <div className="container">
      <table className="w-full">
        <thead>
          <tr className="">
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Title
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Teacher
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Subject
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
              Filial
            </th>
            <th className="uppercase text-[#A6B3C4] text-xs text-left py-3">
            </th>
          </tr>
        </thead>
        <tbody>
          {groups !== null && groups[0] ? (
            groups.map((group) => {
              return (
                <tr key={group?._id} className="border-t border-t-[#a6b3c4]">
                  <td className="py-2 font-bold">{group?.title}</td>
                  <td className="py-2 font-bold">{group?.teacher?.name}</td>
                  <td className="py-2 font-bold">{group?.subject?.title}</td>
                  <td className="py-2 font-bold">{group?.filial?.title}</td>
                  <td className="py-2 font-bold">
                    <Link to={`${group._id}`}>
                      <Eye className="size-6" />
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
