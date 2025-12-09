// AdminNavbar.tsx
import { Bell, Calendar, LogOut } from "lucide-react";

// ✅ Define the props interface here
interface AdminNavbarProps {
  user: {
    name: string;
    role: string;
  } | null; // if user can be null
  onLogout: () => void;
}

// Use the interface in the component
export default function AdminNavbar({ user, onLogout }: AdminNavbarProps) {
  return (
    <nav className="w-full h-[70px] md:h-[80px] flex items-center justify-between bg-white px-4 md:px-10 border-b border-[#EBEBEB]">
      {/* Left Section */}
      <div className="flex items-center gap-4 md:gap-8">
        <div className="w-[120px] md:w-[200px] h-[40px] md:h-[70px] flex-shrink-0">
          {/* <img src={logo} alt="Logo" className="w-full h-full object-contain" /> */}
          <img
            src="/logo2.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="hidden md:block text-[16px] md:text-[24px] font-semibold font-[Open_Sans] text-black whitespace-nowrap">
          Admin Dashboard
        </h1>
      </div>

      {/* Right Section */}
      {/* <div className="flex items-center gap-4 md:gap-10">
        <div className="flex items-center gap-4 md:gap-8">
          <Bell className="w-6 h-6 md:w-7 md:h-7 text-[#323232] cursor-pointer" />
          <Calendar className="w-6 h-6 md:w-7 md:h-7 text-[#323232] cursor-pointer" />
          <LogOut
            className="w-6 h-6 md:w-7 md:h-7 text-[#323232] cursor-pointer"
            onClick={onLogout}
          />
        </div>

        <div className="text-right min-w-[100px] md:min-w-[200px]">
          <p className="font-[Inter] text-[14px] md:text-[16px] font-medium truncate">
            {user?.name || "User"}
          </p>
          <p className="hidden md:block font-[Inter] text-[12px] font-medium text-gray-600 truncate">
            {user?.role || "Role"}
          </p>
        </div>
      </div> */}
      <div className="flex items-center gap-1 md:gap-2">
        <LogOut
          className="w-6 h-6 md:w-7 md:h-7 text-[#323232] cursor-pointer"
          onClick={onLogout}
        />

        <div className="text-right">
          <p className="font-[Inter] text-[14px] md:text-[16px] font-medium truncate">
            {user?.name || "User"}
          </p>
          <p className="hidden md:block font-[Inter] text-[12px] font-medium text-gray-600 truncate">
            {user?.role || "Role"}
          </p>
        </div>
      </div>
    </nav>
  );
}
