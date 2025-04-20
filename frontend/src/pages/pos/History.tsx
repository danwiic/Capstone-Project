import { IoSearchSharp } from "react-icons/io5";
import Layout from "../../components/pos/nav/Layout";
import Table from "../../components/pos/table";
import KebabMenu from "../../components/pos/menu/Kebab";
import { formatMoney } from "../../utils/formatMoney";
import Status from "../../components/pos/status card/Status";
import { TfiExport } from "react-icons/tfi";

export default function History() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-xl">Transaction History</span>
          <div>
            <button
              className="bg-mayormoto-blue text-white px-3 w-full
                        py-3 text-xs rounded-sm hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              Archived Records
            </button>
          </div>
        </div>
        <div className="bg-white py-2 shadow-1 rounded-sm">
          <div className="px-4 pt-2 flex justify-between items-center gap-4">
            <div className="bg-white border border-gray-300 rounded flex items-center">
              <input
                className="outline-none px-4 py-2 text-sm text-gray-600 w-full"
                placeholder="Search history..."
                type="text"
              />
              <button className="px-4 py-2">
                <IoSearchSharp />
              </button>
            </div>
            <div>
              <button
                className="bg-mayormoto-blue flex text-white
                           px-4 py-2 items-center gap-2 rounded text-sm
                           hover:bg-mayormoto-blue-hover cursor-pointer"
              >
                <TfiExport />
                Export
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
          <Table.DataTable status date>
            <Table.TableHead>
              <Table.TableRow>
                <Table.Header>
                  <input type="checkbox" />
                </Table.Header>
                <Table.Header>Transaction #</Table.Header>
                <Table.Header>Products</Table.Header>
                <Table.Header>Total Price</Table.Header>
                <Table.Header>Payment Method</Table.Header>
                <Table.Header>Status</Table.Header>
                <Table.Header>Source</Table.Header>
                <Table.Header>Processed on</Table.Header>
                <Table.Header>Processed By</Table.Header>

                <Table.Header></Table.Header>
              </Table.TableRow>
            </Table.TableHead>
            <Table.TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <Table.TableRow key={i}>
                  <Table.Header>
                    <input type="checkbox" />
                  </Table.Header>
                  <Table.Data>{i + 1}</Table.Data>
                  <Table.Data>Zebra Helmet 2x</Table.Data>
                  <Table.Data>{formatMoney(4600)}</Table.Data>
                  <Table.Data>CASH</Table.Data>
                  <Table.Data>
                    <Status status="completed" />
                  </Table.Data>
                  <Table.Data>ONLINE SHOP</Table.Data>
                  <Table.Data>April 16, 2025</Table.Data>
                  <Table.Data>Dan Pirante</Table.Data>

                  <Table.Data>
                    <KebabMenu
                      items={[
                        {
                          label: "Void Transaction",
                          onClick: () => console.log("void"),
                        },
                        {
                          label: "Archive",
                          onClick: () => console.log("Archive"),
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
  );
}
