import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    <Card sx={{ maxWidth: 345, fontFamily: 'inherit' }}>
      <CardMedia component="img" alt="green iguana" height="140" src={img} />
      <CardContent>
        <Typography
          sx={{ fontFamily: 'inherit' }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {title || 'Lizard'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description ||
            'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
