import { useState } from "react";
import Layout from "../../components/pos/nav/Layout";
import ProductList from "../../components/pos/ProductComp/ProductList";
import ProductDetails from "../../components/pos/ProductComp/ProductDetails";
import ProductLogs from "../../components/modal/ProductLogs";

export default function Products() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const [viewLogs, setViewLogs] = useState(false);

  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
    console.log("Selected Product ID:", productId);
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  const selectLogs = () => {
    setViewLogs((prev) => !prev);
  };

  return (
    <div className="w-full">
      <Layout>
        <div className="w-auto">
          {selectedProductId ? (
            <ProductDetails
              productId={selectedProductId}
              onBack={handleBackToList}
            />
          ) : viewLogs ? (
            <ProductLogs openLogs={() => selectLogs()}/>
          ) : (
            <ProductList
              openLogs={() => selectLogs()}
              onProductSelect={handleViewProduct}
            />
          )}
        </div>
      </Layout>
    </div>
  );
}
