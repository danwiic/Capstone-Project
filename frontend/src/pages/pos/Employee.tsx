import { IoSearchSharp } from "react-icons/io5";
import Layout from "../../components/pos/nav/Layout";
import Table from "../../components/pos/table";
import Status from "../../components/pos/status card/Status";
import KebabMenu from "../../components/pos/menu/Kebab";

export default function Employee() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-lg">Employee</span>
          <div className="flex gap-4 items-center w-1/4">
            <button
              className="bg-mayormoto-blue text-white px-3 w-full
                           py-3 text-xs rounded-sm hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              Archived Accounts
            </button>
            <button
              className="bg-mayormoto-blue text-white px-3 w-full
                           py-3 text-xs rounded-sm hover:bg-mayormoto-blue-hover cursor-pointer"
            >
              Add Employee
            </button>
          </div>
        </div>
        <div className="bg-white py-2 shadow-1 rounded-sm">
          <div className="px-4 pt-2 flex justify-between items-center gap-4">
            <div className="bg-white border border-gray-300 rounded flex items-center">
              <input
                className="outline-none px-4 py-2 text-sm text-gray-600 w-full"
                placeholder="Search employees..."
                type="text"
              />
              <button className="px-4 py-2">
                <IoSearchSharp />
              </button>
            </div>
          </div>
          <Table.DataTable>
            <Table.TableHead>
              <Table.TableRow>
                <Table.Header>
                  <input type="checkbox" />
                </Table.Header>
                <Table.Header>Employee #</Table.Header>
                <Table.Header>Name</Table.Header>
                <Table.Header>Email</Table.Header>
                <Table.Header>Contact#</Table.Header>
                <Table.Header>Status</Table.Header>
                <Table.Header>Created On</Table.Header>

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
                  <Table.Data>Dan Pirante</Table.Data>
                  <Table.Data>dan@example.com</Table.Data>
                  <Table.Data>09123456789</Table.Data>
                  <Table.Data>
                    <Status status="active" />
                  </Table.Data>
                  <Table.Data>April 16, 2025</Table.Data>

                  <Table.Data>
                    <KebabMenu
                      items={[
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
