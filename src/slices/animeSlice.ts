import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface AnimeState {
  animeList: any[];
  selectedAnime: any | null;
  loading: boolean;
  searchQuery: string;
  page: number;
  hasMore: boolean;
  error: string | null; // new
}

const initialState: AnimeState = {
  animeList: [],
  selectedAnime: null,
  loading: false,
  searchQuery: "",
  page: 1,
  hasMore: true,
  error: null,
};

// Fetch anime list with query and page
export const fetchAnimeList = createAsyncThunk(
  "anime/fetchAnimeList",
  async ({ query, page }: { query: string; page: number }) => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&page=${page}`);
    const data = await res.json();

    
    return data.data;
  }
);

// Fetch detail
export const fetchAnimeDetail = createAsyncThunk('anime/fetchDetail', async (id: string) => {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const data = await res.json();
  return data.data;
});

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    resetAnimeList(state) {
      state.animeList = [];
      state.page = 1;
      state.hasMore = true;
    },
    setSelectedAnime(state, action: PayloadAction<any>) {
      state.selectedAnime = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeList.pending, (state) => {
        state.loading = true;
         state.error = null; // reset error
      })
      .addCase(fetchAnimeList.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.animeList = [...state.animeList, ...action.payload];
          state.page += 1;
        }
        state.loading = false;
      })
      .addCase(fetchAnimeList.rejected, (state, action) => {
        state.loading = false;
        state.hasMore = false;
        state.error = action.error.message || "Failed to fetch anime list"; // store error
      })
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.selectedAnime = action.payload;
        state.loading = false;
      });
  },
});

export const { setSelectedAnime, setSearchQuery, resetAnimeList } = animeSlice.actions;
export default animeSlice.reducer;
