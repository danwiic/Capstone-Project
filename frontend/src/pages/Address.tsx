import { Plus } from "lucide-react";
import Navbar from "../components/Nav/Navbar";
import Button from "../components/ui/button/Button";
import AddressItem from "../components/Address/AddressItem";

export default function Adress() {
  const mockAddress = [
    {
      fullName: "Dan Pirante",
      defaultAddress: true,
      phoneNumber: "09123456789",
      streetAddress: "Kahit saan",
      region: "Philippines",
      province: "Cavite",
      city: "Cavite City",
      zipCode: 4100,
      addressType: "Home",
    },
    {
      fullName: "Dan Pirante",
      defaultAddress: false,
      phoneNumber: "09123456789",
      streetAddress: "Kahit saan",
      region: "Philippines",
      province: "Cavite",
      city: "Cavite City",
      zipCode: 4100,
      addressType: "Work",
    },
  ];
  return (
    <Navbar>
      <div className="px-30 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="bold text-xl">My Address</span>
            <p className="text-sm text-gray-500">
              Manage your delivery addresses for faster checkout
            </p>
          </div>
          <div>
            <Button className="flex w-fit px-4 text-sm items-center gap-1">
              <Plus size={20} />
              <span>Add Address</span>
            </Button>
          </div>
        </div>
        <div className=" px-10 py-3 flex flex-col gap-4">
          {mockAddress.length > 0 &&
            mockAddress.map((add, i) => (
              <div key={i}>
                <AddressItem address={add} />
              </div>
            ))}
        </div>
      </div>
    </Navbar>
  );
}
