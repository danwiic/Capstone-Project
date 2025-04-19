import Data from "./Data";
import DataTable from "./DataTable";
import Header from "./Header";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

type DataType = typeof Data & {
  TableBody: typeof TableBody;
  TableHead: typeof TableHead;
  TableRow: typeof TableRow;
  Header: typeof Header;
  DataTable: typeof DataTable;
  Data: typeof Data;
};

const Table = Data as DataType;
Table.TableBody = TableBody;
Table.TableHead = TableHead;
Table.TableRow = TableRow;
Table.Header = Header;
Table.DataTable = DataTable;
Table.Data = Data;

export default Table;
