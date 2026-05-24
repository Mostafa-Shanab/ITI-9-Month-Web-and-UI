import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SpiderCard from "./SpiderCard";

const HeroSection = ({ cards }) => {
  return (
    <div>
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(./src/assets/spider.jpg)",
          // minHeight: "600px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          gap: 4,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          pt: 16,
          pb: 16,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3.5rem" },
          }}
        >
          Welcome Shanab <span style={{ fontSize: "0.8em" }}>🕸️</span>
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#00bcd4",
            color: "#fff",
            fontWeight: 700,
            px: 4,
            "&:hover": {
              backgroundColor: "#0097a7",
            },
          }}
        >
          GET STARTED
        </Button>
      </Box>
      <Box
        sx={{
          padding: "48px 32px",
          backgroundColor: "#0f0f19",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {cards.map((card) => (
            <SpiderCard
              key={card.id}
              title={card.title}
              desc={card.desc}
              image={card.image}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default HeroSection;
