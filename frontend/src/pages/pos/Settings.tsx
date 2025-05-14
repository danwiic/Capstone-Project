import { useState } from "react";
import Layout from "../../components/pos/nav/Layout";
import DiscountSettings from "../../components/pos/settings/DiscountSettings";
import ShippingSettings from "../../components/pos/settings/ShippingSettings";
import CategorySettings from "../../components/pos/settings/CategorySettings";
import BrandsSettings from "../../components/pos/settings/BrandsSettings";
import TaxSettings from "../../components/pos/settings/TaxSettings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("discount");

  const filterTabs = [
    { name: "Discount", value: "discount", component: <DiscountSettings /> },
    { name: "Shipping", value: "shipping", component: <ShippingSettings /> },
    { name: "Categories", value: "category", component: <CategorySettings /> },
    { name: "Brands", value: "brand", component: <BrandsSettings /> },
    { name: "Tax", value: "tax", component: <TaxSettings /> },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-4 text-sm">
        <h1 className="text-xl font-bold mb-6">Settings</h1>

        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {filterTabs.map((tab) => (
              <button
                onClick={() => setActiveTab(tab.value.toLocaleLowerCase())}
                className={`py-4 px-6 font-medium ${
                  activeTab === tab.value.toLocaleLowerCase()
                    ? "border-b-2 border-mayormoto-blue text-mayormoto-blue"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="p-6">
            {filterTabs.length > 0 &&
              filterTabs.map((tab) => {
                if (tab.value === activeTab) {
                  return <>{tab.component}</>;
                }
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
