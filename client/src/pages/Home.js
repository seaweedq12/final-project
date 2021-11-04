import React from 'react';
import { useQuery } from '@apollo/client';

import ProductList from '../components/ProductList';
import { QUERY_PRODUCTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const products = data?.products || [];

  return (
    <main>
      <div className="flex-row justify-center">
      <div className="col-11 col-md-10 mb-3 ">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProductList
              products={products}
              title="Our products"
            />
          )}
        </div>
          
      </div>
    </main>
  );
};

export default Home;