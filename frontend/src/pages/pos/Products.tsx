import { useState } from "react";
import Layout from "../../components/pos/nav/Layout";
import ProductList from "../../components/pos/ProductComp/ProductList";
import ProductDetails from "../../components/pos/ProductComp/ProductDetails";

export default function Products() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
    console.log("Selected Product ID:", productId);
    
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  return (
    <Layout>
      {selectedProductId ? (
        <ProductDetails
          productId={selectedProductId}
          onBack={handleBackToList}
        />
      ) : (
        <ProductList onProductSelect={handleViewProduct} />
      )}
    </Layout>
  );
}
