/* ── Buyer Home (storefront) ───────────────────────────────────────────────
  Thin orchestrator: composes the sections and owns the auth-gated product
  click. DATA WIRING IS LEFT BLANK — see the TODO blocks below; until you wire
  the hook, sections fall back to mock data so the page renders. 
*/

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import "../styles/buyer.css";

import BuyerNavbar from "../components/BuyerNavbar";
import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import CollectionsFinder from "../components/CollectionsFinder";
import FeaturedScroll from "../components/FeaturedScroll";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";

import { MOCK_PRODUCTS } from "../components/data";

const Home = () => {
  const navigate = useNavigate();

  // Auth: logged-out users can browse but are sent to login on product click.
  const { user } = useSelector((state) => state.auth);

  /* ──────────────────────────────────────────────────────────────────────
    TODO (you): wire real product data here. Example:

      const { handleAllBuyerProducts } = useProduct();
      useEffect(() => { handleAllBuyerProducts(); }, []);
      const { products, loading, error } = useSelector((s) => s.product);

    Then pass `products / loading / error` into <ProductSection /> and replace
    the mock fallbacks below. `onRetry` should re-call handleAllBuyerProducts.
     ────────────────────────────────────────────────────────────────────── */
  const products = MOCK_PRODUCTS; // placeholder
  const loading = false; // placeholder
  const error = null; // placeholder

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
    // TODO (you): navigate to the product detail route once it exists.
    // navigate(`/product/${product._id}`);
    void product;
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
        onRetry={() => { /* TODO: re-fetch products */ }}
      />

      <Footer />
    </div>
  );
};

export default Home;
