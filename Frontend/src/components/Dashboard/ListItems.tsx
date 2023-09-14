import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import {
  Logout,
  Settings,
  ExpandLess,
  ExpandMore,
  Add,
  Edit,
  ViewList,
  Search,
} from '@mui/icons-material';
// import { logOut } from "../api/auth";
import { Link, useNavigate } from 'react-router-dom';
// import { isAdmin, setGlobal } from "../helpers/globals";
import { Collapse, Divider } from '@mui/material';
import { getListItems } from './ListItemLinks';

export const MainListItems = ({ prefix }) => {
  const [expandedCreate, setExpandedCreate] = useState(false);
  const [expandedEdit, setExpandedEdit] = useState(false);
  const [expandedView, setExpandedView] = useState(false);
  const [expandedSearch, setExpandedSearch] = useState(false);
  const [expandedSeSearch, setExpandedSeSearch] = useState(false);
  const {
    dashboard,
    createList,
    viewList,
    editList,
    dataEntryList,
    searchList,
    sideEffectSearchList,
  } = getListItems(prefix);
  const adminList = (
    <>
      {dashboard}
      {/* {search} */}
      <ListItemButton
        onClick={() => {
          setExpandedSearch(!expandedSearch);
        }}
      >
        <ListItemIcon>
          <Search />
        </ListItemIcon>
        <ListItemText primary={'Search'} />
        {expandedSearch ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={expandedSearch}>
        <Divider sx={{ my: 1 }} />
        {searchList}
        <Divider sx={{ my: 1 }} />
      </Collapse>
      <ListItemButton
        onClick={() => {
          setExpandedCreate(!expandedCreate);
        }}
      >
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary={'Create'} />
        {expandedCreate ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={expandedCreate}>
        <Divider sx={{ my: 1 }} />
        {createList}
        <Divider sx={{ my: 1 }} />
      </Collapse>
      <ListItemButton
        onClick={() => {
          setExpandedEdit(!expandedEdit);
        }}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText primary={'Edit'} />
        {expandedEdit ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={expandedEdit}>
        <Divider sx={{ my: 1 }} />
        {editList}
        <Divider sx={{ my: 1 }} />
      </Collapse>
      <ListItemButton
        onClick={() => {
          setExpandedView(!expandedView);
        }}
      >
        <ListItemIcon>
          <ViewList />
        </ListItemIcon>
        <ListItemText primary={'View'} />
        {expandedView ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={expandedView}>
        <Divider sx={{ my: 1 }} />
        {viewList}
        <Divider sx={{ my: 1 }} />
      </Collapse>

      <ListItemButton
        onClick={() => {
          setExpandedSeSearch(!expandedSeSearch);
        }}
      >
        <ListItemIcon>
          <Search />
        </ListItemIcon>
        <ListItemText primary={'Side Effects'} />
        {expandedSeSearch ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={expandedSeSearch}>
        <Divider sx={{ my: 1 }} />
        {sideEffectSearchList}
        <Divider sx={{ my: 1 }} />
      </Collapse>
    </>
  );

  const standardList = (
    <>
      {dashboard}
      <ListItemButton
        onClick={() => {
          setExpandedSearch(!expandedSearch);
        }}
      >
        <ListItemIcon>
          <Search />
        </ListItemIcon>
        <ListItemText primary={'Search'} />
        {expandedSearch ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={expandedSearch}>
        <Divider sx={{ my: 1 }} />
        {searchList}
        <Divider sx={{ my: 1 }} />
      </Collapse>
      {viewList}
    </>
  );
  let list;
  switch (prefix) {
    case '/admin':
      list = adminList;
      break;
    case '/standard':
      list = standardList;
      break;
    case '/dataentry':
      list = dataEntryList;
      break;
    default:
      list = <></>;
  }

  return <React.Fragment>{list}</React.Fragment>;
};

export const SecondaryListItems = ({ prefix }) => {
  const isUserAdmin = isAdmin();
  const navigate = useNavigate();
  const userSettings = (
    <ListItemButton component={Link} to={`${prefix}/user`}>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="User Settings" />
    </ListItemButton>
  );
  const logout = (
    <ListItemButton
      component={Link}
      to={`/login`}
      onClick={async (e) => {
        // e.preventDefault();
        // setGlobal("accessToken", "");
        // await logOut();
        // navigate("/login");
      }}
    >
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  );
  return (
    <>
      <ListSubheader component="div" inset>
        Settings
      </ListSubheader>
      {isUserAdmin && userSettings}
      {logout}
    </>
  );
};
