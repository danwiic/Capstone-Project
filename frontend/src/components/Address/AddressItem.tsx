import { Check, Edit, Home, Trash } from "lucide-react";
import { GiCardRandom } from "react-icons/gi";
import { ImOffice } from "react-icons/im";

interface AddressProps {
  fullName: string;
  defaultAddress: boolean;
  phoneNumber: string;
  streetAddress: string;
  region: string;
  province: string;
  city: string;
  zipCode: number;
  addressType: string;
}

interface Props {
  address: AddressProps;
}

export default function AddressItem({ address }: Props) {
  function addressIcon(type: string) {
    switch (type) {
      case "Home":
        return <Home />;
      case "Work":
        return <ImOffice />;
      case "Other":
        return <GiCardRandom />;
      default:
        break;
    }
  }
  return (
    <div
      className={`${
        address.defaultAddress
          ? "border border-mayormoto-pink bg-mayormoto-pink/5"
          : "bg-white border border-gray-300"
      } rounded-lg w-full p-5 text-gray-700`}
    >
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center">
          <span className="self-start">{addressIcon(address.addressType)}</span>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">{address.fullName}</span>
              {address.defaultAddress && (
                <span
                  className={`${
                    address.defaultAddress &&
                    "text-mayormoto-pink bg-mayormoto-pink/10 p-2 py-1 rounded-full text-sm"
                  } flex items-center gap-1`}
                >
                  <Check size={14} /> Default
                </span>
              )}
              <span className="p-2 py-1 rounded-full bg-gray-50 text-sm">
                {address.addressType}
              </span>
            </div>
            <div className="flex flex-col">
              <span>{address.streetAddress}</span>
              <span>
                {address.city}, {address.province} {address.zipCode}
              </span>
              <span>{address.region}</span>
              <span>(+63) {address.phoneNumber}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-1 transition-colors duration-300">
          <span>
            <Edit className="hover:text-blue-600" />
          </span>
          {address.defaultAddress === false && (
            <span>
              <Trash className="hover:text-red-600" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
