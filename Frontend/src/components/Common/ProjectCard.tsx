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
  console.log(project);
  const {
    name,
    description,
    location,
    thumbnail,
    bedrooms,
    bathrooms,
    price,
    size,
  } = project;

  return (
    <Card className="monster" sx={{ width: 300, borderRadius: '16px' }}>
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
          {name}
        </Typography>
        <Typography
          sx={{ fontFamily: 'inherit' }}
          gutterBottom
          variant="h5"
          component="div"
        >
          ${price?.toLocaleString()}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          
        </Typography> */}
        <div className="flex gap-3">
          <div className="flex gap-2 items-center">
            <Bed />
            {bedrooms}
          </div>
          <div className="flex gap-2 items-center">
            <Bath />
            {bathrooms}
          </div>
          <div className="flex gap-2 items-center">
            <Ruler />
            {size}m&sup2;
          </div>
        </div>

        <div className="location flex items-center gap-2 mt-3 ml-[-5px]">
          <LocationOnOutlined sx={{ color: '#2499E3' }} />
          <span>{location}</span>
        </div>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
