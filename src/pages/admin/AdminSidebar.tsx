import {
  Home,
  Image,
  Database,
  FileText,
  Layout,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Image/Video Upload", icon: Image },
  // { name: "TBD", icon: FileText },
  { name: "Banner Data", icon: FileText }, // updated here
  { name: "Jobs Data", icon: Layout },
  { name: "Policy Data", icon: ShieldCheck },
];

interface SidebarProps {
  active: string;
  setActive: (value: string) => void;
}

export default function AdminSidebar({ active, setActive }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-gray-200 pt-9 px-2">
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex items-center gap-3 w-full px-6 py-3 text-[12px] font-[Open_Sans] rounded-md transition cursor-pointer ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-[#EBEBEB] text-gray-800 hover:bg-gray-300"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-between md:hidden bg-white border-t border-gray-200 px-4 py-2 z-50">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className="flex flex-col items-center justify-center text-[10px] transition cursor-pointer"
            >
              <Icon
                className={`w-6 h-6 mb-1 ${
                  isActive ? "text-black" : "text-gray-500"
                }`}
              />
              <span className={`${isActive ? "text-black" : "text-gray-500"}`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
