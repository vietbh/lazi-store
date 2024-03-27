import { useState, useEffect, useRef } from 'react';
function ProductCategory() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [loading, setLoading] = useState(false);
  
    const sentinelRef = useRef(null);

    useEffect(() => {
      fetchProducts(currentPage);
    }, [currentPage]);
  
    const fetchProducts = async (page) => {
      setLoading(true);
  
      const response = await fetch(`/api/products?page=${page}`);
      const data = await response.json();
  
      setProducts(prevProducts => [...prevProducts, ...data.data]);
      setLastPage(data.last_page);
      setLoading(false);
    };
  
    const loadMoreProducts = () => {
      if (currentPage < lastPage) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    };
  
    useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreProducts();
        }
      });
  
      observer.observe(sentinelRef.current);
  
      return () => {
        observer.disconnect();
      };
    }, [loading]);
    return (
        <section>
            <div>
                <h1>Product List</h1>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
                {currentPage < lastPage && (
                    <div ref={sentinelRef} style={{ height: '10px' }} />
                )}
            </div>
        </section>
    );
}

export default ProductCategory;