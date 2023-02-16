import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../theme/Colors'
import { logoutInitiate } from '../../redux/actions'

const logoName = 'D-Diary'
const pages = ['Site', 'Blog'];
const settings = ['Update Profile', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElDiary, setAnchorElDiary] = React.useState(null);
  const [anchorElDiaryBlock, setAnchorElDiaryBlock] = React.useState(null);

  const navigate = useNavigate();

  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch();

  const logoutUser = () => {
    if (currentUser)
      dispatch(logoutInitiate())
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenDiaryMenu = (event) => {
    setAnchorElDiary(event.currentTarget)
  }

  const handleOpenDiaryMenuBlock = (event) => {
    setAnchorElDiaryBlock(event.currentTarget)
  }

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
    // console.log(event.target.textContent)
    const val = event.target.textContent;

    switch (val) {
      default:
        break;
    }
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    // console.log(event.target.textContent)
    const val = event.target.textContent;

    switch (val) {

      case 'Dashboard':
        navigate('/');
        break;

      case 'Update Profile':
        navigate('/updateprofile');
        break;

      case 'Logout': logoutUser()
        break;

      default:
        break;
    }
  };

  const handleCloseDiaryMenu = (event) => {
    setAnchorElDiary(null);
    setAnchorElNav(null);

    const val = event.target.textContent;

    switch (val) {

      case "Today's Entry":
        navigate('/entry');
        break;

      case "Past Entries":
        navigate('/pastentries');
        break;

      default:
        break;
    }
  }

  const handleCloseDiaryMenuBlock = (event) => {
    setAnchorElDiaryBlock(null);

    const val = event.target.textContent;

    switch (val) {

      case "Today's Entry":
        navigate('/entry');
        break;

      case "Past Entries":
        navigate('/pastentries');
        break;

      default:
        break;
    }
  }

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} ></AdbIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: colors.textPrimary,
              textDecoration: 'none',
            }}
          >
            {logoName}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              {currentUser && <MenuItem onClick={anchorElDiary ? handleCloseDiaryMenu : handleOpenDiaryMenu}>
                <Typography textAlign="center">Diary</Typography>
                <Menu
                  id='diary-menu-appbar'
                  anchorEl={anchorElDiary}
                  keepMounted
                  open={Boolean(anchorElDiary)}
                  onClose={handleCloseDiaryMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem onClick={handleCloseDiaryMenu}>
                    <Typography textAlign="center">Today's Entry</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseDiaryMenu} >
                    <Typography textAlign="center">Past Entries</Typography>
                  </MenuItem>
                </Menu>
              </MenuItem>}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {logoName}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            {currentUser && <Button
              onClick={anchorElDiaryBlock ? handleCloseDiaryMenuBlock : handleOpenDiaryMenuBlock}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Diary
            </Button>
            }
            <Menu
              id='diary-menu-appbar'
              anchorEl={anchorElDiaryBlock}
              keepMounted
              open={Boolean(anchorElDiaryBlock)}
              onClose={handleCloseDiaryMenuBlock}
              sx={{ mt: '45px' }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleCloseDiaryMenuBlock}>
                <Typography textAlign="center">Today's Entry</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseDiaryMenuBlock} >
                <Typography textAlign="center">Past Entries</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {currentUser && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={`${currentUser.displayName ? currentUser.displayName : `user`}'s Settings`}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={currentUser.photoURL}></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default ResponsiveAppBar;