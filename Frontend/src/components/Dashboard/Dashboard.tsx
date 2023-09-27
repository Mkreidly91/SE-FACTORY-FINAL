import { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Logo from '../../assets/icons/logo/logo-full.svg';
import LogoOwl from '../../assets/icons/logo/logo-owl-white.svg';
import ProjectIcon from '@mui/icons-material/AccountTreeOutlined';
import ProfileIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import DashboardRoutes from './DashboardRoutes';
import DashListItem from './DashListItem';
import DashIcon from '@mui/icons-material/Dashboard';

import { useNavigate } from 'react-router-dom';

const drawerWidth: number = 240;

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

function DashBoard() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
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
              className=" text-white"
            />
            <DashListItem
              to="/dashboard/projects"
              icon={<ProjectIcon sx={{ color: 'white' }} />}
              text="Projects"
              className=" text-white hover:underline underline-offset-8 "
            />

            <DashListItem
              to="/dashboard/editProfile"
              icon={<ProfileIcon sx={{ color: 'white' }} />}
              text="Profile"
              className=" text-white hover:underline underline-offset-8 "
            />

            <DashListItem
              icon={<LogoutIcon sx={{ color: 'white' }} />}
              className=" text-white hover:underline underline-offset-8 "
              text="Log out"
              onClick={() => {
                localStorage.clear();
                navigate('/');
              }}
            />
          </List>
        </div>
      </Drawer>

      <div className="w-full overflow-y-auto  b-grey-light">
        {/* <div className="dashboard-header h-[18%] max-h-[200px] relative">
          <img
            src={companyLogo}
            alt=""
            className="absolute left-[10%] top-[60%] w-[150px] h-[150px]"
          />
          <img src={Banner} className="w-full h-full object-cover" />
        </div> */}
        <DashboardRoutes />
      </div>
    </div>
  );
}

export default DashBoard;
