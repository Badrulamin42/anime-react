import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Container,
  Stack,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimeDetail } from "../slices/animeSlice";
import { RootState, AppDispatch } from "../store";

const AnimeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedAnime: anime, loading } = useSelector(
    (state: RootState) => state.anime
  );

  useEffect(() => {
    if (id) dispatch(fetchAnimeDetail(id));
  }, [id, dispatch]);

  if (loading)
    return (
      <Container sx={{ py: 5 }}>
        <CircularProgress sx={{ display: "block", mx: "auto" }} />
      </Container>
    );

  if (!anime)
    return (
      <Container sx={{ py: 5 }}>
        <Typography align="center" color="text.secondary">
          Anime not found.
        </Typography>
      </Container>
    );

  return (
    <Container sx={{ py: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={4}>
        {/* Cover Image */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            style={{
              width: "100%",
              borderRadius: 8,
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          />
        </Grid>

        {/* Details */}
        <Grid size={{ xs: 12, sm: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {anime.title}
          </Typography>

          {anime.title_english && (
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              English: {anime.title_english}
            </Typography>
          )}
          {anime.title_japanese && (
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Japanese: {anime.title_japanese}
            </Typography>
          )}
          {anime.title_synonyms?.length && (
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Synonyms: {anime.title_synonyms.join(", ")}
            </Typography>
          )}

          {/* General Info Chips */}
          <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
            {anime.type && <Chip label={anime.type} size="small" variant="outlined" />}
            {anime.duration && <Chip label={anime.duration} size="small" variant="outlined" />}
            {anime.season && (
              <Chip label={`${anime.season} ${anime.year || ""}`} size="small" variant="outlined" />
            )}
            {anime.rating && <Chip label={anime.rating} size="small" variant="outlined" />}
          </Stack>

          {/* Stats Chips */}
          <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
            {anime.episodes && <Chip label={`${anime.episodes} Episodes`} size="small" variant="outlined" />}
            {anime.score && <Chip label={`⭐ ${anime.score.toFixed(2)}`} size="small" variant="outlined" />}
            {anime.rank && <Chip label={`Rank: ${anime.rank}`} size="small" variant="outlined" />}
            {anime.popularity && <Chip label={`Popularity: ${anime.popularity}`} size="small" variant="outlined" />}
            {anime.favorites && <Chip label={`Favorites: ${anime.favorites}`} size="small" variant="outlined" />}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Genres / Themes */}
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {anime.genres?.map((g:any) => <Chip key={g.name} label={g.name} size="small" />)}
            {anime.themes?.map((t:any) => <Chip key={t.name} label={t.name} size="small" />)}
            {anime.studios?.map((s:any) => <Chip key={s.name} label={s.name} size="small" color="secondary" />)}
            {anime.producers?.map((p:any) => <Chip key={p.name} label={p.name} size="small" color="secondary" />)}
            {anime.licensors?.map((l:any) => <Chip key={l.name} label={l.name} size="small" color="secondary" />)}
          </Stack>

          {/* Synopsis */}
          <Typography variant="body1" paragraph>
            {anime.synopsis}
          </Typography>

          {/* Background */}
          {anime.background && (
            <Typography variant="body2" color="text.secondary" paragraph>
              {anime.background}
            </Typography>
          )}

          {/* Trailer */}
          {anime.trailer?.url && (
            <Button
              variant="contained"
              color="primary"
              href={anime.trailer.url}
              target="_blank"
              sx={{ mt: 2 }}
            >
              Watch Trailer
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnimeDetail;
