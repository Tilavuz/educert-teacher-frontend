import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { list } from "./list";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { serverUrl } from "@/helpers/shared";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { logout } from "@/features/auth/auth-slice";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()
  return (
    <header className="py-2">
      <nav className="container flex items-center justify-between">
        <div>
          <Link to={"/"}>Educert</Link>
        </div>
        <ul className="flex items-center gap-4">
          {list?.map((item) => {
            return (
              <li key={item.title}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <Link to={"/profile"} className="border rounded-full">
            <Avatar>
              <AvatarImage src={`${serverUrl}/uploads/${user?.photo}`} />
              <AvatarFallback>{user?.auth?.phone?.slice(4, 6)}</AvatarFallback>
            </Avatar>
          </Link>
          <Button onClick={() => dispatch(logout())} variant={"outline"}>Log out</Button>
        </div>
      </nav>
    </header>
  );
}
