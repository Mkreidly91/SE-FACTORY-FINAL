import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { LocationOnOutlined } from '@mui/icons-material';

type ProjectCardProps = {
  title?: string;
  description?: string;
  img?: string;
};
export default function ProjectCard({
  title,
  description,
  img,
}: ProjectCardProps) {
  return (
    <Card className="monster" sx={{ width: 300, borderRadius: '16px' }}>
      <CardMedia
        component="img"
        alt="Project thumbnail"
        height="140px"
        sx={{ height: 300, objectFit: 'cover' }}
        src={img}
      />
      <CardContent>
        <Typography
          sx={{ fontFamily: 'inherit' }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          description
        </Typography>
        <div className="location flex items-center gap-2 mt-3 ml-[-5px]">
          <LocationOnOutlined sx={{ color: '#2499E3' }} />
          <span>Beit Meri, Lebanon</span>
        </div>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
