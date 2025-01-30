import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductPage from "./pages/Product";
// setup query client provider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import ScrollToTargetOnRouteChange from "./components/scroll/ScrollTotarget";
import Checkout from "./pages/Checkout";


function App() {
  const [client] = useState(new QueryClient());
  return (
    <>
      <QueryClientProvider client={client}>
      <Router>
        <Navbar />
        <ScrollToTargetOnRouteChange/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer/>
      </Router>
      </QueryClientProvider>

    </>
  );
}

export default App;
