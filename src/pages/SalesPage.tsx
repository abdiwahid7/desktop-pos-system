import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Search, CreditCard, DollarSign } from 'lucide-react';
import { api } from '../services/api';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const SalesPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'credit'>('cash');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [itemsData, customersData] = await Promise.all([
        api.getItems(),
        api.getCustomers()
      ]);
      setItems(itemsData);
      setCustomers(customersData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: any) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1, total: (cartItem.quantity + 1) * cartItem.price }
          : cartItem
      ));
    } else {
      setCart([...cart, {
        id: item.id,
        name: item.name,
        price: item.selling_price,
        quantity: 1,
        total: item.selling_price
      }]);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity, total: quantity * item.price }
        : item
    ));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.1; // 10% tax
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setLoading(true);
    try {
      const receiptNumber = `RCP-${Date.now()}`;
      const transaction = {
        receipt_number: receiptNumber,
        type: 'sale',
        customer_id: selectedCustomer,
        subtotal: getSubtotal(),
        tax: getTax(),
        discount: 0,
        total: getTotal(),
        payment_method: paymentMethod,
        cashier_id: 1, // Current user ID
        notes: ''
      };

      const transactionItems = cart.map(item => ({
        item_id: item.id,
        item_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        discount: 0,
        total: item.total
      }));

      await api.createTransaction(transaction, transactionItems);
      
      // Clear cart
      setCart([]);
      setSelectedCustomer(null);
      
      alert(`Sale completed! Receipt: ${receiptNumber}`);
    } catch (error) {
      console.error('Error processing sale:', error);
      alert('Error processing sale');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full flex gap-6">
      {/* Products Section */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Products</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => addToCart(item)}
                >
                  <h4 className="font-medium text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">SKU: {item.sku}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">
                      ${item.selling_price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {item.stock_quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96">
        <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
          <div className="flex items-center mb-6">
            <ShoppingCart className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Cart ({cart.length})</h3>
          </div>

          {/* Customer Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer (Optional)
            </label>
            <select
              value={selectedCustomer || ''}
              onChange={(e) => setSelectedCustomer(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Walk-in Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto mb-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-green-600">
                        ${item.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'cash', label: 'Cash', icon: DollarSign },
                { value: 'card', label: 'Card', icon: CreditCard },
                { value: 'credit', label: 'Credit', icon: CreditCard }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setPaymentMethod(value as any)}
                  className={`p-2 rounded-lg border text-sm flex flex-col items-center ${
                    paymentMethod === value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Totals */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%):</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                <span>Total:</span>
                <span className="text-green-600">${getTotal().toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0 || loading}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : `Checkout - $${getTotal().toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;