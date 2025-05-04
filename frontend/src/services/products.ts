import axios from "axios";

const API_URL = "http://localhost:3000";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/product/all`);
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
}
