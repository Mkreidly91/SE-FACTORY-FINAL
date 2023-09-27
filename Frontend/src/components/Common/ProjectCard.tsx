import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { LocationOnOutlined } from '@mui/icons-material';
import Bed from '@mui/icons-material/BedOutlined';
import Bath from '@mui/icons-material/BathtubOutlined';
import Ruler from '@mui/icons-material/SquareFootOutlined';

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
      className="monster "
      sx={{
        width: 355,

        borderRadius: '16px',
        padding: '10px',
        boxShadow: '7px 7px 12px -3px rgba(0,0,0,0.15)',
      }}
    >
      <CardMedia
        component="img"
        alt="Project thumbnail"
        sx={{
          height: 225,
          objectFit: 'cover',
          borderRadius: '10px',
        }}
        src={thumbnail}
      />
      <CardContent>
        <Typography
          sx={{ fontFamily: 'inherit' }}
          gutterBottom
          variant="h5"
          component="div"
        >
          <span className="font-semibold text-2xl text-neutral-800">
            {name}
          </span>
        </Typography>
        <Typography
          sx={{ fontFamily: 'inherit' }}
          gutterBottom
          variant="h5"
          component="div"
        >
          <span className="text-neutral-700  text-3xl tracking-wide">
            ${price?.toLocaleString()}
          </span>
        </Typography>
        <div className="flex gap-4">
          <div className="flex gap-1 items-end text-gray-700">
            <Bed color="inherit" />
            <span className=" font-medium">{bedrooms}</span>
          </div>
          <div className="flex gap-1 items-end  text-gray-700">
            <Bath color="inherit" />
            <span className=" font-medium"> {bathrooms}</span>
          </div>
          <div className="flex  items-end  text-gray-700">
            <Ruler color="inherit" />
            <span className=" font-medium">{size}m&sup2;</span>
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
