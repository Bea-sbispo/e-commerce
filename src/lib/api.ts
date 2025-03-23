export async function fetchProducts(id?: number) {
  if (id) {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    return data;
  }
  const res = await fetch("https://dummyjson.com/products?limit=10");
  const data = await res.json();
  return data.products;
}
export async function fetchCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  const data = await res.json();
  return data;
}
export async function fetchProductsByCategory(category: string) {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}`,
  );
  const data = await res.json();
  return data;
}
