import React from 'react';
import { Settings, Database, Info, HelpCircle } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-600">Configure your POS system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Info className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">System Information</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Application:</span>
              <span className="font-medium">Maulex POS System</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Version:</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Database:</span>
              <span className="font-medium">SQLite (Local)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform:</span>
              <span className="font-medium capitalize">{window.electronAPI?.platform || 'Web'}</span>
            </div>
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Database className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Database Status</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Database Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium text-sm">data/pos_inventory.db</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mode:</span>
              <span className="font-medium">Offline</span>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <HelpCircle className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Keyboard Shortcuts</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">New Sale:</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">F5</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New Item:</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+I</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New Customer:</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+U</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quick Search:</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">F3</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">List Items:</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">F4</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Settings:</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+,</kbd>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">About</h3>
          </div>
          
          <div className="text-gray-700">
            <p className="mb-3">
              Maulex POS Inventory System is a complete Point of Sale and Inventory Management solution 
              designed for small to medium businesses.
            </p>
            <p className="mb-3">
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
              <li>Complete offline operation with SQLite database</li>
              <li>Real-time inventory tracking</li>
              <li>Customer management</li>
              <li>Sales reporting and analytics</li>
              <li>Multi-platform desktop application</li>
              <li>Professional keyboard shortcuts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex space-x-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Backup Database
        </button>
        <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
          Export Data
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          Check for Updates
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;