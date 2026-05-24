import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const SpiderCard = ({ title, desc, image }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#272861",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 30px rgba(255,50,50,0.3)",
        },
      }}
    >
      <CardMedia
        component="div"
        sx={{
          height: 200,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <CardContent sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: "#f5f5f5", fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaa" }}>
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#e53935",
            color: "#fff",
            fontWeight: 700,
            letterSpacing: "2px",
            "&:hover": {
              backgroundColor: "#c62828",
            },
          }}
        >
          EXPLORE
        </Button>
      </CardActions>
    </Card>
  );
};

export default SpiderCard;
