import PropTypes from 'prop-types';
import { NavLink as RouterLink, redirect, Navigate, useNavigate } from 'react-router-dom';

// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const navigate = useNavigate();
  function logout() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // import { NavLink as RouterLink, redirect, Navigate, useNavigate } from 'react-router-dom';
    // localStorage.removeItem('user');
    // localStorage.clear(); //
    // navigate('/dashboard', { replace: true });
  }
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => {
          if (item.title === 'logout') {
            return <button onClick={logout}>logout </button>;
          }
          return (
            <StyledNavItem
              component={RouterLink}
              to={item.path}
              sx={{
                '&.active': {
                  color: 'text.primary',
                  bgcolor: 'action.selected',
                  fontWeight: 'fontWeightBold',
                },
              }}
            >
              <StyledNavItemIcon>{item.icon && item.icon}</StyledNavItemIcon>

              <ListItemText disableTypography primary={item.title} />

              {item.info && item.info}
            </StyledNavItem>
          );
        })}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
