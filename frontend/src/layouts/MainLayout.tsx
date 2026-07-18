import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-[72px]">
        <Header />
        <main className="pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}