import { ReactNode } from 'react';
import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';

interface DashListItemProps {
  to?: string;
  icon: ReactNode;
  text: string | number;
  className?: string;
  containerStyles?: string;
  onClick?: () => void;
}
const DashListItem = ({
  to,
  icon,
  text,
  className,
  containerStyles,

  onClick,
}: DashListItemProps) => {
  return (
    <div className={containerStyles}>
      {to ? (
        <Link to={to}>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>
              <span className={`monster font-medium text-[14px]  ${className}`}>
                {text}
              </span>
            </ListItemText>
          </ListItemButton>
        </Link>
      ) : (
        <ListItemButton
          onClick={() => {
            onClick ? onClick() : undefined;
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>
            <span className={`monster font-medium text-[14px] ${className}`}>
              {text}
            </span>
          </ListItemText>
        </ListItemButton>
      )}
    </div>
  );
};
export default DashListItem;
