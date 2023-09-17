import { ReactNode } from 'react';
import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';

interface DashListItemProps {
  to?: string;
  icon: ReactNode;
  text: string | number;
  className?: string;
}
const DashListItem = ({ to, icon, text, className }: DashListItemProps) => {
  return (
    <>
      {to ? (
        <Link to={to}>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>
              <span
                className={`monster font-medium text-[14px] text-white ${className}`}
              >
                {text}
              </span>
            </ListItemText>
          </ListItemButton>
        </Link>
      ) : (
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>
            <span
              className={`monster font-medium text-[14px] text-white ${className}`}
            >
              {text}
            </span>
          </ListItemText>
        </ListItemButton>
      )}
    </>
  );
};
export default DashListItem;
