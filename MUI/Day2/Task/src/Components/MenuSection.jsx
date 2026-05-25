import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";

const MenuSection = ({ menuItems }) => {
  return (
    <Box
      sx={{
        py: 6,
        px: 2,
        bgcolor: "#fafafa",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Our Menu
      </Typography>

      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {menuItems.map((item) => (
            <Grid item="true" key={item.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: "8px",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", my: 0.5 }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "#1a1a1a" }}
                  >
                    {item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MenuSection;
