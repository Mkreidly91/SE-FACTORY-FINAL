import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LocationOnOutlined } from '@mui/icons-material';
import Bed from '@mui/icons-material/BedOutlined';
import Bath from '@mui/icons-material/BathtubOutlined';
import Ruler from '@mui/icons-material/SquareFootOutlined';
import DashListItem from '../Dashboard/DashListItem';

type ProjectCardProps = {
  project: {
    name?: string;
    description?: string;
    location?: string;
    thumbnail?: string;
    bedrooms?: number | string;
    bathrooms?: number | string;
    price?: number | string;
    size?: number | string;
  };
};
export default function ProjectCard({ project }: ProjectCardProps) {
  const { name, location, thumbnail, bedrooms, bathrooms, price, size } =
    project;

  return (
    <Card
      className="monster"
      sx={{ width: 300, borderRadius: '16px', padding: '10px' }}
    >
      <CardMedia
        component="img"
        alt="Project thumbnail"
        height="140px"
        sx={{ height: 300, objectFit: 'cover' }}
        src={thumbnail}
      />
      <CardContent>
        <Typography
          sx={{ fontFamily: 'inherit' }}
          gutterBottom
          variant="h5"
          component="div"
        >
          <span className="font-semibold text-2xl">{name}</span>
        </Typography>
        <Typography
          sx={{ fontFamily: 'inherit' }}
          gutterBottom
          variant="h5"
          component="div"
        >
          <span className="text-gray-700 font-medium text-2xl">
            {' '}
            ${price?.toLocaleString()}
          </span>
        </Typography>
        <div className="flex gap-3">
          <div className="flex gap-2 items-center">
            <Bed color="inherit" />
            {bedrooms}
          </div>
          <div className="flex gap-2 items-center">
            <Bath color="inherit" />
            {bathrooms}
          </div>
          <div className="flex gap-2 items-center">
            <Ruler color="inherit" />
            {size}m&sup2;
          </div>
        </div>

        <div className="location flex items-center gap-2 mt-3 ml-[-5px]">
          <LocationOnOutlined sx={{ color: '#2499E3' }} />
          <span>{location}</span>
        </div>
      </CardContent>
    </Card>
  );
}
