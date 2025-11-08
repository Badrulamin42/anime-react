import React, { useState, useMemo } from "react";
import { Container, Typography, Box, CircularProgress, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import AnimeList from "./components/AnimeList";
import AnimeDetail from "./pages/AnimeDetail";

interface Anime {
  mal_id: number;
  title: string;
  url: string;
  type: string;
  duration: string;
  images: { jpg: { image_url: string } };
  episodes?: number;
  score?: number;
  synopsis?: string;
  season?: string;
}

const App: React.FC = () => {


  const darkTheme = useMemo(() =>
    createTheme({
      palette: {
        mode: "dark",
        primary: { main: "#f23d89" },
        background: { default: "#0d0d0d", paper: "#181818" },
        text: { primary: "#ffffff", secondary: "#b0b0b0" },
      },
      shape: { borderRadius: 12 },
      typography: { fontFamily: `"Poppins", "Roboto", sans-serif` },
    }), []
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg" sx={{ py: 6, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Typography variant="h4" align="center" fontWeight={700} color="primary" sx={{ mb: 3 }}>
                    Anime Search App
                  </Typography>
                  <Box sx={{ mb: 4 }}>
                    <SearchBar  />
                  </Box>
               
                    <AnimeList />
               
                </>
              }
            />
            <Route path="/anime/:id" element={<AnimeDetail />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
