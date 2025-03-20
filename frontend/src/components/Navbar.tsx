import logo from "../images/mayormoto-logo-removebg-preview.png";
import Button from "../ui/Button.tsx";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-white p-2 px-10 shadow-md flex justify-between items-center sticky top-0 z-50">
        <div>
          <img 
            src={logo} 
            alt=""
            className="w-56"
             />
        </div>

        <div>
            <NavItems/>
        </div>
        <div>
            <Button>Login</Button>
        </div>
      </div>
      {children}
    </>
  );
}

function NavItems() {
  const items = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <ul className="flex justify-between items-center gap-6 ">
      {items.map((item, i) => {
        return (
          <li key={i}>
            <a href="">{item.name}</a>
          </li>
        );
      })}
    </ul>
  );
}
