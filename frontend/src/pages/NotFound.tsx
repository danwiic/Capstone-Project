import { ImSad } from "react-icons/im";
import Button from "../components/ui/button/HoverButton";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-20">
      <div className="text-mayormoto-blue w-full h-full flex flex-col justify-center items-center m-auto gap-8 p-4 text-center">
        <ImSad className="text-big align-center" />

        <div>
          <h1 className="text-7xl text-mayormoto-blue">404</h1>
          <div className="text-mayormoto-blue text-2xl">Page not found</div>
        </div>

        <p className="text-mayormoto-blue">
          The Page you are looking for doesn't exist or an other error occured.
        </p>

        <Link to="/">
          <Button>HOME</Button>
        </Link>
      </div>
    </div>
  );
}
