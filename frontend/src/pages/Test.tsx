import { useState } from 'react';
import { Search, Plus, ArrowLeft, AlertTriangle, Download, Upload, Clock, Settings, User, Package, Zap, Archive, ChevronRight, Edit, Trash2, FileText } from 'lucide-react';

export default function Test() {
  const [view, setView] = useState('dashboard'); // dashboard, productDetail
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const products = [
    {
      id: 1,
      name: 'Classic T-Shirt',
      category: 'Apparel',
      totalStock: 143,
      hasVariants: true,
      price: '$19.99',
      image: '/api/placeholder/80/80',
      lowStockAlert: 20,
      variants: [
        { id: 101, sku: 'TS-BLK-S', color: 'Black', size: 'S', stock: 12, stockIn: 50, stockOut: 38 },
        { id: 102, sku: 'TS-BLK-M', color: 'Black', size: 'M', stock: 8, stockIn: 50, stockOut: 42 },
        { id: 103, sku: 'TS-BLK-L', color: 'Black', size: 'L', stock: 24, stockIn: 80, stockOut: 56 },
        { id: 104, sku: 'TS-WHT-S', color: 'White', size: 'S', stock: 35, stockIn: 70, stockOut: 35 },
        { id: 105, sku: 'TS-WHT-M', color: 'White', size: 'M', stock: 41, stockIn: 70, stockOut: 29 },
        { id: 106, sku: 'TS-WHT-L', color: 'White', size: 'L', stock: 23, stockIn: 50, stockOut: 27 },
      ],
      logs: [
        { action: 'Created', date: '2025-04-12', user: 'John Doe', details: 'Initial product creation' },
        { action: 'Stock In', date: '2025-04-15', user: 'Sarah Smith', details: 'Added 200 units in total' },
        { action: 'Stock Out', date: '2025-04-20', user: 'System', details: 'Automated order fulfillment - 57 units' },
        { action: 'Stock Out', date: '2025-04-20', user: 'System', details: 'Automated order fulfillment - 57 units' },
        { action: 'Stock Out', date: '2025-04-20', user: 'System', details: 'Automated order fulfillment - 57 units' },
        { action: 'Stock Out', date: '2025-04-20', user: 'System', details: 'Automated order fulfillment - 57 units' },
      ]
    },
    {
      id: 2,
      name: 'Wireless Earbuds',
      category: 'Electronics',
      totalStock: 54,
      hasVariants: false,
      price: '$79.99',
      image: '/api/placeholder/80/80',
      lowStockAlert: 15,
      sku: 'EL-WEB-01',
      stockIn: 100,
      stockOut: 46,
      logs: [
        { action: 'Created', date: '2025-03-22', user: 'Maria Johnson', details: 'Initial product creation' },
        { action: 'Stock In', date: '2025-03-25', user: 'Tom Wilson', details: 'Added 100 units' },
        { action: 'Price Update', date: '2025-04-05', user: 'Admin', details: 'Changed from $89.99 to $79.99' },
      ]
    },
    {
      id: 3,
      name: 'Leather Wallet',
      category: 'Accessories',
      totalStock: 12,
      hasVariants: true,
      price: '$49.99',
      image: '/api/placeholder/80/80',
      lowStockAlert: 10,
      variants: [
        { id: 301, sku: 'ACC-LW-BRN', color: 'Brown', stock: 5, stockIn: 30, stockOut: 25 },
        { id: 302, sku: 'ACC-LW-BLK', color: 'Black', stock: 7, stockIn: 30, stockOut: 23 },
      ],
      logs: [
        { action: 'Created', date: '2025-02-10', user: 'John Doe', details: 'Initial product creation' },
        { action: 'Stock In', date: '2025-02-15', user: 'Sarah Smith', details: 'Added 60 units in total' },
        { action: 'Low Stock Alert', date: '2025-04-28', user: 'System', details: 'Brown variant below threshold' },
      ]
    },
    {
      id: 4,
      name: 'Smart Watch',
      category: 'Electronics',
      totalStock: 8,
      hasVariants: true,
      price: '$199.99',
      image: '/api/placeholder/80/80',
      lowStockAlert: 10,
      variants: [
        { id: 401, sku: 'EL-SW-SLV', color: 'Silver', stock: 3, stockIn: 20, stockOut: 17 },
        { id: 402, sku: 'EL-SW-BLK', color: 'Black', stock: 5, stockIn: 20, stockOut: 15 },
      ],
      logs: [
        { action: 'Created', date: '2025-03-01', user: 'Tom Wilson', details: 'Initial product creation' },
        { action: 'Stock In', date: '2025-03-05', user: 'Maria Johnson', details: 'Added 40 units in total' },
        { action: 'Low Stock Alert', date: '2025-04-20', user: 'System', details: 'All variants below threshold' },
      ]
    },
    {
      id: 5,
      name: 'Coffee Mug',
      category: 'Home',
      totalStock: 87,
      hasVariants: false,
      price: '$12.99',
      image: '/api/placeholder/80/80',
      lowStockAlert: 20,
      sku: 'HM-CM-01',
      stockIn: 150,
      stockOut: 63,
      logs: [
        { action: 'Created', date: '2025-01-15', user: 'Sarah Smith', details: 'Initial product creation' },
        { action: 'Stock In', date: '2025-01-20', user: 'John Doe', details: 'Added 150 units' },
        { action: 'Stock Out', date: '2025-04-10', user: 'System', details: 'Bulk order - 40 units' },
      ]
    },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setView('productDetail');
  };

  const handleBackToDashboard = () => {
    setSelectedProduct(null);
    setView('dashboard');
  };

  const getStockStatusColor = (stock, lowStockAlert) => {
    if (stock <= lowStockAlert / 2) return 'text-red-600';
    if (stock <= lowStockAlert) return 'text-yellow-500';
    return 'text-green-600';
  };

  // Dashboard View
  const renderDashboard = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex space-x-4">
          <button className="bg-gray-100 p-2 rounded-md">
            <Settings size={20} />
          </button>
          <button className="bg-gray-100 p-2 rounded-md">
            <User size={20} />
          </button>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex justify-between items-center p-4 bg-white">
        <div className="flex items-center w-1/2 bg-gray-100 rounded-md px-3 py-2">
          <Search size={20} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="bg-transparent border-none focus:outline-none ml-2 w-full"
          />
        </div>
        <div className="flex space-x-2">
          <select className="bg-white border rounded-md px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Apparel</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Home</option>
          </select>
          <select className="bg-white border rounded-md px-3 py-2 text-sm">
            <option>All Stock Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
          <button className="bg-indigo-600 text-white rounded-md px-4 py-2 flex items-center text-sm">
            <Plus size={16} className="mr-1" /> Add Product
          </button>
        </div>
      </div>
      
      {/* Alert Bar - Low Stock */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle size={20} className="text-yellow-500 mr-2" />
          <span>3 products are running low on stock and need attention</span>
        </div>
        <button className="text-indigo-600 text-sm font-medium">View All Alerts</button>
      </div>
      
      {/* Product List */}
      <div className="flex-grow overflow-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(product => (
              <tr 
                key={product.id} 
                className="hover:bg-gray-50 cursor-pointer" 
                onClick={() => handleProductClick(product)}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    {/* <img src={product.image} className="w-10 h-10 rounded-md mr-3" /> */}
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-gray-500">
                        {product.hasVariants ? `${product.variants.length} variants` : 'No variants'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm">{product.category}</td>
                <td className="py-4 px-4">
                  <div className={`font-medium ${getStockStatusColor(product.totalStock, product.lowStockAlert)}`}>
                    {product.totalStock} units
                  </div>
                  {product.totalStock <= product.lowStockAlert && (
                    <div className="text-xs text-yellow-500 flex items-center mt-1">
                      <AlertTriangle size={12} className="mr-1" />
                      Low stock
                    </div>
                  )}
                </td>
                <td className="py-4 px-4">{product.price}</td>
                <td className="py-4 px-4 text-sm">
                  {product.hasVariants ? 'Multiple' : product.sku}
                </td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-indigo-600" onClick={(e) => e.stopPropagation()}>
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-red-600" onClick={(e) => e.stopPropagation()}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-t">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-bold mt-1">304</div>
          <div className="text-xs text-green-500 mt-1">+12% from last month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Low Stock Items</div>
          <div className="text-2xl font-bold mt-1 text-yellow-500">17</div>
          <div className="text-xs text-red-500 mt-1">+5 from last week</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Out of Stock</div>
          <div className="text-2xl font-bold mt-1">3</div>
          <div className="text-xs text-green-500 mt-1">-2 from last week</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Inventory Value</div>
          <div className="text-2xl font-bold mt-1">$248,392</div>
          <div className="text-xs text-green-500 mt-1">+5% from last month</div>
        </div>
      </div>
    </div>
  );

  // Product Detail View
  const renderProductDetail = () => {
    if (!selectedProduct) return null;
    
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <button 
              onClick={handleBackToDashboard}
              className="mr-4 p-2 rounded-md hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">{selectedProduct.name}</h1>
          </div>
          <div className="flex space-x-2">
            <button className="bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2 text-sm flex items-center">
              <Edit size={16} className="mr-1" /> Edit
            </button>
            <button className="bg-indigo-600 text-white rounded-md px-4 py-2 flex items-center text-sm">
              <Plus size={16} className="mr-1" /> Add Stock
            </button>
          </div>
        </div>
        
        {/* Product Summary */}
        <div className="grid grid-cols-4 gap-6 p-6 bg-white border-b">
          <div className="col-span-1">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full aspect-square rounded-lg" />
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500">Category</div>
                <div className="font-medium mt-1">{selectedProduct.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Price</div>
                <div className="font-medium mt-1">{selectedProduct.price}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Stock</div>
                <div className={`font-medium mt-1 ${getStockStatusColor(selectedProduct.totalStock, selectedProduct.lowStockAlert)}`}>
                  {selectedProduct.totalStock} units
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Stock Status</div>
                <div className="mt-1">
                  {selectedProduct.totalStock <= selectedProduct.lowStockAlert / 2 ? (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Critical Low</span>
                  ) : selectedProduct.totalStock <= selectedProduct.lowStockAlert ? (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Low Stock</span>
                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Stock</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Low Stock Alert</div>
                <div className="font-medium mt-1">{selectedProduct.lowStockAlert} units</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Last Updated</div>
                <div className="font-medium mt-1">May 1, 2025</div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-6 flex gap-4">
              <button className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
                <Download size={16} className="mr-1" /> Export
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
                <Upload size={16} className="mr-1" /> Import
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
                <Clock size={16} className="mr-1" /> View History
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
                <Package size={16} className="mr-1" /> Generate Barcode
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b">
          <button className="py-3 px-6 border-b-2 border-indigo-600 text-indigo-600 font-medium">
            Variants & Stock
          </button>
          <button className="py-3 px-6 text-gray-500 font-medium">
            Activity Logs
          </button>
          <button className="py-3 px-6 text-gray-500 font-medium">
            Orders
          </button>
        </div>
        
        {/* Variants Section */}
        <div className="flex-grow overflow-auto p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium">
              {selectedProduct.hasVariants 
                ? `${selectedProduct.variants.length} Variants` 
                : 'Product Details'}
            </h2>
            {selectedProduct.hasVariants && (
              <button className="text-sm text-indigo-600 flex items-center">
                <Plus size={16} className="mr-1" /> Add Variant
              </button>
            )}
          </div>
          
          {selectedProduct.hasVariants ? (
            <table className="min-w-full bg-white border rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  {selectedProduct.variants[0].color && (
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                  )}
                  {selectedProduct.variants[0].size && (
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  )}
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock In</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Out</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedProduct.variants.map(variant => (
                  <tr key={variant.id}>
                    <td className="py-3 px-4 font-medium">{variant.sku}</td>
                    {variant.color && (
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full mr-2 bg-${variant.color.toLowerCase() === 'black' ? 'black' : variant.color.toLowerCase() === 'white' ? 'gray-200' : 'blue-500'}`}></div>
                          {variant.color}
                        </div>
                      </td>
                    )}
                    {variant.size && (
                      <td className="py-3 px-4">{variant.size}</td>
                    )}
                    <td className="py-3 px-4">
                      <div className={getStockStatusColor(variant.stock, selectedProduct.lowStockAlert / variant.id)}>
                        {variant.stock} units
                      </div>
                    </td>
                    <td className="py-3 px-4 text-green-600">{variant.stockIn}</td>
                    <td className="py-3 px-4 text-red-600">{variant.stockOut}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-500 hover:text-indigo-600">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-green-600">
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="p-6 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-500">SKU</div>
                  <div className="font-medium mt-1">{selectedProduct.sku}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Current Stock</div>
                  <div className={`font-medium mt-1 ${getStockStatusColor(selectedProduct.totalStock, selectedProduct.lowStockAlert)}`}>
                    {selectedProduct.totalStock} units
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Restock Point</div>
                  <div className="font-medium mt-1">{selectedProduct.lowStockAlert} units</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Stock In</div>
                  <div className="font-medium mt-1 text-green-600">{selectedProduct.stockIn} units</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Stock Out</div>
                  <div className="font-medium mt-1 text-red-600">{selectedProduct.stockOut} units</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Last Stock Update</div>
                  <div className="font-medium mt-1">April 28, 2025</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Activity Logs */}
          <div className="mt-8">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-medium">Recent Activity</h2>
              <button className="text-sm text-indigo-600 flex items-center">
                <FileText size={16} className="mr-1" /> View All Logs
              </button>
            </div>
            
            <div className="bg-white border rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {selectedProduct.logs.map((log, index) => (
                  <li key={index} className="p-4">
                    <div className="flex items-start">
                      <div className={`mt-1 rounded-full p-2 ${
                        log.action === 'Created' ? 'bg-blue-100 text-blue-600' :
                        log.action === 'Stock In' ? 'bg-green-100 text-green-600' :
                        log.action === 'Stock Out' ? 'bg-red-100 text-red-600' :
                        log.action === 'Low Stock Alert' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {log.action === 'Created' ? <Zap size={16} /> :
                         log.action === 'Stock In' ? <Upload size={16} /> :
                         log.action === 'Stock Out' ? <Download size={16} /> :
                         log.action === 'Low Stock Alert' ? <AlertTriangle size={16} /> :
                         <Archive size={16} />}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{log.action}</div>
                          <div className="text-sm text-gray-500">{log.date}</div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{log.details}</div>
                        <div className="text-xs text-gray-500 mt-1">By {log.user}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Sidebar */}
      <div className="flex h-full">
        <div className="w-16 bg-indigo-800 flex flex-col items-center py-6">
          <div className="w-8 h-8 bg-white rounded-md mb-8 flex items-center justify-center text-indigo-800 font-bold">I</div>
          <button className="p-3 rounded-md bg-indigo-700 text-white mb-4">
            <Package size={20} />
          </button>
          <button className="p-3 rounded-md text-indigo-300 hover:text-white mb-4">
            <Zap size={20} />
          </button>
          <button className="p-3 rounded-md text-indigo-300 hover:text-white mb-4">
            <Archive size={20} />
          </button>
          <button className="p-3 rounded-md text-indigo-300 hover:text-white mb-4">
            <FileText size={20} />
          </button>
          <div className="flex-grow"></div>
          <button className="p-3 rounded-md text-indigo-300 hover:text-white">
            <Settings size={20} />
          </button>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow">
          {view === 'dashboard' && renderDashboard()}
          {view === 'productDetail' && renderProductDetail()}
        </div>
      </div>
    </div>
  );
}






























































// import { useReducer } from "react";
// export default function Test() {
//   const [state, action] = useReducer(reducerIncrement, {
//     count: 0,
//     error: String || null,
//   });
//   return (
//     <div className="p-16 flex flex-col ">
//       <span>{state.count}</span>
//       {state.error && <span className="text-red-500">{state.error}</span>}

//       <div className="flex gap-4">
//         <button onClick={() => action({ type: "increment" })}>increment</button>
//         <button onClick={() => action({ type: "decrement" })}>decrement</button>
//         <button onClick={() => action({ type: "reset" })}>reset</button>
//       </div>
//     </div>
//   );
// }

// type State = {
//   count: number;
//   error: string | null;
// };

// type Action = {
//   type: "increment" | "decrement" | "reset";
// };

// function reducerIncrement(state: State, action: Action) {
//   const { type } = action;

//   switch (type) {
//     case "increment": {
//       const count = state.count + 1;
//       return {
//         ...state,
//         count,
//         error: null,
//       };
//     }
//     case "decrement": {
//       const count = state.count - 1;
//       const hasError = count < 0;
//       return {
//         ...state,
//         count: hasError ? state.count : count,
//         error: hasError ? "Cannot go down 0" : null,
//       };
//     }
//     case "reset":
//       return { ...state, count: (state.count = 0) };
//     default:
//       break;
//   }
// }
