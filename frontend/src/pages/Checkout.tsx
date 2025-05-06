import { useState } from "react";
import CheckoutNav from "../components/Nav/CheckoutNav";
import { formatMoney } from "../utils/formatMoney";
import Loading from "../components/loader/Loading";
import { useLocation } from "react-router-dom";

interface Props {
  productId: string;
  productName?: string;
  variantId?: string;
  quantity: number;
  price: number;
}

interface CheckoutProps {
  product: Props[];
}

export default function Checkout({ product: propProduct }: any) {
  const [selectPayment, setSelectPayment] = useState<string | null>("paymongo");
  const [selectBilling, setSelectBilling] = useState<string | null>("same");

  const paymentMethods = [
    { label: "Secure Payments via Paymongo", value: "paymongo" },
    { label: "Cash on Delivery (COD)", value: "cod" },
  ];

  const selectBillingAddress = [
    { label: "Same as delivery address", value: "same" },
    { label: "Use a different billing address", value: "different" },
  ];

  const location = useLocation();
  const product = propProduct || location.state?.product || [];

  console.log("Product from location:", product);

  function getTotalPrice() {
    return product.reduce((total: number, item: any) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  function totalWithTaxAndShipping() {
    const shipping = 200;
    const tax = getTotalPrice() / 10;
    return getTotalPrice() + shipping + tax;
  }

  if (!product) return <Loading />;
  return (
    <CheckoutNav>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2">
        <div className=" bg-white md:border-r border-gray-200 h-full px-10 lg:pl-30 py-10">
          <form className="flex flex-col gap-4">
            <span className="font-bold text-xl">Delivery</span>

            <div className="relative">
              <select
                id="country"
                className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
              >
                <option>Philippines</option>
              </select>
              <label
                htmlFor="country"
                className="absolute  text-gray-500 -translate-y-11.5 text-sm 
              start-3 scale-80 duration-300 transform origin-[0]"
              >
                Country
              </label>
            </div>
            <div className="flex gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="firstName"
                  className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="firstName"
                  className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                >
                  First name
                </label>
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  id="lastName"
                  className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="lastName"
                  className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                >
                  Last name
                </label>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                id="address"
                className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                placeholder=" "
                required
              />
              <label
                htmlFor="address"
                className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
              >
                Address
              </label>
            </div>

            <div className="flex gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="postalCode"
                  className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="postalCode"
                  className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                >
                  Postal Code
                </label>
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  id="city"
                  className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="city"
                  className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                >
                  City
                </label>
              </div>
            </div>
            <div className="relative">
              <select
                id="region"
                className="block rounded px-2.5 pr-5 pb-2.5 pt-5 w-full text-sm peer
               border border-gray-200 bg-white focus:outline-none focus:ring-0"
              >
                <option>Cavite</option>
              </select>
              <label
                htmlFor="region"
                className="absolute -translate-y-11 text-sm scale-80 start-1.5
              text-gray-500"
              >
                Region
              </label>
            </div>

            <div className="relative w-full">
              <input
                type="text"
                id="phone"
                className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                placeholder=" "
                required
              />
              <label
                htmlFor="phone"
                className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
              >
                Phone
              </label>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">Payment</span>
              <span className="text-gray-500 text-sm">
                All transactions are secure and encrypted.
              </span>
            </div>
            <div
              className="flex flex-col border border-gray-200 
            text-sm rounded-md"
            >
              {paymentMethods.map((pay, i) => (
                <div
                  onClick={() => setSelectPayment(pay.value)}
                  className={`not-last:border-b border-gray-200 p-4 flex gap-2 items-center
                    cursor-pointer ${
                      selectPayment === pay.value
                        ? "bg-gray-100 outline first:rounded-t-md last:rounded-b-md"
                        : ""
                    }`}
                >
                  <input
                    key={i}
                    type="radio"
                    id={pay.value}
                    checked={selectPayment === pay.value}
                  />
                  <label htmlFor={pay.value}>{pay.label}</label>
                </div>
              ))}
            </div>

            <div className=" flex flex-col gap-2">
              <span className="font-bold">Billing address</span>
              <div
                className="flex flex-col border border-gray-200 
            text-sm rounded-md"
              >
                {selectBillingAddress.map((pay, i) => (
                  <div
                    onClick={() => setSelectBilling(pay.value)}
                    className={`flex flex-col gap-2 first:rounded-t-md not-last:border-b border-gray-200
                    cursor-pointer  ${
                      selectBilling === pay.value ? "bg-gray-100" : ""
                    }`}
                  >
                    <div
                      className={`flex gap-2 items-center p-4  ${
                        selectBilling === pay.value
                          ? "bg-gray-100 outline last:rounded-t-md first:rounded-none"
                          : ""
                      }`}
                    >
                      <input
                        key={i}
                        type="radio"
                        id={pay.value}
                        checked={selectBilling === pay.value}
                      />
                      <label htmlFor={pay.value}>{pay.label}</label>
                    </div>
                    {pay.value === "different" && (
                      <div
                        className={`opacity-0 animate-fade duration-1000 h-0 
                            transition-all ${
                              selectBilling === "different"
                                ? "flex-1"
                                : "hidden"
                            }`}
                      >
                        <div className="flex flex-col gap-2 px-4 py-4">
                          <div className="relative">
                            <select
                              id="country"
                              className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                            >
                              <option>Philippines</option>
                            </select>
                            <label
                              htmlFor="country"
                              className="absolute  text-gray-500 -translate-y-11.5 text-sm 
              start-3 scale-80 duration-300 transform origin-[0]"
                            >
                              Country
                            </label>
                          </div>
                          <div className="flex gap-4">
                            <div className="relative w-full">
                              <input
                                type="text"
                                id="firstName"
                                className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="firstName"
                                className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                              >
                                First name
                              </label>
                            </div>
                            <div className="relative w-full">
                              <input
                                type="text"
                                id="lastName"
                                className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="lastName"
                                className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                              >
                                Last name
                              </label>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              id="address"
                              className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="address"
                              className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                            >
                              Address
                            </label>
                          </div>

                          <div className="flex gap-4">
                            <div className="relative w-full">
                              <input
                                type="text"
                                id="postalCode"
                                className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="postalCode"
                                className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                              >
                                Postal Code
                              </label>
                            </div>
                            <div className="relative w-full">
                              <input
                                type="text"
                                id="city"
                                className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                                placeholder=" "
                                required
                              />
                              <label
                                htmlFor="city"
                                className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                              >
                                City
                              </label>
                            </div>
                          </div>
                          <div className="relative">
                            <select
                              id="region"
                              className="block rounded px-2.5 pr-5 pb-2.5 pt-5 w-full text-sm peer
               border border-gray-200 bg-white focus:outline-none focus:ring-0"
                            >
                              <option>Cavite</option>
                            </select>
                            <label
                              htmlFor="region"
                              className="absolute -translate-y-11 text-sm scale-80 start-1.5
              text-gray-500"
                            >
                              Region
                            </label>
                          </div>

                          <div className="relative w-full">
                            <input
                              type="text"
                              id="phone"
                              className="block rounded px-2.5 pb-2.5 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="phone"
                              className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                            >
                              Phone
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full py-3 bg-mayormoto-pink hover:bg-mayormoto-pink/80
             text-white font-medium rounded-md"
            >
              Pay now
            </button>
          </form>
          <div className="py-4 pt-15">
            <div
              className="underline text-sm flex gap-3 border-t border-gray-300 
            py-2 text-gray-900 font-semibold"
            >
              <span>Refund policy</span>
              <span>Privacy policy</span>
              <span>Terms of service</span>
            </div>
          </div>
        </div>
        <div className="px-10 lg:pr-30 py-10">
          <div className=" sticky top-10">
            <div className="flex flex-col gap-4 w-full ">
              <span className="font-bold text-xl">Order Summary</span>
              {product?.map((prod: any, i: number) => (
                <div key={i} className="flex gap-4 justify-between">
                  <span className="flex gap-2 items-center w-full">
                    <img
                      src={prod.product.ProductImage[0].imageUrl || ""}
                      alt="img"
                      className="w-auto h-15"
                    />
                    <span className="break-words w-[15rem]">
                      {prod.productName || prod.product.name}
                    </span>
                  </span>
                  <span className="flex flex-col w-fit justify-center items-end">
                    <span>{formatMoney(prod.price)}</span>
                    <span className="text-sm scale-90 font-medium text-nowrap">
                      Quantity: {prod.quantity}
                    </span>
                  </span>
                </div>
              ))}
              <div className="flex justify-between gap-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    id="firstName"
                    className="block rounded p-2 pt-5 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none focus:ring-0"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
                  >
                    Discount code
                  </label>
                </div>
                <button
                  disabled={true}
                  className="px-3 py-1 text-sm border 
                border-gray-300 rounded font-bold disabled:text-gray-400"
                >
                  Apply
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatMoney(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Shipping</span>
                  <span>{formatMoney(200)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Tax</span>
                  <span>{formatMoney(getTotalPrice() / 10)}</span>
                </div>
                <div className="flex justify-between text-xl gap-4">
                  <span className="text-gray-700">Total</span>
                  <span className="flex gap-2 items-center">
                    <span className="text-gray-500 text-sm">PHP</span>
                    {formatMoney(totalWithTaxAndShipping())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CheckoutNav>
  );
}
