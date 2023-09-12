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

import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Logo from '../../assets/icons/logo/logo-full.svg';
import LogoOwl from '../../assets/icons/logo/logo-owl-white.svg';
import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import ProjectIcon from '@mui/icons-material/AccountTreeOutlined';
import ProfileIcon from '@mui/icons-material/AccountBoxOutlined';
import { Link } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import DashListItem from './DashListItem';
import DashIcon from '@mui/icons-material/Dashboard';

import Banner from '../../assets/images/company-profile/company-profile.jpeg';
import companyLogo from '../../assets/images/company-profile/companyLogo.png';

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
    <div className="flex  w-full h-full ">
      <Drawer
        className="border-r-0  bg-red-200"
        variant="permanent"
        open={open}
        sx={{
          backgroundImage:
            'linear-gradient(140deg, rgba(52, 83, 154, 1) 0%, #272c37 100%)',
          backgroundColor: 'transparent',
        }}
      >
        <div className="sidebarBackgound dash-gradient bg-red-200 h-full">
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
            <div
              className="logo-container cursor-pointer mt-[30px]"
              onClick={toggleDrawer}
            >
              {open ? (
                <img className="w-[112px]" src={Logo} alt="" />
              ) : (
                <img className="w-[35px]" src={LogoOwl} alt="" />
              )}
            </div>
          </Toolbar>
          <List className="grow" sx={{ paddingLeft: '5px' }} component="nav">
            <DashListItem
              icon={<DashIcon sx={{ color: 'white' }} />}
              text="Dashboard"
            />
            <DashListItem
              to="/dashboard/projects"
              icon={<ProjectIcon sx={{ color: 'white' }} />}
              text="Projects"
            />

            <DashListItem
              to="/dashboard/projects/addProject"
              icon={<ProfileIcon sx={{ color: 'white' }} />}
              text="Profile"
            />
          </List>
        </div>
      </Drawer>

      <div className="w-full overflow-y-auto  b-grey-light">
        <div className="dashboard-header h-[18%] max-h-[200px] relative">
          <img
            src={companyLogo}
            alt=""
            className="absolute left-[10%] top-[60%] w-[150px] h-[150px]"
          />
          <img src={Banner} className="w-full h-full object-cover" />
        </div>

        {/* <Toolbar /> */}
        <DashboardRoutes />
      </div>
    </div>
  );
}

export default DashBoard;
{
  /* <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton> */
}
