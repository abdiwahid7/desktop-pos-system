// SQLite Database API Service
class DatabaseAPI {
  async query(sql: string, params: any[] = []): Promise<any[]> {
    if (window.electronAPI) {
      return await window.electronAPI.dbQuery(sql, params);
    }
    throw new Error('Electron API not available');
  }

  async get(sql: string, params: any[] = []): Promise<any> {
    if (window.electronAPI) {
      return await window.electronAPI.dbGet(sql, params);
    }
    throw new Error('Electron API not available');
  }

  async run(sql: string, params: any[] = []): Promise<{ id: number; changes: number }> {
    if (window.electronAPI) {
      return await window.electronAPI.dbRun(sql, params);
    }
    throw new Error('Electron API not available');
  }

  // Authentication
  async login(username: string, password: string) {
    const user = await this.get(
      'SELECT * FROM users WHERE username = ? AND is_active = 1',
      [username]
    );
    
    if (user) {
      // In a real app, you'd verify the password hash
      // For demo purposes, we'll accept any password for existing users
      return {
        id: user.id,
        username: user.username,
        role: user.role
      };
    }
    
    throw new Error('Invalid credentials');
  }

  // Items
  async getItems() {
    return await this.query(`
      SELECT i.*, pg.name as group_name, u.name as unit_name
      FROM items i
      LEFT JOIN product_groups pg ON i.group_id = pg.id
      LEFT JOIN units u ON i.unit_id = u.id
      WHERE i.is_active = 1
      ORDER BY i.name
    `);
  }

  async createItem(item: any) {
    return await this.run(`
      INSERT INTO items (name, sku, barcode, group_id, unit_id, buying_price, selling_price, stock_quantity, min_stock_level, max_stock_level)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      item.name, item.sku, item.barcode, item.group_id, item.unit_id,
      item.buying_price, item.selling_price, item.stock_quantity,
      item.min_stock_level, item.max_stock_level
    ]);
  }

  async updateItem(id: number, item: any) {
    return await this.run(`
      UPDATE items SET 
        name = ?, sku = ?, barcode = ?, group_id = ?, unit_id = ?,
        buying_price = ?, selling_price = ?, stock_quantity = ?,
        min_stock_level = ?, max_stock_level = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      item.name, item.sku, item.barcode, item.group_id, item.unit_id,
      item.buying_price, item.selling_price, item.stock_quantity,
      item.min_stock_level, item.max_stock_level, id
    ]);
  }

  async deleteItem(id: number) {
    return await this.run('UPDATE items SET is_active = 0 WHERE id = ?', [id]);
  }

  // Customers
  async getCustomers() {
    return await this.query('SELECT * FROM customers WHERE is_active = 1 ORDER BY name');
  }

  async createCustomer(customer: any) {
    return await this.run(`
      INSERT INTO customers (name, email, phone, address, credit_limit)
      VALUES (?, ?, ?, ?, ?)
    `, [customer.name, customer.email, customer.phone, customer.address, customer.credit_limit]);
  }

  async updateCustomer(id: number, customer: any) {
    return await this.run(`
      UPDATE customers SET 
        name = ?, email = ?, phone = ?, address = ?, credit_limit = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [customer.name, customer.email, customer.phone, customer.address, customer.credit_limit, id]);
  }

  async deleteCustomer(id: number) {
    return await this.run('UPDATE customers SET is_active = 0 WHERE id = ?', [id]);
  }

  // Product Groups
  async getProductGroups() {
    return await this.query('SELECT * FROM product_groups WHERE is_active = 1 ORDER BY name');
  }

  // Units
  async getUnits() {
    return await this.query('SELECT * FROM units WHERE is_active = 1 ORDER BY name');
  }

  // Transactions
  async createTransaction(transaction: any, items: any[]) {
    // Start transaction
    const result = await this.run(`
      INSERT INTO transactions (receipt_number, type, customer_id, subtotal, tax, discount, total, payment_method, cashier_id, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      transaction.receipt_number, transaction.type, transaction.customer_id,
      transaction.subtotal, transaction.tax, transaction.discount, transaction.total,
      transaction.payment_method, transaction.cashier_id, transaction.notes
    ]);

    const transactionId = result.id;

    // Add transaction items
    for (const item of items) {
      await this.run(`
        INSERT INTO transaction_items (transaction_id, item_id, item_name, quantity, unit_price, discount, total)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [transactionId, item.item_id, item.item_name, item.quantity, item.unit_price, item.discount, item.total]);

      // Update stock
      if (transaction.type === 'sale') {
        await this.run('UPDATE items SET stock_quantity = stock_quantity - ? WHERE id = ?', [item.quantity, item.item_id]);
      }
    }

    return { id: transactionId };
  }

  async getTransactions(limit = 50) {
    return await this.query(`
      SELECT t.*, c.name as customer_name, u.username as cashier_name
      FROM transactions t
      LEFT JOIN customers c ON t.customer_id = c.id
      LEFT JOIN users u ON t.cashier_id = u.id
      ORDER BY t.created_at DESC
      LIMIT ?
    `, [limit]);
  }

  // Reports
  async getDailySales(date: string) {
    return await this.query(`
      SELECT 
        COUNT(*) as transaction_count,
        SUM(total) as total_sales,
        SUM(CASE WHEN payment_method = 'cash' THEN total ELSE 0 END) as cash_sales,
        SUM(CASE WHEN payment_method = 'card' THEN total ELSE 0 END) as card_sales
      FROM transactions 
      WHERE DATE(created_at) = ? AND type = 'sale' AND status = 'completed'
    `, [date]);
  }

  async getLowStockItems() {
    return await this.query(`
      SELECT * FROM items 
      WHERE stock_quantity <= min_stock_level AND is_active = 1
      ORDER BY stock_quantity ASC
    `);
  }
}

export const api = new DatabaseAPI();