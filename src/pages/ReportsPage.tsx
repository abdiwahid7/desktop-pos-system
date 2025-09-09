import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, DollarSign, Package, Users, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';

const ReportsPage: React.FC = () => {
  const [dailySales, setDailySales] = useState<any>(null);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadReports();
  }, [selectedDate]);

  const loadReports = async () => {
    try {
      const [salesData, transactionsData, lowStockData] = await Promise.all([
        api.getDailySales(selectedDate),
        api.getTransactions(10),
        api.getLowStockItems()
      ]);
      
      setDailySales(salesData[0] || { transaction_count: 0, total_sales: 0, cash_sales: 0, card_sales: 0 });
      setRecentTransactions(transactionsData);
      setLowStockItems(lowStockData);
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
          <p className="text-gray-600">Track your business performance</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(dailySales?.total_sales || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {dailySales?.transaction_count || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Cash Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(dailySales?.cash_sales || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Card Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(dailySales?.card_sales || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No transactions found</p>
            ) : (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{transaction.receipt_number}</p>
                    <p className="text-sm text-gray-600">
                      {transaction.customer_name || 'Walk-in'} • {formatDate(transaction.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      {formatCurrency(transaction.total)}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      {transaction.payment_method}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Low Stock Alert</h3>
          </div>
          <div className="space-y-4">
            {lowStockItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">All items are well stocked</p>
            ) : (
              lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">
                      {item.stock_quantity} left
                    </p>
                    <p className="text-sm text-gray-600">
                      Min: {item.min_stock_level}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sales Summary */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Sales Summary for {new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{dailySales?.transaction_count || 0}</p>
            <p className="text-gray-600">Total Transactions</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(dailySales?.total_sales || 0)}
            </p>
            <p className="text-gray-600">Total Revenue</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {dailySales?.transaction_count > 0 
                ? formatCurrency((dailySales?.total_sales || 0) / dailySales.transaction_count)
                : '$0.00'
              }
            </p>
            <p className="text-gray-600">Average Sale</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;