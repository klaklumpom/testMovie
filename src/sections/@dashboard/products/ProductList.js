import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default function ProductList({ movies, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {movies.map((movie) => (
        <Grid key={movie.id} item xs={12} sm={6} md={3}>
          <ShopProductCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
