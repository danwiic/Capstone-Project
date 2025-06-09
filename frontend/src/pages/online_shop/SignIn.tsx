import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Login from "./Login";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const tabs = [
  { name: "login", component: <Login /> },
  { name: "signup", component: <Signup /> },
];

export default function SignIn() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <>
      <div className="p-4">
        <Link
          to={"/"}
          className="flex items-center gap-2 bg-mayormoto-pink px-4 py-2 w-fit
          text-white font-medium rounded text-sm uppercase"
        >
          <ArrowLeft /> Back
        </Link>
      </div>
      <div className="flex items-center justify-center w-full p-20">
        <div className="w-1/3 p-1 bg-white rounded-lg shadow-1">
          <div
            className="w-full flex justify-between border-b 
          border-gray-200 text-sm font-medium "
          >
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full ${
                  activeTab === tab.name
                    ? "border-b border-mayormoto-pink text-mayormoto-pink"
                    : " text-gray-800"
                } px-4 py-3`}
              >
                {tab.name.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="w-full">
            {tabs.map((tab) => {
              if (tab.name === activeTab) {
                return <div key={tab.name}>{tab.component}</div>;
              }
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
