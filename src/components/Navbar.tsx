import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">K</span>
            </div>
            <span className="text-2xl font-bold gradient-text">KeySaudi</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              الرئيسية
            </Link>
            <Link to="/features" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              المميزات
            </Link>
            <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              الأسعار
            </Link>
            <Link to="/contact" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              تواصل معنا
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:block text-foreground/80 hover:text-foreground transition-colors font-medium">
              تسجيل الدخول
            </button>
            <button className="gradient-bg px-6 py-2.5 rounded-xl text-primary-foreground font-medium shadow-soft hover:shadow-glow transition-all duration-300">
              ابدأ مجاناً
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
