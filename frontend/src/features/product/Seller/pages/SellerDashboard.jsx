/* ── Seller Dashboard ─────────────────────────────────────────────────────── *
 *  Root page component. Owns layout, routing between sections, and all        *
 *  dashboard-specific state (filters, active page, sidebar collapse).         *
 *  Sub-components live in ../components/seller-dashboard/.                    *
 * ─────────────────────────────────────────────────────────────────────────── */

import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useProduct from '../hooks/useProduct.hook';

import Sidebar   from '../components/seller-dashboard/Sidebar';
import Header    from '../components/seller-dashboard/Header';
import { ComingSoon } from '../components/seller-dashboard/Card';
import ProfilePage from '../components/seller-dashboard/ProfilePage';
import { NAV, DUMMY_DATA } from '../components/seller-dashboard/data';
import { StatCard, TopProductsCard, SalesChartCard, LatestOrdersCard } from '../components/seller-dashboard/DashboardPage';
import { IcoBag, IcoDollar } from '../components/seller-dashboard/Icons';

import ProductsPage from './ProductsPage';
import AddProduct   from './addProduct';

/* ── Global CSS — injected once at layout root ── */
const GLOBAL_STYLES = `
  *{box-sizing:border-box}
  ::-webkit-scrollbar{width:4px;height:4px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px}
  .nav-btn{transition:background 0.18s,color 0.18s;font-family:Inter,sans-serif}
  .nav-btn:hover{background:rgba(255,255,255,0.06)!important}
  .nav-btn.active-nav{background:rgba(255,107,53,0.11)!important;color:#ff6b35!important}
  .product-card{transition:transform 0.22s ease,box-shadow 0.22s ease}
  .product-card:hover{transform:translateY(-4px);box-shadow:0 20px 52px rgba(0,0,0,0.5)!important}
  .toggle-btn:hover{background:rgba(255,255,255,0.08)!important;color:rgba(255,255,255,0.65)!important}
  @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .fade-in{animation:fadeIn 0.3s ease both}
  @keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}
  .skeleton{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:shimmer 1.8s infinite}
  select option{background:#131928;color:#fff}
  input[type=number]{-moz-appearance:textfield}
  input[type=number]::-webkit-inner-spin-button{display:none}
  input:focus,select:focus{border-color:rgba(255,107,53,0.45)!important;outline:none}
`;

/* ── Dashboard section — rendered inline as it belongs to this page ── */
function DashboardSection() {
  // TODO: replace DUMMY_DATA with real Redux selectors when backend is connected
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Row 1: KPI stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <StatCard
          icon={<IcoBag />}
          iconBg="rgba(255,107,53,0.12)"
          iconColor="#ff6b35"
          badge="+12%"
          value={DUMMY_DATA.totalOrders.toLocaleString()}
          label="Total Orders"
        />
        <StatCard
          icon={<IcoDollar />}
          iconBg="rgba(168,85,247,0.12)"
          iconColor="#a855f7"
          badge="+8.3%"
          value={`$${DUMMY_DATA.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          label="Total Revenue"
        />
        <TopProductsCard products={DUMMY_DATA.topProducts} />
      </div>

      {/* Row 2: Sales chart + latest orders */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.65fr 1fr', gap: 16 }}>
        <SalesChartCard data={DUMMY_DATA.graph} />
        <LatestOrdersCard orders={DUMMY_DATA.orders} />
      </div>

    </div>
  );
}

export default function SellerDashboard() {
  /* ── UI state ── */
  const [page, setPage]         = useState('dashboard');
  const [expanded, setExpanded] = useState(true);

  /* ── Products filter / sort state ── */
  const [sortBy, setSortBy]     = useState('newest');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  /* ── Data ── */
  const { sellerProducts, loading, error } = useSelector(s => s.product);
  const { handleGetAllSellerProducts } = useProduct();

  useEffect(() => {
    if (page === 'products') {
      handleGetAllSellerProducts();
    }
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Client-side filter + sort — reads nested price.amount because backend
     stores price as { amount, currency }, not a flat number. */
  const filteredProducts = useMemo(() => {
    const amountOf = p => p?.price?.amount ?? p?.price ?? 0;
    let list = [...(sellerProducts || [])];
    if (priceMin !== '') list = list.filter(p => amountOf(p) >= Number(priceMin));
    if (priceMax !== '') list = list.filter(p => amountOf(p) <= Number(priceMax));
    if (sortBy === 'price_asc')  list.sort((a, b) => amountOf(a) - amountOf(b));
    if (sortBy === 'price_desc') list.sort((a, b) => amountOf(b) - amountOf(a));
    if (sortBy === 'most_sold')  list.sort((a, b) => (b.unitsSold ?? 0) - (a.unitsSold ?? 0));
    return list;
  }, [sellerProducts, priceMin, priceMax, sortBy]);

  const SBW        = expanded ? 252 : 70;
  const currentNav = NAV.find(n => n.id === page);

  return (
    <div style={{ minHeight: '100vh', background: '#07090f', color: '#fff', fontFamily: 'Inter,system-ui,sans-serif', display: 'flex' }}>
      <style>{GLOBAL_STYLES}</style>

      <Sidebar page={page} setPage={setPage} expanded={expanded} setExpanded={setExpanded} />

      <main style={{ marginLeft: SBW, flex: 1, minHeight: '100vh', transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)', display: 'flex', flexDirection: 'column' }}>

        <Header currentNav={currentNav} />

        {/* key forces fade-in animation to replay on every page navigation */}
        <div style={{ flex: 1, padding: '26px 32px 44px', overflowY: 'auto' }} key={page} className="fade-in">

          {page === 'dashboard' && <DashboardSection />}

          {page === 'products' && (
            <ProductsPage
              products={filteredProducts} loading={loading} error={error}
              sortBy={sortBy}     
              setSortBy={setSortBy}
              priceMin={priceMin} 
              setPriceMin={setPriceMin}
              priceMax={priceMax} 
              setPriceMax={setPriceMax}
            />
          )}

          {page === 'create-product' && <AddProduct />}

          {page === 'profile' && <ProfilePage />}

          {page === 'orders' && <ComingSoon label={currentNav?.label} />}

        </div>
      </main>
    </div>
  );
}
