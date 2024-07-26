import { AppDispatch, RootState } from "@/app/store";
import { getUser } from "@/features/auth/auth-slice";
import { actionToken } from "@/helpers/action-token";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({
  roles,
  children,
}: {
  roles: string[];
  children: ReactNode;
}) {
  const { user, error } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const token = actionToken.getToken("token");

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if(token) {
      dispatch(getUser());
    }
  }, []);

  if (token && !error && !user?.auth) {
    return <p>loader...</p>;
  }

  if (!user?.auth) return <Navigate to={"/login"} state={{ from: location }} replace={true} />;

  if (user?.auth && roles.includes(user?.auth?.role)) {
    return children;
  }
}
