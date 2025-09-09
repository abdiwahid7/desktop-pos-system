
import sqlite3pkg from 'sqlite3';
const sqlite3 = sqlite3pkg.verbose();
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

class Database {
  constructor() {
    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    this.dbPath = path.join(dataDir, 'pos_inventory.db');
    this.db = new sqlite3.Database(this.dbPath);
    
    // Enable foreign keys
    this.db.run('PRAGMA foreign_keys = ON');
    
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const schema = `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'cashier' CHECK(role IN ('admin', 'cashier', 'manager')),
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Product Groups table
      CREATE TABLE IF NOT EXISTS product_groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        parent_id INTEGER,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES product_groups(id) ON DELETE SET NULL
      );

      -- Units table
      CREATE TABLE IF NOT EXISTS units (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        abbreviation TEXT NOT NULL,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Items table
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sku TEXT UNIQUE NOT NULL,
        barcode TEXT,
        group_id INTEGER,
        unit_id INTEGER,
        buying_price REAL NOT NULL DEFAULT 0.00,
        selling_price REAL NOT NULL DEFAULT 0.00,
        stock_quantity INTEGER DEFAULT 0,
        min_stock_level INTEGER DEFAULT 0,
        max_stock_level INTEGER DEFAULT 0,
        hs_code TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (group_id) REFERENCES product_groups(id) ON DELETE SET NULL,
        FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE SET NULL
      );

      -- Suppliers table
      CREATE TABLE IF NOT EXISTS suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        contact_person TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        balance REAL DEFAULT 0.00,
        credit_limit REAL DEFAULT 0.00,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Customers table
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        address TEXT,
        credit_limit REAL DEFAULT 0.00,
        balance REAL DEFAULT 0.00,
        loyalty_points INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Transactions table
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        receipt_number TEXT UNIQUE NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('sale', 'return', 'purchase')),
        customer_id INTEGER,
        supplier_id INTEGER,
        subtotal REAL NOT NULL DEFAULT 0.00,
        tax REAL NOT NULL DEFAULT 0.00,
        discount REAL NOT NULL DEFAULT 0.00,
        total REAL NOT NULL DEFAULT 0.00,
        payment_method TEXT NOT NULL CHECK(payment_method IN ('cash', 'credit', 'card', 'cheque')),
        status TEXT DEFAULT 'completed' CHECK(status IN ('completed', 'pending', 'cancelled', 'voided')),
        cashier_id INTEGER NOT NULL,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL,
        FOREIGN KEY (cashier_id) REFERENCES users(id)
      );

      -- Transaction Items table
      CREATE TABLE IF NOT EXISTS transaction_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        transaction_id INTEGER NOT NULL,
        item_id INTEGER NOT NULL,
        item_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price REAL NOT NULL,
        discount REAL DEFAULT 0.00,
        total REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
        FOREIGN KEY (item_id) REFERENCES items(id)
      );

      -- Stock Adjustments table
      CREATE TABLE IF NOT EXISTS stock_adjustments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id INTEGER NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('adjustment', 'transfer', 'loss', 'found', 'return')),
        quantity INTEGER NOT NULL,
        reason TEXT,
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_items_sku ON items(sku);
      CREATE INDEX IF NOT EXISTS idx_items_barcode ON items(barcode);
      CREATE INDEX IF NOT EXISTS idx_transactions_receipt ON transactions(receipt_number);
      CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(created_at);
      CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name);
      CREATE INDEX IF NOT EXISTS idx_suppliers_name ON suppliers(name);
    `;

    // Execute schema
    await this.exec(schema);
    
    // Insert default data
    await this.insertDefaultData();
  }

  async insertDefaultData() {
    // Check if admin user exists
    const adminExists = await this.get('SELECT id FROM users WHERE username = ?', ['admin']);
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      
      // Insert default admin user
      await this.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', 
        ['admin', hashedPassword, 'admin']);

      // Insert default product groups
      const groups = [
        ['Electronics', 'Electronic items and accessories'],
        ['Clothing', 'Apparel and fashion items'],
        ['Food & Beverages', 'Food and drink items'],
        ['Home & Garden', 'Home improvement and garden supplies'],
        ['Sports & Outdoors', 'Sports equipment and outdoor gear']
      ];

      for (const [name, description] of groups) {
        await this.run('INSERT INTO product_groups (name, description) VALUES (?, ?)', [name, description]);
      }

      // Insert default units
      const units = [
        ['Piece', 'PCS'],
        ['Kilogram', 'KG'],
        ['Liter', 'L'],
        ['Meter', 'M'],
        ['Box', 'BOX'],
        ['Dozen', 'DOZ']
      ];

      for (const [name, abbreviation] of units) {
        await this.run('INSERT INTO units (name, abbreviation) VALUES (?, ?)', [name, abbreviation]);
      }

      // Insert sample items
      const sampleItems = [
        ['Samsung Galaxy S24', 'SGS24-001', '1234567890123', 1, 1, 800, 999, 25, 5, 100, '8517.12.00'],
        ['Nike Air Max', 'NAM-001', '2345678901234', 2, 1, 120, 189, 15, 3, 50, ''],
        ['Coca Cola 500ml', 'CC-500', '3456789012345', 3, 1, 0.8, 1.5, 200, 50, 500, ''],
        ['Garden Hose 25ft', 'GH-25', '4567890123456', 4, 1, 25, 39.99, 8, 5, 30, ''],
        ['Tennis Racket Pro', 'TR-PRO', '5678901234567', 5, 1, 85, 129.99, 2, 3, 20, '']
      ];

      for (const item of sampleItems) {
        await this.run(`
          INSERT INTO items (
            name, sku, barcode, group_id, unit_id, buying_price,
            selling_price, stock_quantity, min_stock_level, max_stock_level, hs_code
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, item);
      }

      // Insert sample customers
      const sampleCustomers = [
        ['John Smith', 'john@example.com', '+1234567890', '123 Main St, City, State', 5000, 1250, 150],
        ['Sarah Johnson', 'sarah@example.com', '+1987654321', '456 Oak Ave, City, State', 3000, 0, 75],
        ['Mike Wilson', 'mike@example.com', '+1555123456', '789 Pine St, City, State', 2000, 450, 220]
      ];

      for (const customer of sampleCustomers) {
        await this.run(`
          INSERT INTO customers (
            name, email, phone, address, credit_limit, balance, loyalty_points
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `, customer);
      }

      // Insert sample suppliers
      const sampleSuppliers = [
        ['TechCorp Solutions', 'Michael Brown', 'orders@techcorp.com', '+1555123456', '789 Industrial Blvd, Tech City', -2500, 10000],
        ['Fashion Wholesale Inc.', 'Lisa Davis', 'wholesale@fashion.com', '+1555987654', '321 Fashion St, Style City', 0, 5000],
        ['Food Distributors Ltd', 'Robert Garcia', 'orders@fooddist.com', '+1555456789', '654 Commerce Ave, Food City', -850, 15000]
      ];

      for (const supplier of sampleSuppliers) {
        await this.run(`
          INSERT INTO suppliers (
            name, contact_person, email, phone, address, balance, credit_limit
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `, supplier);
      }

      console.log('✅ SQLite database initialized with default data');
    }
  }

  // Promisify database methods
  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }

  exec(sql) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

export default Database;