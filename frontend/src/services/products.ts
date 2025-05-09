import axios from "axios";

const API_URL = "http://localhost:3000";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/product/all?limit=10`);
    return res.data.products;
  } catch (error) {
    console.log("Error fetching products:", error);
  }
};

export const getProductById = async (productId: string) => {
  try {
    const res = await axios.get(`${API_URL}/product/${productId}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching product by ID:", error);
  }
};

export const getDetailedProduct = async (productId: string) => {
  try {
    const res = await axios.get(`${API_URL}/product/detailed/${productId}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching product by ID:", error);
  }
};

export const updateVariant = async (
  id: string,
  userId: string,
  sku?: string,
  variantName?: string,
  price?: number,
  reOrderLevel?: number
) => {
  const payload: any = {
    userId,
    id,
  };
  if (sku !== undefined) payload.sku = sku;
  if (variantName !== undefined) payload.variantName = variantName;
  if (price !== undefined) payload.price = price;
  if (reOrderLevel !== undefined) payload.reOrderLevel = reOrderLevel;

  try {
    const res = await axios.put(`${API_URL}/product/update/variant`, payload);
    return res.data;
  } catch (error) {
    console.error("Error updating variant:", error);
    throw error;
  }
};
