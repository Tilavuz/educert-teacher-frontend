import Header from "@/components/header/header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
        <Header />
        <div>
            <Outlet />
        </div>
    </div>
  )
}
