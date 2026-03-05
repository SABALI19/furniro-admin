const STORAGE_KEYS = {
  users: "furniro_users",
  furniture: "furniro_furniture",
  orders: "furniro_orders",
  session: "furniro_session_user",
};

const nowIso = () => new Date().toISOString();

const readJson = (key, fallback) => {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const createId = (prefix) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const seedData = () => {
  const users = readJson(STORAGE_KEYS.users, null);
  if (!users || users.length === 0) {
    writeJson(STORAGE_KEYS.users, [
      {
        id: "user_admin_1",
        name: "Admin User",
        email: "admin@furniro.com",
        password: "admin123",
        role: "admin",
        createdAt: nowIso(),
      },
    ]);
  }

  const furniture = readJson(STORAGE_KEYS.furniture, null);
  if (!furniture || furniture.length === 0) {
    writeJson(STORAGE_KEYS.furniture, [
      {
        id: "fur_1",
        name: "Modern Oak Chair",
        category: "Living Room",
        price: 149.99,
        quantity: 12,
        inStock: true,
        color: "Oak Brown",
        size: "Medium",
        discount: 0,
        description: "Solid oak chair with minimalist design.",
        images: ["https://via.placeholder.com/120x120?text=Chair"],
        createdAt: nowIso(),
      },
      {
        id: "fur_2",
        name: "Cloud Sofa",
        category: "Living Room",
        price: 899,
        quantity: 4,
        inStock: true,
        color: "Cream",
        size: "Large",
        discount: 10,
        description: "Comfortable 3-seater sofa.",
        images: ["https://via.placeholder.com/120x120?text=Sofa"],
        createdAt: nowIso(),
      },
      {
        id: "fur_3",
        name: "Office Desk Pro",
        category: "Office",
        price: 499,
        quantity: 0,
        inStock: false,
        color: "Walnut",
        size: "140 x 70 cm",
        discount: 5,
        description: "Spacious office desk with cable management.",
        images: ["https://via.placeholder.com/120x120?text=Desk"],
        createdAt: nowIso(),
      },
    ]);
  }

  const orders = readJson(STORAGE_KEYS.orders, null);
  if (!orders || orders.length === 0) {
    writeJson(STORAGE_KEYS.orders, [
      {
        id: "ord_1",
        customerName: "Jane Cooper",
        total: 1049,
        status: "active",
        createdAt: nowIso(),
      },
      {
        id: "ord_2",
        customerName: "Robert Fox",
        total: 149.99,
        status: "completed",
        createdAt: nowIso(),
      },
    ]);
  }
};

const getUsers = () => readJson(STORAGE_KEYS.users, []);
const saveUsers = (users) => writeJson(STORAGE_KEYS.users, users);

const getFurniture = () => readJson(STORAGE_KEYS.furniture, []);
const saveFurniture = (items) => writeJson(STORAGE_KEYS.furniture, items);

const getOrders = () => readJson(STORAGE_KEYS.orders, []);
const saveOrders = (orders) => writeJson(STORAGE_KEYS.orders, orders);

const getSessionUser = () => readJson(STORAGE_KEYS.session, null);
const setSessionUser = (user) => writeJson(STORAGE_KEYS.session, user);
const clearSessionUser = () => localStorage.removeItem(STORAGE_KEYS.session);

const findUserByEmail = (email) =>
  getUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());

const registerUser = ({ name, email, password, role = "admin" }) => {
  const users = getUsers();
  const existing = users.some(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );

  if (existing) {
    throw new Error("Email already exists");
  }

  const newUser = {
    id: createId("user"),
    name,
    email,
    password,
    role,
    createdAt: nowIso(),
  };

  saveUsers([newUser, ...users]);
  return newUser;
};

const addFurniture = (payload) => {
  const items = getFurniture();
  const newItem = {
    ...payload,
    id: createId("fur"),
    createdAt: nowIso(),
  };
  saveFurniture([newItem, ...items]);
  return newItem;
};

const updateFurniture = (id, changes) => {
  const items = getFurniture();
  const next = items.map((item) => (item.id === id ? { ...item, ...changes } : item));
  saveFurniture(next);
  return next.find((item) => item.id === id) || null;
};

const deleteFurniture = (id) => {
  const items = getFurniture();
  const next = items.filter((item) => item.id !== id);
  saveFurniture(next);
};

const getFurnitureById = (id) => getFurniture().find((item) => item.id === id) || null;

export const localStore = {
  STORAGE_KEYS,
  seedData,
  getUsers,
  saveUsers,
  getFurniture,
  saveFurniture,
  getOrders,
  saveOrders,
  getSessionUser,
  setSessionUser,
  clearSessionUser,
  findUserByEmail,
  registerUser,
  addFurniture,
  updateFurniture,
  deleteFurniture,
  getFurnitureById,
};
