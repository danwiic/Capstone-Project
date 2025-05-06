import logo from "../../images/mayormoto-logo-removebg-preview.png";

export default function CheckoutNav({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="bg-white shadow-sm z-50 w-full flex items-center justify-center">
        <nav className=" max-w-[100rem] w-full px-10 md:px-10 lg:pl-30">
          <img src={logo} className="w-auto h-20" />
        </nav>
      </div>
      <div className="w-full max-w-[100rem]">{children}</div>
    </div>
  );
}
