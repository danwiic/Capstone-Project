import { IoSearchSharp } from "react-icons/io5";
import KebabMenu from "../../components/pos/menu/Kebab";
import Layout from "../../components/pos/nav/Layout";
import Table from "../../components/pos/table";
import { formatMoney } from "../../utils/formatMoney";
import Status from "../../components/pos/status card/Status";

export default function Orders() {
  return (
    <div>
      <Layout>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-xl">Orders</span>
            <div>
               <button
                className="bg-mayormoto-blue text-white px-3 w-full
                       py-3 text-xs rounded-sm hover:bg-mayormoto-blue-hover cursor-pointer"
              >
                Archived Orders
              </button> 
            </div>
          </div>
          <div className="bg-white py-2 shadow-1 rounded-sm">
            <div className="px-4 pt-2 flex justify-between items-center gap-4">
              <div className="bg-white border border-gray-300 rounded flex items-center">
                <input
                  className="outline-none px-4 py-2 text-sm text-gray-600 w-full"
                  placeholder="Search orders..."
                  type="text"
                />
                <button className="px-4 py-2">
                  <IoSearchSharp />
                </button>
              </div>
              {/* <div>
                <button
                  className="text-sm bg-mayormoto-blue text-white px-4 py-2 rounded
                cursor-pointer hover:bg-mayormoto-blue-hover"
                >
                  Archived Orders
                </button>
              </div> */}
              {/* <div className="flex gap-4 text-sm">
                <div className="flex gap-2 items-center">
                  <span className="text-gray-600">Category</span>
                  <select
                    className="border rounded border-gray-300 
                              text-sm p-1 text-center text-gray-600"
                  >
                    <option>All Category</option>
                    <option>1</option>
                    <option>1</option>
                  </select>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-gray-600">Brand</span>
                  <select
                    className="border rounded border-gray-300 
                              text-sm p-1 text-center text-gray-600"
                  >
                    <option>All Brand</option>
                    <option>1</option>
                    <option>1</option>
                  </select>
                </div>
              </div> */}
            </div>
            <Table.DataTable status>
              <Table.TableHead>
                <Table.TableRow>
                  <Table.Header>#</Table.Header>
                  <Table.Header>Customer Name</Table.Header>
                  <Table.Header>Products</Table.Header>
                  <Table.Header>Total Price</Table.Header>
                  <Table.Header>Address</Table.Header>
                  <Table.Header>Contact No.</Table.Header>
                  <Table.Header>Status</Table.Header>
                  <Table.Header>Ordered on</Table.Header>

                  <Table.Header></Table.Header>
                </Table.TableRow>
              </Table.TableHead>
              <Table.TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Table.TableRow key={i}>
                    <Table.Data>{i + 1}</Table.Data>
                    <Table.Data>Dan Pirante</Table.Data>
                    <Table.Data>Zebra Helmet 2x, Snok Top Box 1x</Table.Data>
                    <Table.Data>{formatMoney(6100)}</Table.Data>
                    <Table.Data>
                      2231 St. Barangay 200 Cavite City Cavite
                    </Table.Data>
                    <Table.Data>09123456789</Table.Data>
                    <Table.Data>
                      <Status status="PENDING" />
                    </Table.Data>
                    <Table.Data>April 16, 2025</Table.Data>

                    <Table.Data>
                      <KebabMenu
                        items={[
                          {
                            label: "Update Status",
                            onClick: () => console.log("Update"),
                          },
                        ]}
                      />
                    </Table.Data>
                  </Table.TableRow>
                ))}
              </Table.TableBody>
            </Table.DataTable>
          </div>
        </div>
      </Layout>
    </div>
  );
}
