import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Star,
  ShoppingCart,
  X,
  Check,
  Zap,
  ArrowLeft,
  Heart,
  ChevronDown,
} from "lucide-react";

const allProducts = [
  { id: 1, name: "Obsidian Desk Lamp", price: 189, originalPrice: 229, rating: 4.9, reviews: 312, category: "Lighting", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80", badge: "Bestseller", inStock: true, color: "Black" },
  { id: 2, name: "Merino Knit Throw", price: 245, originalPrice: null, rating: 4.8, reviews: 198, category: "Textiles", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", badge: "New", inStock: true, color: "Cream" },
  { id: 3, name: "Ceramic Pour Set", price: 134, originalPrice: 160, rating: 4.7, reviews: 445, category: "Kitchen", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80", badge: "Popular", inStock: true, color: "White" },
  { id: 4, name: "Linen Storage Basket", price: 78, originalPrice: null, rating: 4.6, reviews: 267, category: "Storage", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80", badge: null, inStock: true, color: "Natural" },
  { id: 5, name: "Walnut Side Table", price: 399, originalPrice: 480, rating: 4.9, reviews: 156, category: "Furniture", image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80", badge: "Sale", inStock: true, color: "Walnut" },
  { id: 6, name: "Matte Black Planter", price: 65, originalPrice: null, rating: 4.5, reviews: 389, category: "Decor", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80", badge: null, inStock: true, color: "Black" },
  { id: 7, name: "Bamboo Candle Set", price: 54, originalPrice: null, rating: 4.8, reviews: 521, category: "Decor", image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80", badge: "New", inStock: true, color: "Natural" },
  { id: 8, name: "Linen Duvet Cover", price: 198, originalPrice: 240, rating: 4.7, reviews: 302, category: "Textiles", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", badge: "Sale", inStock: false, color: "Sand" },
  { id: 9, name: "Oak Floating Shelf", price: 145, originalPrice: null, rating: 4.6, reviews: 178, category: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", badge: null, inStock: true, color: "Oak" },
  { id: 10, name: "Arch Floor Lamp", price: 320, originalPrice: 390, rating: 4.9, reviews: 94, category: "Lighting", image: "https://images.unsplash.com/photo-1513506003901-1e6a35076782?w=600&q=80", badge: "Trending", inStock: true, color: "Black" },
  { id: 11, name: "Concrete Fruit Bowl", price: 89, originalPrice: null, rating: 4.4, reviews: 211, category: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", badge: null, inStock: true, color: "Grey" },
  { id: 12, name: "Velvet Cushion Set", price: 112, originalPrice: 135, rating: 4.8, reviews: 436, category: "Textiles", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", badge: "Sale", inStock: true, color: "Forest" },
];

const categories = ["All", "Lighting", "Furniture", "Textiles", "Kitchen", "Decor", "Storage"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Highest Rated", "Most Reviews"];

const badgeStyles = {
  Bestseller: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  New: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  Popular: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Sale: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  Trending: "bg-sky-500/15 text-sky-400 border-sky-500/20",
};

export default function Store() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(null);
  const [showSort, setShowSort] = useState(false);

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      return matchSearch && matchCat;
    });
    if (sortBy === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "Highest Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "Most Reviews") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [search, selectedCategory, sortBy]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1800);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/Home" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <div className="h-4 w-px bg-zinc-700" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-semibold text-sm">Store</span>
            </div>
          </div>
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-xl pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/Dashboard"
              className="hidden md:block text-xs text-zinc-500 hover:text-violet-400 transition-colors"
            >
              Dashboard →
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-zinc-800/60 hover:bg-zinc-700/60 border border-zinc-700/50 text-sm font-medium px-4 py-2 rounded-xl transition-all"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-violet-600 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Search */}
        <div className="sm:hidden mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">All Products</h1>
            <p className="text-sm text-zinc-500 mt-0.5">{filtered.length} items</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700/60 transition-all"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {sortBy}
              <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  className="absolute right-0 mt-2 w-52 bg-zinc-900 border border-zinc-700/50 rounded-xl overflow-hidden shadow-xl z-20"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setShowSort(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === opt ? "bg-violet-500/15 text-violet-400" : "text-zinc-300 hover:bg-zinc-800"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "bg-zinc-800/50 text-zinc-400 border border-zinc-700/30 hover:bg-zinc-700/50 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                className="group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-zinc-800/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-zinc-950/60 flex items-center justify-center">
                      <span className="text-xs font-semibold text-zinc-400 bg-zinc-800/80 px-3 py-1.5 rounded-lg">Out of Stock</span>
                    </div>
                  )}
                  {product.badge && (
                    <span className={`absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeStyles[product.badge]}`}>
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-zinc-800"
                  >
                    <Heart className={`h-3.5 w-3.5 ${wishlist.includes(product.id) ? "fill-rose-400 text-rose-400" : "text-zinc-300"}`} />
                  </button>
                  {product.inStock && (
                    <div className="absolute bottom-0 inset-x-0 p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={() => addToCart(product)}
                        className={`w-full py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                          addedToCart === product.id
                            ? "bg-emerald-600 text-white"
                            : "bg-violet-600 hover:bg-violet-500 text-white"
                        }`}
                      >
                        {addedToCart === product.id ? (
                          <><Check className="h-3.5 w-3.5" /> Added!</>
                        ) : (
                          <><ShoppingCart className="h-3.5 w-3.5" /> Add to Cart</>
                        )}
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">{product.category}</p>
                  <p className="text-sm font-semibold text-zinc-200 group-hover:text-violet-300 transition-colors truncate">{product.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-zinc-100">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-zinc-600 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] text-zinc-500">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-zinc-500 text-lg">No products found</p>
            <p className="text-zinc-600 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-zinc-900 border-l border-zinc-800/50 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-zinc-800/50">
                <div>
                  <h2 className="font-semibold text-zinc-100">Shopping Cart</h2>
                  <p className="text-xs text-zinc-500">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="h-8 w-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <ShoppingCart className="h-12 w-12 text-zinc-700 mb-3" />
                    <p className="text-zinc-500">Your cart is empty</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="mt-4 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Continue Shopping →
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-zinc-800/50 rounded-xl">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-200 truncate">{item.name}</p>
                        <p className="text-xs text-zinc-500">{item.color}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-sm font-bold">${item.price * item.qty}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))}
                              className="h-5 w-5 rounded bg-zinc-700 text-xs font-bold flex items-center justify-center hover:bg-zinc-600 transition-colors"
                            >−</button>
                            <span className="text-xs w-4 text-center">{item.qty}</span>
                            <button
                              onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))}
                              className="h-5 w-5 rounded bg-zinc-700 text-xs font-bold flex items-center justify-center hover:bg-zinc-600 transition-colors"
                            >+</button>
                            <button
                              onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))}
                              className="h-5 w-5 rounded bg-zinc-700 flex items-center justify-center hover:bg-rose-600/40 transition-colors ml-1"
                            ><X className="h-3 w-3" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t border-zinc-800/50 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="font-bold text-zinc-100">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Shipping</span>
                    <span className="text-emerald-400">{cartTotal >= 150 ? "Free" : "$12.00"}</span>
                  </div>
                  <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm">
                    Checkout · ${cartTotal >= 150 ? cartTotal.toFixed(2) : (cartTotal + 12).toFixed(2)}
                  </button>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full text-xs text-zinc-500 hover:text-zinc-300 transition-colors py-1"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}