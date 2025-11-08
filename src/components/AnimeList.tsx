import React, { useCallback, useRef } from "react";
import { Grid, Skeleton, Card, CardContent, CardMedia, Typography, Box, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchAnimeList } from "../slices/animeSlice";

const AnimeList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { animeList, loading, page, hasMore, searchQuery, error } = useSelector(
    (state: RootState) => state.anime
  );

  const observer = useRef<IntersectionObserver | null>(null);

  const lastAnimeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchAnimeList({ query: searchQuery, page }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, dispatch, page, searchQuery]
  );

  const trimSynopsis = (text?: string | null) => {
    if (!text) return "No synopsis available.";
    const words = text.split(" ");
    return words.length <= 75 ? text : words.slice(0, 75).join(" ") + "...";
  };
  
  if (error) {
    return (
      <Typography align="center" color="error" mt={4}>
        {error}
      </Typography>
    );
  }

  // Show skeletons if loading or if animeList is empty on first fetch
  // if (loading || (!animeList.length && searchQuery === "")) {
  //   return (
  //     <Grid container spacing={3}>
  //       {Array.from(new Array(6)).map((_, index) => (
  //         <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
  //           <Card sx={{ borderRadius: 1, boxShadow: 3 }}>
  //             <Skeleton variant="rectangular" height={300} width="100%" />
  //             <CardContent>
  //               <Skeleton variant="text" height={30} />
  //               <Box display="flex" gap={1} mt={1}>
  //                 <Skeleton variant="rectangular" width={75} height={24} sx={{ borderRadius: 1 }} />
  //                 <Skeleton variant="rectangular" width={75} height={24} sx={{ borderRadius: 1 }} />
  //               </Box>
  //               <Skeleton variant="text" height={20} sx={{ mt: 1 }} />
  //               <Skeleton variant="text" height={20} sx={{ mt: 0.5 }} />
  //             </CardContent>
  //           </Card>
  //         </Grid>
  //       ))}
  //     </Grid>
  //   );
  // }

  // Show "No results" only when we have searched but nothing returned
  if (!animeList.length && searchQuery !== "") {
    return (
      <Typography align="center" color="text.secondary" mt={4}>
        No results found. Try searching for something!
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {animeList.map((anime, index) => {
        const isLast = index === animeList.length - 1;
        return (
          <Grid

            size={{ xs: 12, sm: 6, md: 4 }}

            key={anime.mal_id}
            ref={isLast ? lastAnimeRef : null}
          >
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
                    sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      mb: 0.8,
                      lineHeight: 1.2,
                    }}
                  >
                    {anime.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      color: "rgba(255,255,255,0.7)",
                      mb: 1,
                      fontSize: 12,
                    }}
                  >
                    ⭐ {anime.score?.toFixed(1) || "N/A"} |{" "}
                    {anime.episodes ?? "N/A"} Episodes
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
                  sx={{
                    mt: 1,
                    alignSelf: "flex-start",
                    borderRadius: 10,
                    textTransform: "none",
                  }}
                >
                  More details
                </Button>
              </motion.div>

              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  noWrap
                  color="primary"
                >
                  {anime.title}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  flexWrap="wrap"
                  sx={{ mt: 0.5 }}
                >
                  {anime.type && (
                    <Chip
                      label={anime.type}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        color: "text.primary",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }}
                    />
                  )}
                  {anime.duration && (
                    <>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mx: 0.5 }}
                      >
                        •
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {anime.duration}
                      </Typography>
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
      {loading && (
        <Grid container spacing={3}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card sx={{ borderRadius: 1, boxShadow: 3 }}>
                <Skeleton variant="rectangular" height={300} width={"100%"} />
                <CardContent>
                  <Skeleton variant="text" height={30} />
                  <Box display="flex" gap={1} mt={1}>
                    <Skeleton variant="rectangular" width={75} height={24} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" width={75} height={24} sx={{ borderRadius: 1 }} />
                  </Box>
                  <Skeleton variant="text" height={20} sx={{ mt: 1 }} />
                  <Skeleton variant="text" height={20} sx={{ mt: 0.5 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default AnimeList;
