import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const AnimeList: React.FC = () => {
  const navigate = useNavigate();
  const { animeList, loading } = useSelector((state: RootState) => state.anime);

  const trimSynopsis = (text: string = "") => {
    const words = text.split(" ");
    return words.length <= 75 ? text : words.slice(0, 75).join(" ") + "...";
  };

  if (loading)
    return (
      <Typography align="center" color="text.secondary" mt={4}>
        Loading...
      </Typography>
    );

  if (!animeList.length)
    return (
      <Typography align="center" color="text.secondary" mt={4}>
        No results found. Try searching for something!
      </Typography>
    );

  return (
    <Grid container spacing={3}>
      {animeList.map((anime) => (
        <Grid size={{ xs: 12, sm: 12, md: 4 }} key={anime.mal_id}>
          <Card
            sx={{
              position: "relative",
              borderRadius: 1,
              boxShadow: 3,
              overflow: "hidden",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "translateY(-5px)" },
              cursor: "pointer",
            }}
            onClick={() => navigate(`/anime/${anime.mal_id}`)}
          >
            <CardMedia
              component="img"
              height="300"
              image={anime.images.jpg.image_url}
              alt={anime.title}
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.75))",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "16px",
                opacity: 0,
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#fff", mb: 0.8, lineHeight: 1.2 }}
                >
                  {anime.title}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ display: "block", color: "rgba(255,255,255,0.7)", mb: 1, fontSize: 12 }}
                >
                  ⭐ {anime.score?.toFixed(1) || "N/A"} | {anime.episodes ?? "N/A"} Episodes
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                    maxHeight: "110px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {trimSynopsis(anime.synopsis)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="small"
                color="primary"
                endIcon={<ArrowForwardIosIcon />}
                sx={{ mt: 1, alignSelf: "flex-start", borderRadius: 10, textTransform: "none" }}
              >
                More details
              </Button>
            </motion.div>

            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom noWrap color="primary">
                {anime.title}
              </Typography>

              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" sx={{ mt: 0.5 }}>
                {anime.type && <Chip label={anime.type} size="small" sx={{ fontWeight: 500, color: "text.primary", backgroundColor: "rgba(255,255,255,0.1)" }} />}
                {anime.duration && (
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5 }}>•</Typography>
                    <Typography variant="body2" color="text.secondary">{anime.duration}</Typography>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AnimeList;
