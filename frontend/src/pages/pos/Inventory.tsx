import { IoSearchSharp } from "react-icons/io5";
import Layout from "../../components/pos/nav/Layout";
import Table from "../../components/pos/table/index";
import formatNumber from "../../utils/formatNumber";
import KebabMenu from "../../components/pos/menu/Kebab";

export default function Inventory() {
  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-xl">Inventory</span>
            <div>
              <button
                className="bg-mayormoto-blue text-white px-3 w-full
               py-2 text-xs rounded-sm hover:bg-mayormoto-blue-hover cursor-pointer"
              >
                Inventory Logs
              </button>
            </div>
          </div>
          <div className="bg-white p-4 shadow-1 rounded-sm">
            <div className="px-4 pt-2 flex justify-between items-center gap-4">
              <div className="bg-white border border-gray-300 rounded flex items-center">
                <input
                  className="outline-none px-4 py-2 text-sm text-gray-600 w-full"
                  placeholder="Search products..."
                  type="text"
                />
                <button className="px-4 py-2">
                  <IoSearchSharp />
                </button>
              </div>
              <div className="flex gap-4 text-sm">
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
              </div>
            </div>
            <Table.DataTable>
              <Table.TableHead>
                <Table.TableRow>
                  <Table.Header>#</Table.Header>
                  <Table.Header>Product Name</Table.Header>
                  <Table.Header>Category</Table.Header>
                  <Table.Header>Brand</Table.Header>
                  <Table.Header>Availabe Stock</Table.Header>
                  <Table.Header>Variant/s</Table.Header>
                  <Table.Header>Created By</Table.Header>
                  <Table.Header>Created At</Table.Header>
                  <Table.Header>Updated By</Table.Header>
                  <Table.Header>Last Update</Table.Header>
                  <Table.Header></Table.Header>
                </Table.TableRow>
              </Table.TableHead>
              <Table.TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Table.TableRow key={i}>
                    <Table.Data>{i + 1}</Table.Data>
                    <Table.Data>Gille Helmet Green</Table.Data>
                    <Table.Data>Helmet</Table.Data>
                    <Table.Data>Gille</Table.Data>
                    <Table.Data>{formatNumber(2)}</Table.Data>
                    <Table.Data>MD, LG, XL, 2XL</Table.Data>
                    <Table.Data>Dan</Table.Data>
                    <Table.Data>April 10, 2025</Table.Data>
                    <Table.Data>Dan</Table.Data>
                    <Table.Data>April 16, 2025</Table.Data>
                    <Table.Data>
                      <KebabMenu
                        items={[
                          {
                            label: "Update Inventory",
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
    </>
  );
}
