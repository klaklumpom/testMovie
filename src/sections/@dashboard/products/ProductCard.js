import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { NavLink as RouterLink, redirect, Navigate, useNavigate, useLocation } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  movie: PropTypes.object,
};

export default function ShopProductCard({ movie }) {
  const navigate = useNavigate();
  const location = useLocation();
  if (JSON.parse(localStorage.getItem('favMov')).length === 0 || localStorage.getItem('favMov') === null) {
    localStorage.setItem('favMov', JSON.stringify({}));
  }
  function favfunc(id, chk) {
    let a = [];
    a =
      JSON.parse(localStorage.getItem('favMov')).length !== 0
        ? Object.values(JSON.parse(localStorage.getItem('favMov')))
        : [];
    // console.log('asdasd');
    // console.log(a);
    if (chk === 1) {
      a.push(id);
      navigate(location.pathname, { replace: true });
    } else {
      const index = a.indexOf(id);
      // console.log(index);
      if (index > -1) {
        // only splice array when item is found
        a.splice(index, 1); // 2nd parameter means remove one item only
        navigate(location.pathname, { replace: true });
      }
    }
    // console.log(a);
    localStorage.setItem('favMov', JSON.stringify(a));
  }
  function blogP(id, locationpath) {
    navigate(`/movies/blog/${id}`, { replace: true });
    localStorage.setItem('backpath', locationpath);
  }

  if (
    (location.pathname === '/movies/fav' && localStorage.getItem('favMov').includes(movie.id)) ||
    location.pathname !== '/movies/fav'
  ) {
    return (
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {movie.status && (
            <Label
              variant="filled"
              color={(movie.status === 'sale' && 'error') || 'info'}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase',
              }}
            >
              {movie.status}
            </Label>
          )}
          <StyledProductImg
            alt={movie.title_th}
            src={movie.poster_url}
            onClick={() => navigate('/movies/fav', { replace: true })}
          />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover">
            <Typography variant="subtitle2" noWrap onClick={() => blogP(movie.id, location.pathname)}>
              {movie.title_th}{' '}
            </Typography>
            {Object.values(JSON.parse(localStorage.getItem('favMov'))).length > 0 &&
            Object.values(JSON.parse(localStorage.getItem('favMov'))).includes(movie.id) ? (
              <FavoriteIcon onClick={() => favfunc(movie.id, 0)} />
            ) : (
              <FavoriteBorderIcon onClick={() => favfunc(movie.id, 1)} />
            )}
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">&nbsp;</Typography>
          </Stack>
        </Stack>
      </Card>
    );
  }
}
