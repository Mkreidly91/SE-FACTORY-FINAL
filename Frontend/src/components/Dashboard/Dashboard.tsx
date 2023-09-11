import { useState } from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// import { MainListItems, SecondaryListItems } from './ListItems';

// import LeaflitIcon from '../images/LeaflitIcon.png'

import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Logo from '../../assets/icons/logo/logo-full-black.svg';
import LogoOwl from '../../assets/icons/logo/logo-owl.svg';
import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import ProjectIcon from '@mui/icons-material/AccountTreeOutlined';
import ProfileIcon from '@mui/icons-material/AccountBoxOutlined';
import { Link } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import DashListItem from './DashListItem';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    border: 'none',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashBoard({
  // title,
  children,
}: // prefix,
{
  // title?: string;
  children: any;
  // prefix: string;
}) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <div className="flex max-w-[100vw] h-full pt-[26px] pl-[21px]">
      {/* <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
            zIndex: '4000',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            fontFamily={'Nunito Sans'}
            fontWeight={900}
            sx={{ flexGrow: 1 }}
          >
            {'Leaflit Care'}
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer className="border-r-0" variant="permanent" open={open}>
        <Toolbar
          //   className="flex justify-center items-center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: [1],
            py: [1],
            mb: '4rem',
          }}
        >
          <div className="logo-container" onClick={toggleDrawer}>
            {open ? (
              <img className="w-[300px]" src={Logo} alt="" />
            ) : (
              <img className="w-[80px]" src={LogoOwl} alt="" />
            )}
          </div>

          {/* <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton> */}
        </Toolbar>
        <List className="grow" sx={{ paddingLeft: '5px' }} component="nav">
          <div className="monster pl-[16px] text-gray-500 font-semibold mb-5">
            Dashboard
          </div>
          <DashListItem
            to="/dashboard/projects"
            icon={<ProjectIcon />}
            text="Projects"
          />

          <DashListItem
            to="/dashboard/projects/addProject"
            icon={<ProfileIcon />}
            text="Profile"
          />
        </List>
      </Drawer>
      <div className="grow overflow-x-auto">
        {/* <Toolbar /> */}
        <DashboardRoutes />
      </div>
    </div>
  );
}

export default DashBoard;
