import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
const isDev = process.env.NODE_ENV === 'development';

// Database setup
let Database;
let db;
const loadDatabase = async () => {
  if (!Database) {
    const mod = await import('./database.js');
    Database = mod.default || mod;
    db = new Database();
  }
};

let mainWindow;

async function createWindow() {
  await loadDatabase();
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'icon.png'),
    show: false,
    titleBarStyle: 'default',
    title: 'Maulex POS Inventory System'
  });

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:5173' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus on window
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Create application menu
  createMenu();
}


function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'Logout', click: () => mainWindow.webContents.send('menu-action', 'logout') },
        { label: 'Change Password', click: () => mainWindow.webContents.send('menu-action', 'change-password') },
        { type: 'separator' },
        { label: 'Exit', accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q', click: () => app.quit() }
      ]
    },
    {
      label: 'Items',
      submenu: [
        { label: 'New Product Group', accelerator: 'Ctrl+G', click: () => mainWindow.webContents.send('menu-action', 'product-group') },
        { label: 'New Product Sub Group', accelerator: 'Ctrl+S', click: () => mainWindow.webContents.send('menu-action', 'product-sub-group') },
        { label: 'List Item Groups', click: () => mainWindow.webContents.send('menu-action', 'list-item-groups') },
        { label: 'New Item', accelerator: 'Ctrl+I', click: () => mainWindow.webContents.send('menu-action', 'new-item') },
        { label: 'Quick Search', accelerator: 'F3', click: () => mainWindow.webContents.send('menu-action', 'quick-search') },
        { label: 'Quick Search With Balances', accelerator: 'F11', click: () => mainWindow.webContents.send('menu-action', 'quick-search-balances') },
        { label: 'View Selling Price at Search Window', click: () => mainWindow.webContents.send('menu-action', 'view-selling-price-search') },
        { label: 'Items List With Buying Price', accelerator: 'F4', click: () => mainWindow.webContents.send('menu-action', 'items-list-buying-price') },
        { label: 'Items with Low Stock', click: () => mainWindow.webContents.send('menu-action', 'low-stock-items') },
        { label: 'List Units of Measure', click: () => mainWindow.webContents.send('menu-action', 'list-units-measure') },
        { label: 'Adjust Stock', click: () => mainWindow.webContents.send('menu-action', 'adjust-stock') },
        { label: 'Quick Purchase', accelerator: 'Ctrl+B', click: () => mainWindow.webContents.send('menu-action', 'quick-purchase') },
        { label: 'Transform Stock', click: () => mainWindow.webContents.send('menu-action', 'transform-stock') },
        { label: 'Item Journal', click: () => mainWindow.webContents.send('menu-action', 'item-journal') },
        { label: 'List all Items and Their Value', click: () => mainWindow.webContents.send('menu-action', 'list-items-value') },
        { label: 'HS Codes', click: () => mainWindow.webContents.send('menu-action', 'hs-codes') }
      ]
    },
    {
      label: 'Suppliers',
      submenu: [
        { label: 'New Supplier', click: () => mainWindow.webContents.send('menu-action', 'new-supplier') },
        { label: 'Suppliers List', click: () => mainWindow.webContents.send('menu-action', 'suppliers-list') },
        { label: 'Receive Goods / Services', click: () => mainWindow.webContents.send('menu-action', 'receive-goods') },
        { label: 'List of Goods Received', click: () => mainWindow.webContents.send('menu-action', 'list-goods-received') },
        { label: 'Return Goods', click: () => mainWindow.webContents.send('menu-action', 'return-goods') },
        { label: 'List of Returned Goods', click: () => mainWindow.webContents.send('menu-action', 'list-returned-goods') },
        { label: 'Make Payment To Supplier', click: () => mainWindow.webContents.send('menu-action', 'make-payment-supplier') },
        { label: 'Receive Cash From Supplier', click: () => mainWindow.webContents.send('menu-action', 'receive-cash-supplier') },
        { label: 'Modify Supplier Statement', click: () => mainWindow.webContents.send('menu-action', 'modify-supplier-statement') },
        { label: 'List of Payments and Receipts', click: () => mainWindow.webContents.send('menu-action', 'list-payments-receipts') },
        { label: 'Statement of Account', click: () => mainWindow.webContents.send('menu-action', 'supplier-statement-account') }
      ]
    },
    {
      label: 'Customers',
      submenu: [
        { label: 'New Customer', click: () => mainWindow.webContents.send('menu-action', 'new-customer') },
        { label: 'List Customers', click: () => mainWindow.webContents.send('menu-action', 'list-customers') },
        { label: 'New Sale', accelerator: 'F5', click: () => mainWindow.webContents.send('menu-action', 'new-sale') },
        { label: 'New Sales Return', accelerator: 'Ctrl+F5', click: () => mainWindow.webContents.send('menu-action', 'new-sales-return') },
        { label: 'List of Returned Sales', click: () => mainWindow.webContents.send('menu-action', 'list-returned-sales') },
        { label: 'List Invoices', click: () => mainWindow.webContents.send('menu-action', 'list-invoices') },
        { label: 'List of Cash Sales', click: () => mainWindow.webContents.send('menu-action', 'list-cash-sales') },
        { label: 'List of Credit Sales', click: () => mainWindow.webContents.send('menu-action', 'list-credit-sales') },
        { label: 'Uninvoiced Credit Sales', click: () => mainWindow.webContents.send('menu-action', 'uninvoiced-credit-sales') },
        { label: 'Receive Payment from Customer', click: () => mainWindow.webContents.send('menu-action', 'receive-payment-customer') },
        { label: 'Give Cash to Customer', click: () => mainWindow.webContents.send('menu-action', 'give-cash-customer') },
        { label: 'Adjust Customer Statement', click: () => mainWindow.webContents.send('menu-action', 'adjust-customer-statement') },
        { label: 'List of Received Payments and Payouts', click: () => mainWindow.webContents.send('menu-action', 'list-payments-payouts') },
        { label: 'Customers With Balances', click: () => mainWindow.webContents.send('menu-action', 'customers-with-balances') },
        { label: 'Statement of Account', click: () => mainWindow.webContents.send('menu-action', 'customer-statement-account') },
        { label: 'Loyalty Customers', submenu: [
          { label: 'Loyalty Customers', click: () => mainWindow.webContents.send('menu-action', 'loyalty-customers') }
        ] }
      ]
    },
    {
      label: 'Reports',
      submenu: [
        { label: 'Daily Cash Sales', click: () => mainWindow.webContents.send('menu-action', 'daily-cash-sales') },
        { label: 'Cash Sales By Period', click: () => mainWindow.webContents.send('menu-action', 'cash-sales-by-period') },
        { label: 'Cash Sales By Customer', click: () => mainWindow.webContents.send('menu-action', 'cash-sales-by-customer') },
        { label: 'Cash Sales Summary By Item', click: () => mainWindow.webContents.send('menu-action', 'cash-sales-summary-by-item') },
        { label: 'Cash Sales Summary By Day', click: () => mainWindow.webContents.send('menu-action', 'cash-sales-summary-by-day') },
        { label: 'Cash Sales By Vendor', click: () => mainWindow.webContents.send('menu-action', 'cash-sales-by-vendor') },
        { label: 'Daily Credit Sales', click: () => mainWindow.webContents.send('menu-action', 'daily-credit-sales') },
        { label: 'Credit Sales By Period', click: () => mainWindow.webContents.send('menu-action', 'credit-sales-by-period') },
        { label: 'Credit Sales By Customer', click: () => mainWindow.webContents.send('menu-action', 'credit-sales-by-customer') },
        { label: 'Credit Sales Summary By Customer', click: () => mainWindow.webContents.send('menu-action', 'credit-sales-summary-by-customer') },
        { label: 'Credit Sales Summary By Item', click: () => mainWindow.webContents.send('menu-action', 'credit-sales-summary-by-item') },
        { label: 'Credit Sales Summary By Day', click: () => mainWindow.webContents.send('menu-action', 'credit-sales-summary-by-day') },
        { label: 'Credit Sales By Vendor', click: () => mainWindow.webContents.send('menu-action', 'credit-sales-by-vendor') },
        { label: 'All Daily Sales', click: () => mainWindow.webContents.send('menu-action', 'all-daily-sales') },
        { label: 'All Daily Sales and Item Balance', click: () => mainWindow.webContents.send('menu-action', 'all-daily-sales-item-balance') },
        { label: 'All Sales By Period', click: () => mainWindow.webContents.send('menu-action', 'all-sales-by-period') },
        { label: 'All Sales Summary By Item', click: () => mainWindow.webContents.send('menu-action', 'all-sales-summary-by-item') },
        { label: 'All Sales Summary By Vendor', click: () => mainWindow.webContents.send('menu-action', 'all-sales-summary-by-vendor') },
        { label: 'Summary of Sales and Returns', click: () => mainWindow.webContents.send('menu-action', 'summary-sales-returns') },
        { label: 'Summary of Sales and Returns by Receipt', click: () => mainWindow.webContents.send('menu-action', 'summary-sales-returns-receipt') },
        { label: 'Deleted Credit Sales By Period', click: () => mainWindow.webContents.send('menu-action', 'deleted-credit-sales-by-period') },
        { label: 'Deleted Cash Sales By Period', click: () => mainWindow.webContents.send('menu-action', 'deleted-cash-sales-by-period') },
        { label: 'Items Taken Out', click: () => mainWindow.webContents.send('menu-action', 'items-taken-out') },
        { label: 'Items Transformed', click: () => mainWindow.webContents.send('menu-action', 'items-transformed') },
        { label: 'Item Purchases By Cashier', click: () => mainWindow.webContents.send('menu-action', 'item-purchases-by-cashier') },
        { label: 'Item Purchases By Vendor', click: () => mainWindow.webContents.send('menu-action', 'item-purchases-by-vendor') },
        { label: 'Items Re-order Report', click: () => mainWindow.webContents.send('menu-action', 'items-reorder-report') },
        { label: 'Analysis', submenu: [
          { label: 'Analysis', click: () => mainWindow.webContents.send('menu-action', 'analysis') }
        ] },
        { label: 'Loyalty Customers', submenu: [
          { label: 'Loyalty Customers', click: () => mainWindow.webContents.send('menu-action', 'loyalty-customers') }
        ] },
        { label: 'Voided Sales By Period', click: () => mainWindow.webContents.send('menu-action', 'voided-sales-by-period') }
      ]
    },
    {
      label: 'Finance',
      submenu: [
        { label: 'Account Statement - Detailed', click: () => mainWindow.webContents.send('menu-action', 'account-statement-detailed') },
        { label: 'Balance Sheet', click: () => mainWindow.webContents.send('menu-action', 'balance-sheet') },
        { label: 'Aging Analysis', submenu: [
          { label: 'Aging Analysis', click: () => mainWindow.webContents.send('menu-action', 'aging-analysis') }
        ] }
      ]
    },
    {
      label: 'Tools',
      submenu: [
        { label: 'Print Till Cash Sales & Cash Returns', click: () => mainWindow.webContents.send('menu-action', 'print-till-cash-sales-returns') },
        { label: 'Print Till Credit Sales and Credit Returns', click: () => mainWindow.webContents.send('menu-action', 'print-till-credit-sales-returns') }
      ]
    },
    {
      label: 'Help',
      submenu: [
        { label: 'About', click: () => mainWindow.webContents.send('menu-action', 'help-about') }
      ]
    }
  ];

  // macOS specific menu adjustments
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });

    // Window menu
    template.push({
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC handlers for database operations
ipcMain.handle('db-query', async (event, query, params) => {
  try {
    return await db.query(query, params);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
});

ipcMain.handle('db-run', async (event, query, params) => {
  try {
    return await db.run(query, params);
  } catch (error) {
    console.error('Database run error:', error);
    throw error;
  }
});

ipcMain.handle('db-get', async (event, query, params) => {
  try {
    return await db.get(query, params);
  } catch (error) {
    console.error('Database get error:', error);
    throw error;
  }
});

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle app quit
app.on('before-quit', () => {
  if (db) {
    db.close();
  }
});

// Prevent navigation away from the app
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== 'http://localhost:5173' && !navigationUrl.startsWith('file://')) {
      event.preventDefault();
    }
  });
});