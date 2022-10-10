const products = [
  {
    id: 1,
    title: "React.js",
    category: "fronend",
    createdAt: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "React.js2",
    category: "fronend2",
    createdAt: "2022-10-31T15:02:00.411Z",
  },
];
const category = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of app",
    createdAt: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "frontend2",
    description: "frontend of app2",
    createdAt: "2022-10-31T15:02:00.411Z",
  },
];

export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];

    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }
  static savedCategories(categoryToSave) {
    const savedCategories = Storage.getAllCategories();

    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
    if (existedItem) {
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    return savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  }
  static savedProducts(productsToSave) {
    const savedProducts = Storage.getAllProducts();

    const existedItem = savedProducts.find((c) => c.id === productsToSave.id);
    if (existedItem) {
      existedItem.title = productsToSave.title;
      existedItem.quantity = productsToSave.quantity;
      existedItem.category = productsToSave.category;
    } else {
      productsToSave.id = new Date().getTime();
      productsToSave.createdAt = new Date().toISOString();
      savedProducts.push(productsToSave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(id));
    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
}
