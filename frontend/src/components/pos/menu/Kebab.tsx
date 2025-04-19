import { useState, useRef, useEffect, ReactNode } from "react";
import { MoreVertical } from "lucide-react";

// Define types for menu items and component props
interface MenuItem {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
}

type Position = "right" | "left" | "right-bottom" | "left-bottom";

interface KebabMenuProps {
  items?: MenuItem[];
  position?: Position;
  icon?: ReactNode;
  buttonClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
}

export default function KebabMenu({
  items = [],
  position = "right",
  icon = <MoreVertical size={24} />,
  buttonClassName = "",
  menuClassName = "",
  itemClassName = "",
}: KebabMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Determine menu position classes
  const positionClasses: Record<Position, string> = {
    right: "right-0",
    left: "left-0",
    "right-bottom": "right-0 top-full",
    "left-bottom": "left-0 top-full",
  };

  // Demo menu items if none provided
  const defaultItems: MenuItem[] = [
    { label: "Edit", onClick: () => console.log("Edit clicked") },
    { label: "Archive", onClick: () => console.log("archived clicked") },
    {
      label: "Delete",
      onClick: () => console.log("Delete clicked"),
      className: "text-red-600 hover:text-red-700",
    },
  ];

  const menuItems = items.length > 0 ? items : defaultItems;

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={`p-0.5 rounded-full hover:bg-gray-200 focus:outline-none 
            focus:ring-2 focus:ring-gray-300 transition-colors ${buttonClassName}`}
        aria-label="Menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {icon}
      </button>

      {isOpen && (
        <div
          className={`absolute mt-2 w-48 bg-white rounded-md border-gray-200 border 
            z-10 shadow-1 ring-black ring-opacity-5 ${positionClasses[position]} ${menuClassName}`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick && item.onClick();
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                  item.className || ""
                } ${itemClassName}`}
                role="menuitem"
              >
                <div className="flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
