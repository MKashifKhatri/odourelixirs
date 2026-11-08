import { Component, lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const Shop = lazy(() => import("./pages/Shop"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const JournalPage = lazy(() => import("./pages/JournalPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const InfoPage = lazy(() => import("./pages/InfoPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="mx-auto max-w-page px-5 py-32 text-center">
          <h1 className="text-3xl">Something went wrong.</h1>
          <p className="mt-3 text-sm text-muted">
            Please refresh the page and try again.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Loading = () => (
  <div role="status" className="py-40 text-center text-sm text-muted">
    Loading…
  </div>
);

export default function App() {
  return (
    <>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route
                path="/discovery-set"
                element={<ProductPage slugOverride="discovery-set" />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/journal/:slug" element={<ArticlePage />} />
              <Route path="/info/:page" element={<InfoPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
