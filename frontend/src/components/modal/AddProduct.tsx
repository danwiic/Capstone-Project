import { useEffect, useState } from "react";
import { X, Plus, Trash } from "lucide-react";
import axios from "axios";
interface AddProductProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Variant {
  id: string;
  sku: string;
  variantName: string;
  price: number;
  stock: number;
}

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

export default function ProductModal({ isOpen, onClose }: AddProductProps) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [hasVariants, setHasVariants] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([
    { id: "variant-1", sku: "", variantName: "", price: 0, stock: 0 },
  ]);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/category/");
        setCategories(response.data.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:3000/brand/");
        setBrands(response.data.brands);
        console.log(response.data, "brands");
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
    fetchCategories();
  }, []);

  console.log(imageUrls, "imageUrls");

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: `variant-${variants.length + 1}`,
        sku: "",
        variantName: "",
        price: 0,
        stock: 0,
      },
    ]);
  };

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      setVariants(variants.filter((variant) => variant.id !== id));
    }
  };

  const updateVariant = (id: string, field: string, value: string | number) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  if (!isOpen) return null;

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/product/create",
        {
          name: productName,
          description,
          categoryId: selectedCategory,
          brandId: brand,
          images: imageUrls.filter((url) => url.trim() !== ""), // Filter out empty URLs
          price: hasVariants ? null : parseFloat(price),
          variants: hasVariants ? variants : [],
        }
      );
      setProductName("");
      setPrice("");
      setDescription("");
      setSelectedCategory("");
      setBrand("");
      setImageUrls([""]);
      setHasVariants(false);
      setVariants([
        { id: "variant-1", sku: "", variantName: "", price: 0, stock: 0 },
      ]); // Reset variants to initial state

      console.log("Product created successfully:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setProductName("");
      setPrice("");
      setDescription("");
      setSelectedCategory("");
      setBrand("");
      setImageUrls([""]);
      setHasVariants(false);
      setVariants([
        { id: "variant-1", sku: "", variantName: "", price: 0, stock: 0 },
      ]);
    }
  }, [isOpen]);

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("images", file); // Change "file" to "images" to match the backend

      try {
        const res = await axios.post(
          "http://localhost:3000/image/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        uploadedUrls.push(...res.data.urls);
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }

    setImageUrls((prev) => [...prev, ...uploadedUrls]);
  };

  const handleImageRemove = (url: string) => {
    setImageUrls((prev) => prev.filter((imageUrl) => imageUrl !== url));
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center 
    p-4 backdrop-blur-sm"
    >
      <div className="flex flex-col bg-white w-full max-w-2xl p-6 rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center pb-4 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-800">ADD NEW PRODUCT</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmitProduct} className="overflow-hidden">
          <div
            className="overflow-auto max-h-120  scrollbar-thin scroll-ml-4 
          scrollbar-thumb-gray-300 scrollbar-track-gray-50 
         "
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name Field */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={productName}
                  placeholder="Enter product name"
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Price & Stock (shown only if no variants) */}
              {!hasVariants && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price<span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        ₱
                      </span>
                      <input
                        type="number"
                        value={price}
                        placeholder="0"
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full text-sm pl-8 px-3 py-2 border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                      [&::-webkit-inner-spin-button]:appearance-none"
                        required={!hasVariants}
                        min="0"
                        max={100000}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SKU<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="SKU"
                      className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none"
                      min="0"
                    />
                  </div>
                </>
              )}

              {/* Category & Brand Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category<span className="text-red-600">*</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-sm px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand<span className="text-red-600">*</span>
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full text-sm px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a brand</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a brief description of the product..."
                  rows={4}
                  className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Image URLs Section */}
              <div className="col-span-2 flex  gap-3">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="attach"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                  >
                    Upload Image Files
                  </label>
                  <div className="flex gap-3 items-center">
                    <div>
                      <label htmlFor="attach" className="w-fit">
                        <Plus
                          size={45}
                          className="p-3 text-white bg-mayormoto-pink
                       rounded-full cursor-pointer hover:bg-mayormoto-pink/80"
                        />
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="attach"
                        name="attach"
                        multiple
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                      />
                    </div>
                    <div className="flex gap-3 flex-wrap mt-2">
                      {imageUrls.length > 0 &&
                        imageUrls.map((url, i) => (
                          <div key={i} className="relative w-16">
                            <img src={url} className="h-auto w-full" />
                            <X
                              size={25}
                              onClick={() => handleImageRemove(url)}
                              className="absolute -top-2 -right-2
                        bg-gray-200 rounded-full text-gray-500 p-1
                         cursor-pointer"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Variant Checkbox */}
              <div className="col-span-2">
                <div className="flex items-center gap-1">
                  <input
                    id="has-variants"
                    type="checkbox"
                    checked={hasVariants}
                    onChange={(e) => setHasVariants(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="has-variants"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    This product has variants (sizes, colors, etc.)
                  </label>
                </div>
              </div>
            </div>

            {/* Variants Section */}
            {hasVariants && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Product Variants
                </h3>

                {variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-md relative"
                  >
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(variant.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        aria-label="Remove variant"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Variant Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={variant.variantName}
                        onChange={(e) =>
                          updateVariant(
                            variant.id,
                            "variantName",
                            e.target.value
                          )
                        }
                        placeholder="e.g. Small, Red, etc."
                        className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SKU<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) =>
                          updateVariant(variant.id, "sku", e.target.value)
                        }
                        className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price<span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          ₱
                        </span>
                        <input
                          type="number"
                          value={variant.price}
                          onChange={(e) =>
                            updateVariant(
                              variant.id,
                              "price",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full text-sm pl-8 px-3 py-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                        [&::-webkit-inner-spin-button]:appearance-none"
                          required
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addVariant}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Another Variant
                </button>
              </div>
            )}
          </div>
          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white flex justify-end gap-2 space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
