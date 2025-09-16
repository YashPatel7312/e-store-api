import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("smartphones");

  // Fetch categories
  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Fetch products for selected category
  useEffect(() => {
    if (selectedCategory) {
      fetch(`https://dummyjson.com/products/category/${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => setProducts(data.products));
    }
  }, [selectedCategory]);

  return (
    <div className="container">
      {/* Sidebar for categories */}
      <aside className="sidebar">
        <h2>Categories</h2>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? "active" : ""}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Product list */}
      <main className="products">
        <h2>{selectedCategory}</h2>
        <div className="product-grid">
          {products.map((p) => (
            <div className="card" key={p.id}>
              <img src={p.thumbnail} alt={p.title} />
              <h3>{p.title}</h3>
              <p>${p.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
