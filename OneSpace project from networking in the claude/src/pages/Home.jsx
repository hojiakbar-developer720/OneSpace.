import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  ShoppingBag,
  Shield,
  Truck,
  RefreshCw,
  Zap,
  ChevronRight,
} from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Obsidian Desk Lamp",
    price: 189,
    rating: 4.9,
    reviews: 312,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    badge: "Bestseller",
    badgeColor: "amber",
  },
  {
    id: 2,
    name: "Merino Knit Throw",
    price: 245,
    rating: 4.8,
    reviews: 198,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    badge: "New",
    badgeColor: "violet",
  },
  {
    id: 3,
    name: "Ceramic Pour Set",
    price: 134,
    rating: 4.7,
    reviews: 445,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80",
    badge: "Popular",
    badgeColor: "emerald",
  },
  {
    id: 4,
    name: "Linen Storage Basket",
    price: 78,
    rating: 4.6,
    reviews: 267,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    badge: null,
    badgeColor: null,
  },
];

const categories = [
  {
    name: "Lighting",
    count: 42,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a35076782?w=400&q=80",
  },
  {
    name: "Furniture",
    count: 78,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  },
  {
    name: "Kitchen",
    count: 56,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  },
  {
    name: "Textiles",
    count: 34,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
  },
];

const testimonials = [
  {
    name: "Amara Chen",
    role: "Interior Designer",
    text: "The quality is extraordinary. Every piece I've ordered has become a conversation starter in my clients' homes.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
  },
  {
    name: "Lucas Ferreira",
    role: "Architect",
    text: "OneSpace curates pieces that balance form and function perfectly. My go-to for project sourcing.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
  },
  {
    name: "Sofia Park",
    role: "Home Stylist",
    text: "Exceptional taste, fast delivery, and the packaging alone feels like a luxury unboxing experience.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
  },
];

const badgeStyles = {
  amber: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  violet: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

export default function Home() {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">OneSpace</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <Link to="/Home" className="hover:text-zinc-100 transition-colors">Home</Link>
            <Link to="/Store" className="hover:text-zinc-100 transition-colors">Store</Link>
            <span className="hover:text-zinc-100 transition-colors cursor-pointer">About</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/Store"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop Now
            </Link>
            <Link
              to="/Dashboard"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-3 py-2 rounded-lg hover:bg-zinc-800/50"
            >
              Dashboard →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1800&q=80"
            alt="hero"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        </div>
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-violet-400 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              New collection — Winter 2025
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              Spaces that{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                inspire
              </span>{" "}
              living.
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-xl">
              Curated home objects designed with intention. Each piece is
              selected for its craftsmanship, materiality, and ability to
              transform everyday space.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/Store"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02]"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-200 font-semibold px-7 py-3.5 rounded-2xl border border-zinc-700/50 transition-all duration-200"
              >
                Browse Categories
              </a>
            </div>
            <div className="flex items-center gap-6 mt-10">
              {[["12K+", "Happy Customers"], ["98%", "Satisfaction Rate"], ["4.9★", "Average Rating"]].map(([val, label]) => (
                <div key={label}>
                  <p className="text-xl font-bold text-zinc-100">{val}</p>
                  <p className="text-xs text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-2">Browse</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Shop by Category</h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link to="/Store" className="group relative block aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="font-semibold text-zinc-100">{cat.name}</p>
                  <p className="text-xs text-zinc-400">{cat.count} items</p>
                </div>
                <div className="absolute top-3 right-3 bg-zinc-950/60 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className="h-3.5 w-3.5 text-zinc-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-2">Featured</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Editor's Picks</h2>
            </div>
            <Link
              to="/Store"
              className="hidden sm:flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link to="/Store" className="group block">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-zinc-800/50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${badgeStyles[product.badgeColor]}`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-zinc-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 inset-x-3 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="bg-violet-600 text-white text-xs font-semibold px-4 py-2 rounded-xl w-full text-center">
                        Quick View
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{product.category}</p>
                    <p className="font-semibold text-zinc-100 group-hover:text-violet-300 transition-colors">{product.name}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-zinc-300 font-bold">${product.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-zinc-400">{product.rating} ({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On all orders over $150. Express delivery available." },
            { icon: Shield, title: "Certified Quality", desc: "Every product is hand-inspected before dispatch." },
            { icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free returns, no questions asked." },
          ].map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/50"
            >
              <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <p className="font-semibold text-zinc-100 mb-1">{title}</p>
                <p className="text-sm text-zinc-500">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-2">Reviews</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Loved by Designers</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-zinc-700" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 p-12 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to transform your space?</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Discover our full collection — over 500 curated pieces waiting to find their home.
            </p>
            <Link
              to="/Store"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.02]"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm">OneSpace</span>
          </div>
          <p className="text-xs text-zinc-600">© 2025 OneSpace. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <span className="hover:text-zinc-300 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-zinc-300 cursor-pointer transition-colors">Terms</span>
            <Link to="/Dashboard" className="hover:text-violet-400 transition-colors">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}