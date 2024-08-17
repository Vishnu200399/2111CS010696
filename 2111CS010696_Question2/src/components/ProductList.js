import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, Container, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import Filter from './Filter';
import Pagination from './Pagination';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    company: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    availability: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://20.244.56.144/test/companies/${filters.company}/categories/${filters.category}/products?top=100&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`);
      const data = response.data;
      // Add unique IDs to products
      const productsWithIds = data.map((product, index) => ({ ...product, id: index }));
      setProducts(productsWithIds);
      setFilteredProducts(productsWithIds);
    };

    fetchData();
  }, [filters]);

  // Filter products based on filters
  useEffect(() => {
    const filterProducts = () => {
      let filtered = [...products];
      // Apply filters based on filter values
      if (filters.company) {
        filtered = filtered.filter(product => product.company === filters.company);
      }
      // ... add filtering for other filters (category, price, rating, availability)

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [products, filters]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filter changes
  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>
      <Filter handleFilterChange={handleFilterChange} filters={filters} />
      <Grid container spacing={3}>
        {currentProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            {/* Display product details */}
          </Grid>
        ))}
      </Grid>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Container>
  );
};

export default ProductList;