import { Helmet } from 'react-helmet-async';
import { useNavigate, redirect, useSearchParams, useParams, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const movies = useSelector((state) => state.counter.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { idmovie } = useParams();
  const location = useLocation();
  function navigateToContacts() {
    console.log(localStorage.getItem('backpath'));
    navigate(localStorage.getItem('backpath'));
  }
  const mystyle = {
    display: 'flex',
    'flex-flow': 'column',
  };
  const StyledProductImg = styled('img')({
    width: '80%',
    // height: '100%',
    objectFit: 'cover',
    // position: 'absolute',
  });

  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Detail
          </Typography>
        </Stack>
        {movies.map((movie) => (
          <Grid key={movie.id} item container>
            <Grid xs={12} sm={12} md={4}>
              {parseInt(idmovie, 10) === parseInt(movie.id, 10) ? (
                <StyledProductImg
                  xs={6}
                  sm={6}
                  md={6}
                  alt={movie.title_th}
                  src={movie.poster_url}
                  onClick={() => navigate('/movies/fav', { replace: true })}
                />
              ) : (
                ''
              )}
            </Grid>
            <Grid xs={6} sm={6} md={6}>
              {parseInt(idmovie, 10) === parseInt(movie.id, 10) ? movie.synopsis_th : ''}
              {parseInt(idmovie, 10) === parseInt(movie.id, 10) ? (
                <Grid>
                  <Button className="" variant="outlined" onClick={() => navigateToContacts()}>
                    back
                  </Button>
                </Grid>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        ))}
      </Container>
    </>
  );
}
