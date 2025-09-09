import React, { useState, useEffect } from "react";

import {
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import LoginPage from "./pages/LoginPage";
import SalesPage from "./pages/SalesPage";
import InventoryPage from "./pages/InventoryPage";
import CustomersPage from "./pages/CustomersPage";

import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import ToolsPage from "./pages/ToolsPage";
import HelpPage from "./pages/HelpPage";
import NewSupplierPage from "./pages/NewSupplierPage";
import ProductGroupDashboard from "./pages/items/ProductGroupDashboard";
import ProductSubGroupDashboard from "./pages/items/ProductSubGroupDashboard";
import ListItemGroupsDashboard from "./pages/items/ListItemGroupsDashboard";
import QuickSearchDashboard from "./pages/items/QuickSearchDashboard";
import QuickSearchBalancesDashboard from "./pages/items/QuickSearchBalancesDashboard";
import ViewSellingPriceSearchDashboard from "./pages/items/ViewSellingPriceSearchDashboard";
import ItemsListBuyingPriceDashboard from "./pages/items/ItemsListBuyingPriceDashboard";
import LowStockItemsDashboard from "./pages/items/LowStockItemsDashboard";
import ListUnitsMeasureDashboard from "./pages/items/ListUnitsMeasureDashboard";
import AdjustStockDashboard from "./pages/items/AdjustStockDashboard";
import QuickPurchaseDashboard from "./pages/items/QuickPurchaseDashboard";
import TransformStockDashboard from "./pages/items/TransformStockDashboard";
import ItemJournalDashboard from "./pages/items/ItemJournalDashboard";
import ListItemsValueDashboard from "./pages/items/ListItemsValueDashboard";
import HSCodesDashboard from "./pages/items/HSCodesDashboard";
import SuppliersListDashboard from "./pages/suppliers/SuppliersListDashboard";
import ReceiveGoodsDashboard from "./pages/suppliers/ReceiveGoodsDashboard";
import ListGoodsReceivedDashboard from "./pages/suppliers/ListGoodsReceivedDashboard";
import ReturnGoodsDashboard from "./pages/suppliers/ReturnGoodsDashboard";
import ListReturnedGoodsDashboard from "./pages/suppliers/ListReturnedGoodsDashboard";
import MakePaymentSupplierDashboard from "./pages/suppliers/MakePaymentSupplierDashboard";
import ReceiveCashSupplierDashboard from "./pages/suppliers/ReceiveCashSupplierDashboard";
import ModifySupplierStatementDashboard from "./pages/suppliers/ModifySupplierStatementDashboard";
import ListPaymentsReceiptsDashboard from "./pages/suppliers/ListPaymentsReceiptsDashboard";
import SupplierStatementAccountDashboard from "./pages/suppliers/SupplierStatementAccountDashboard";
import NewCustomerDashboard from "./pages/customers/NewCustomerDashboard";
import ListCustomersDashboard from "./pages/customers/ListCustomersDashboard";
import NewSaleDashboard from "./pages/customers/NewSaleDashboard";
import NewSalesReturnDashboard from "./pages/customers/NewSalesReturnDashboard";
import ListReturnedSalesDashboard from "./pages/customers/ListReturnedSalesDashboard";
import ListInvoicesDashboard from "./pages/customers/ListInvoicesDashboard";
import ListCashSalesDashboard from "./pages/customers/ListCashSalesDashboard";
import ListCreditSalesDashboard from "./pages/customers/ListCreditSalesDashboard";
import UninvoicedCreditSalesDashboard from "./pages/customers/UninvoicedCreditSalesDashboard";
import ReceivePaymentCustomerDashboard from "./pages/customers/ReceivePaymentCustomerDashboard";
import GiveCashCustomerDashboard from "./pages/customers/GiveCashCustomerDashboard";
import AdjustCustomerStatementDashboard from "./pages/customers/AdjustCustomerStatementDashboard";
import ListPaymentsPayoutsDashboard from "./pages/customers/ListPaymentsPayoutsDashboard";
import CustomersWithBalancesDashboard from "./pages/customers/CustomersWithBalancesDashboard";
import CustomerStatementAccountDashboard from "./pages/customers/CustomerStatementAccountDashboard";
import LoyaltyCustomersDashboard from "./pages/customers/LoyaltyCustomersDashboard";
import ReportsDashboard from "./pages/ReportsDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import ToolsDashboard from "./pages/ToolsDashboard";
import HelpDashboard from "./pages/HelpDashboard";
import { AppProvider } from "./contexts/AppContext";

type Page =
  | "login"
  | "dashboard"
  | "sales"
  | "inventory"
  | "customers"
  | "reports"
  | "settings"
  | "tools"
  | "help"
  | "new-supplier"
  | "product-group"
  | "product-sub-group"
  | "list-item-groups"
  | "new-item"
  | "quick-search"
  | "quick-search-balances"
  | "view-selling-price-search"
  | "items-list-buying-price"
  | "low-stock-items"
  | "list-units-measure"
  | "adjust-stock"
  | "quick-purchase"
  | "transform-stock"
  | "item-journal"
  | "list-items-value"
  | "hs-codes"
  | "suppliers-list"
  | "receive-goods"
  | "list-goods-received"
  | "return-goods"
  | "list-returned-goods"
  | "make-payment-supplier"
  | "receive-cash-supplier"
  | "modify-supplier-statement"
  | "list-payments-receipts"
  | "supplier-statement-account"
  | "new-customer"
  | "list-customers"
  | "new-sale"
  | "new-sales-return"
  | "list-returned-sales"
  | "list-invoices"
  | "list-cash-sales"
  | "list-credit-sales"
  | "uninvoiced-credit-sales"
  | "receive-payment-customer"
  | "give-cash-customer"
  | "adjust-customer-statement"
  | "list-payments-payouts"
  | "customers-with-balances"
  | "customer-statement-account"
  | "loyalty-customers"
  | "reports-dashboard"
  | "finance-dashboard"
  | "tools-dashboard"
  | "help-dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Listen for menu actions from Electron
    if (window.electronAPI) {
      window.electronAPI.onMenuAction((_, action) => {
        if (!isAuthenticated) return;
        switch (action) {
          case "dashboard":
            setCurrentPage("dashboard");
            break;
          case "sales":
            setCurrentPage("sales");
            break;
          case "inventory":
            setCurrentPage("inventory");
            break;
          case "customers":
            setCurrentPage("customers");
            break;
          case "reports":
            setCurrentPage("reports");
            break;
          case "settings":
            setCurrentPage("settings");
            break;
          case "tools":
            setCurrentPage("tools");
            break;
          case "help":
            setCurrentPage("help");
            break;
          case "new-supplier":
            setCurrentPage("new-supplier");
            break;
          case "product-group":
            setCurrentPage("product-group");
            break;
          case "product-sub-group":
            setCurrentPage("product-sub-group");
            break;
          case "list-item-groups":
            setCurrentPage("list-item-groups");
            break;
          case "new-item":
            setCurrentPage("new-item");
            break;
          case "quick-search":
            setCurrentPage("quick-search");
            break;
          case "quick-search-balances":
            setCurrentPage("quick-search-balances");
            break;
          case "view-selling-price-search":
            setCurrentPage("view-selling-price-search");
            break;
          case "items-list-buying-price":
            setCurrentPage("items-list-buying-price");
            break;
          case "low-stock-items":
            setCurrentPage("low-stock-items");
            break;
          case "list-units-measure":
            setCurrentPage("list-units-measure");
            break;
          case "adjust-stock":
            setCurrentPage("adjust-stock");
            break;
          case "quick-purchase":
            setCurrentPage("quick-purchase");
            break;
          case "transform-stock":
            setCurrentPage("transform-stock");
            break;
          case "item-journal":
            setCurrentPage("item-journal");
            break;
          case "list-items-value":
            setCurrentPage("list-items-value");
            break;
          case "hs-codes":
            setCurrentPage("hs-codes");
            break;
          case "suppliers-list":
            setCurrentPage("suppliers-list");
            break;
          case "receive-goods":
            setCurrentPage("receive-goods");
            break;
          case "list-goods-received":
            setCurrentPage("list-goods-received");
            break;
          case "return-goods":
            setCurrentPage("return-goods");
            break;
          case "list-returned-goods":
            setCurrentPage("list-returned-goods");
            break;
          case "make-payment-supplier":
            setCurrentPage("make-payment-supplier");
            break;
          case "receive-cash-supplier":
            setCurrentPage("receive-cash-supplier");
            break;
          case "modify-supplier-statement":
            setCurrentPage("modify-supplier-statement");
            break;
          case "list-payments-receipts":
            setCurrentPage("list-payments-receipts");
            break;
          case "supplier-statement-account":
            setCurrentPage("supplier-statement-account");
            break;
          case "new-customer":
            setCurrentPage("new-customer");
            break;
          case "list-customers":
            setCurrentPage("list-customers");
            break;
          case "new-sale":
            setCurrentPage("new-sale");
            break;
          case "new-sales-return":
            setCurrentPage("new-sales-return");
            break;
          case "list-returned-sales":
            setCurrentPage("list-returned-sales");
            break;
          case "list-invoices":
            setCurrentPage("list-invoices");
            break;
          case "list-cash-sales":
            setCurrentPage("list-cash-sales");
            break;
          case "list-credit-sales":
            setCurrentPage("list-credit-sales");
            break;
          case "uninvoiced-credit-sales":
            setCurrentPage("uninvoiced-credit-sales");
            break;
          case "receive-payment-customer":
            setCurrentPage("receive-payment-customer");
            break;
          case "give-cash-customer":
            setCurrentPage("give-cash-customer");
            break;
          case "adjust-customer-statement":
            setCurrentPage("adjust-customer-statement");
            break;
          case "list-payments-payouts":
            setCurrentPage("list-payments-payouts");
            break;
          case "customers-with-balances":
            setCurrentPage("customers-with-balances");
            break;
          case "customer-statement-account":
            setCurrentPage("customer-statement-account");
            break;
          case "loyalty-customers":
            setCurrentPage("loyalty-customers");
            break;
          case "reports-dashboard":
            setCurrentPage("reports-dashboard");
            break;
          case "finance-dashboard":
            setCurrentPage("finance-dashboard");
            break;
          case "tools-dashboard":
            setCurrentPage("tools-dashboard");
            break;
          case "help-dashboard":
            setCurrentPage("help-dashboard");
            break;
          case "file":
            setCurrentPage("dashboard");
            break;
          default:
            break;
        }
      });

      return () => {
        window.electronAPI.removeMenuActionListener();
      };
    }
  }, [isAuthenticated]);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentPage("login");
  };

  if (!isAuthenticated) {
    return (
      <AppProvider>
        <LoginPage onLogin={handleLogin} />
      </AppProvider>
    );
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "sales", label: "Sales", icon: ShoppingCart, shortcut: "F5" },
    { id: "inventory", label: "Inventory", icon: Package, shortcut: "Ctrl+I" },
    { id: "customers", label: "Customers", icon: Users, shortcut: "Ctrl+U" },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "tools", label: "Tools", icon: Settings },
    { id: "help", label: "Help", icon: Settings },
    { id: "settings", label: "Settings", icon: Settings, shortcut: "Ctrl+," },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "sales":
        return <SalesPage />;
      case "inventory":
        return <InventoryPage />;
      case "customers":
        return <CustomersPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage />;
      case "tools":
        return <ToolsPage />;
      case "help":
        return <HelpPage />;
      case "new-supplier":
        return <NewSupplierPage />;
      case "product-group":
        return <ProductGroupDashboard />;
      case "product-sub-group":
        return <ProductSubGroupDashboard />;
      case "list-item-groups":
        return <ListItemGroupsDashboard />;
      case "new-item":
        return <InventoryPage />;
      case "quick-search":
        return <QuickSearchDashboard />;
      case "quick-search-balances":
        return <QuickSearchBalancesDashboard />;
      case "view-selling-price-search":
        return <ViewSellingPriceSearchDashboard />;
      case "items-list-buying-price":
        return <ItemsListBuyingPriceDashboard />;
      case "low-stock-items":
        return <LowStockItemsDashboard />;
      case "list-units-measure":
        return <ListUnitsMeasureDashboard />;
      case "adjust-stock":
        return <AdjustStockDashboard />;
      case "quick-purchase":
        return <QuickPurchaseDashboard />;
      case "transform-stock":
        return <TransformStockDashboard />;
      case "item-journal":
        return <ItemJournalDashboard />;
      case "list-items-value":
        return <ListItemsValueDashboard />;
      case "hs-codes":
        return <HSCodesDashboard />;
      case "suppliers-list":
        return <SuppliersListDashboard />;
      case "receive-goods":
        return <ReceiveGoodsDashboard />;
      case "list-goods-received":
        return <ListGoodsReceivedDashboard />;
      case "return-goods":
        return <ReturnGoodsDashboard />;
      case "list-returned-goods":
        return <ListReturnedGoodsDashboard />;
      case "make-payment-supplier":
        return <MakePaymentSupplierDashboard />;
      case "receive-cash-supplier":
        return <ReceiveCashSupplierDashboard />;
      case "modify-supplier-statement":
        return <ModifySupplierStatementDashboard />;
      case "list-payments-receipts":
        return <ListPaymentsReceiptsDashboard />;
      case "supplier-statement-account":
        return <SupplierStatementAccountDashboard />;
      case "new-customer":
        return <NewCustomerDashboard />;
      case "list-customers":
        return <ListCustomersDashboard />;
      case "new-sale":
        return <NewSaleDashboard />;
      case "new-sales-return":
        return <NewSalesReturnDashboard />;
      case "list-returned-sales":
        return <ListReturnedSalesDashboard />;
      case "list-invoices":
        return <ListInvoicesDashboard />;
      case "list-cash-sales":
        return <ListCashSalesDashboard />;
      case "list-credit-sales":
        return <ListCreditSalesDashboard />;
      case "uninvoiced-credit-sales":
        return <UninvoicedCreditSalesDashboard />;
      case "receive-payment-customer":
        return <ReceivePaymentCustomerDashboard />;
      case "give-cash-customer":
        return <GiveCashCustomerDashboard />;
      case "adjust-customer-statement":
        return <AdjustCustomerStatementDashboard />;
      case "list-payments-payouts":
        return <ListPaymentsPayoutsDashboard />;
      case "customers-with-balances":
        return <CustomersWithBalancesDashboard />;
      case "customer-statement-account":
        return <CustomerStatementAccountDashboard />;
      case "loyalty-customers":
        return <LoyaltyCustomersDashboard />;
      case "reports-dashboard":
        return <ReportsDashboard />;
      case "finance-dashboard":
        return <FinanceDashboard />;
      case "tools-dashboard":
        return <ToolsDashboard />;
      case "help-dashboard":
        return <HelpDashboard />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-64" : "w-16"
          } bg-white shadow-lg transition-all duration-300 flex flex-col`}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-800">Maulex POS</h1>
                <p className="text-sm text-gray-600">Inventory System</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon size={20} />
                    {sidebarOpen && (
                      <>
                        <span className="ml-3 font-medium">{item.label}</span>
                        {item.shortcut && (
                          <span className="ml-auto text-xs text-gray-500">
                            {item.shortcut}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-200">
            {sidebarOpen && (
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-800">
                  {currentUser?.username}
                </p>
                <p className="text-xs text-gray-600 capitalize">
                  {currentUser?.role}
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              {sidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                {currentPage}
              </h2>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-auto">{renderPage()}</div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
