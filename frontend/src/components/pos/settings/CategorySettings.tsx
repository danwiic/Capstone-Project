import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Edit, Trash } from "lucide-react";
const API_URL = "http://localhost:3000";

interface Category {
  id: string;
  name: string;
  productCount?: number;
}

export default function CategorySettings() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/category/`);
      setCategories(response.data.category || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/category/new`, {
        name: newCategoryName.trim(),
      });

      toast.success("Category added successfully");
      setNewCategoryName("");
      setIsAdding(false);
      fetchCategories();
    } catch (error: any) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.error || "Failed to add category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editingCategory.name.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(`${API_URL}/category/update/${editingCategory.id}`, {
        name: editingCategory.name.trim(),
      });

      toast.success("Category updated successfully");
      setEditingCategory(null);
      fetchCategories();
    } catch (error: any) {
      console.error("Error updating category:", error);
      toast.error(error.response?.data?.error || "Failed to update category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/category/delete/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast.error(error.response?.data?.error || "Failed to delete category");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white flex flex-col gap-4 rounded-sm ">
      <div className="">
        <h2 className="text-xl font-semibold text-gray-800">
          Category
        </h2>
      </div>

      {/* Search and Add Section */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-mayormoto-blue focus:border-mayormoto-blue"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <button
          onClick={fetchCategories}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none flex items-center justify-center space-x-2"
        >
          <span>Refresh</span>
        </button>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-mayormoto-blue text-white rounded-md hover:bg-mayormoto-blue-hover focus:outline-none flex items-center justify-center space-x-2"
        >
          <span>Add Category</span>
        </button>
      </div>

      {/* Add New Category Input */}
      {isAdding && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-md font-medium mb-3 text-gray-700">
            Add New Category
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-mayormoto-blue focus:border-mayormoto-blue"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddCategory}
                disabled={isLoading}
                className="px-4 py-2 bg-mayormoto-blue text-white rounded-md hover:bg-mayormoto-blue-hover focus:outline-none"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewCategoryName("");
                }}
                className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Count
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading && categories.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Loading categories...
                </td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {searchQuery
                    ? "No categories match your search"
                    : "No categories found. Add your first category!"}
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingCategory?.id === category.id ? (
                      <input
                        type="text"
                        value={editingCategory.name}
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            name: e.target.value,
                          })
                        }
                        className="w-full outline-0 px-2 py-2
                         border border-gray-300 rounded-sm
                          outline-none text-sm"
                      />
                    ) : (
                      <span className="text-sm font-medium text-gray-900">
                        {category.name}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {category.productCount || 0} products
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingCategory?.id === category.id ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleUpdateCategory}
                          disabled={isLoading}
                          className="text-green-600 hover:text-green-500"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setEditingCategory(category)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
