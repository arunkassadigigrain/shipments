
import { Menu, Package } from "lucide-react";
import Sidebar from "@/app/components/sidebar";  

export default function Home() {
  return (
    <div className="flex min-h-screen font-sans">
      <div className="drawer lg:drawer-open">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="drawer-content flex flex-col">
          {/* Mobile Header */}
          <div className="navbar bg-base-100 lg:hidden shadow-md">
            <div className="flex-none">
              <label
                htmlFor="my-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <Menu className="h-6 w-6" />
              </label>
            </div>
            <div className="flex-1 px-4">
              <h1 className="text-xl font-bold">Digi Grain</h1>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 flex items-center justify-center bg-base-200 p-6">
            <div className="text-center max-w-lg">
              <h1 className="text-5xl font-bold text-primary mb-4">Welcome to Digi Grain</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Manage your grain logistics efficiently. Select a module from the sidebar to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}