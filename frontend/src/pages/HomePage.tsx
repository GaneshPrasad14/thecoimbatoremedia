import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CardStack from '../components/CardStack';
import Reviews from '../components/Reviews';
import ProductDetail from '../components/ProductDetail';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { products } from '../data/products';

export default function HomePage() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.title = activeProduct
      ? `${products.find(p => p.id === activeProduct)?.name} - The Coimbatore Media`
      : 'The Coimbatore Media - Digital Excellence';
  }, [activeProduct]);

  const handleCardClick = (productId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProduct(productId);
      setIsTransitioning(false);
    }, 600);
  };

  const handleBackToStack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProduct(null);
      setIsTransitioning(false);
    }, 600);
  };

  if (activeProduct) {
    const product = products.find(p => p.id === activeProduct);
    return (
      <>
        <ProductDetail
          product={product!}
          onBack={handleBackToStack}
          isTransitioning={isTransitioning}
        />
        <BackToTop />
      </>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <Hero />
      <CardStack
        products={products}
        onCardClick={handleCardClick}
        isTransitioning={isTransitioning}
      />
      <Reviews />
      <Footer />
      <BackToTop />
    </div>
  );
}