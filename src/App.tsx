import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/layouts/root-layout";
import Login from "@/pages/auth/login";
import PrivateRoute from "@/private/private-route";
import Profile from "@/pages/profile";
import Groups from "@/pages/groups";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute roles={["teacher"]}>
          <RootLayout />
        </PrivateRoute>
      ),
      errorElement: <p>Error page</p>,
      children: [
        {
          path: "/profile",
          element: (
            <PrivateRoute roles={["teacher"]}>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: "/groups",
          element: (
            <PrivateRoute roles={["teacher"]}>
              <Groups />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}
