import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @mui
import { Container, Stack, Typography } from '@mui/material';

// components
import axios from 'axios';
import { decrement, increment, addDatatest } from '../features/counter/counterSlice';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const movies = useSelector((state) => state.counter.movies);
  const datatest = useSelector((state) => state.counter.datatest);
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  if (localStorage.getItem('favMov') === null) {
    localStorage.setItem('favMov', JSON.stringify({}));
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    // data fetching here
    axios
      // .get('https://www.majorcineplex.com/apis/get_movie_avaiable', { headers: { 'Access-Control-Allow-Origin': '*' } })
      .get('https://jsonplaceholder.typicode.com/todos/1', { headers: { 'Access-Control-Allow-Origin': '*' } })
      .then((res) => {
        dispatch(addDatatest(res.data));
        // console.log(datatest);
      })
      .catch((error) => {
        // console.log(movies);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Movies
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/* <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort /> */}
          </Stack>
        </Stack>

        <ProductList movies={movies} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
