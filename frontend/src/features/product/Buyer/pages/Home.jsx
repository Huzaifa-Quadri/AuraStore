/* ── Buyer Home (storefront) ───────────────────────────────────────────────
  Thin orchestrator: composes the sections and owns the auth-gated product
  click. Real products are fetched on mount via useProduct and read from the
  `product` slice; a click routes to /product/:id (login-gated when logged out). */

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {useEffect} from "react";

import "../styles/buyer.css";

import BuyerNavbar from "../components/BuyerNavbar";
import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import CollectionsFinder from "../components/CollectionsFinder";
import FeaturedScroll from "../components/FeaturedScroll";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";

import {useProduct} from "../hook/useProduct.hook";

const Home = () => {
  const navigate = useNavigate();

  // Auth: logged-out users can browse but are sent to login on product click.
  const { user } = useSelector((state) => state.auth);

  const {handleAllBuyerProducts} = useProduct();

  useEffect(()=>{
    handleAllBuyerProducts();
  }, []);

  const {products, loading, error} = useSelector((state) => state.product);

  // Auth gate: any card/button routes logged-out users to /login first.
  // When logged in, the wrapped action runs (wire real routes inside each).
  function guard(action) {
    return (...args) => {
      if (!user) {
        toast.error("Please log in to continue");
        navigate("/login");
        return;
      }
      action?.(...args);
    };
  }

  // Account icon: profile when logged in, login otherwise.
  function handleAccountClick() {
    navigate(user ? "/select-role" : "/login");
  }

  const handleProductClick = guard((product) => {
    navigate(`/product/${product._id}`);
  });

  return (
    <div className="buyer-home">
      <BuyerNavbar onAccountClick={handleAccountClick} cartCount={0} />

      <HeroBanner
        onShop={guard(() => { /* TODO: scroll to / route to products */ })}
        onExplore={guard(() => { /* TODO: route to collections */ })}
      />

      <CategoryGrid
        onCategoryClick={guard((c) => { /* TODO: route to category page */ void c; })}
        onSeeAll={guard(() => { /* TODO: route to all categories */ })}
      />

      <CollectionsFinder
        onApply={guard((collectionId) => { /* TODO: filter/route by collection */ void collectionId; })}
      />

      <FeaturedScroll
        products={products}
        onProductClick={handleProductClick}
        onSeeAll={guard(() => { /* TODO: route to featured */ })}
        onFeaturedClick={guard(() => { /* TODO: route to featured edit */ })}
      />

      <ProductSection
        title="Trending Now"
        products={products}
        loading={loading}
        error={error}
        onProductClick={handleProductClick}
        onRetry={handleAllBuyerProducts}
      />

      <Footer />
    </div>
  );
};

export default Home;
