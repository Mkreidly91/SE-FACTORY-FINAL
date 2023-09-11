import { ReactNode } from 'react';
import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';

interface DashListItemProps {
  to: string;
  icon: ReactNode;
  text: string;
}
const DashListItem = ({ to, icon, text }: DashListItemProps) => {
  return (
    <Link to={to}>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          <span className="monster font-medium text-[14px] text-gray-500">
            {text}
          </span>
        </ListItemText>
      </ListItemButton>
    </Link>
  );
};
export default DashListItem;
