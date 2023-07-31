
const key = process.env.NEXT_PUBLIC_TMDB_KEY;

const getTrendingData = async () => {
  const url = "https://api.themoviedb.org/3/movie/now_playing";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
  });
  return response.json();
};
const getPopularData = async () => {
  const url = "https://api.themoviedb.org/3/movie/popular";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
  });
  return response.json();
};
const getTopRatedData = async () => {
  const url = "https://api.themoviedb.org/3/movie/top_rated";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
  });
  return response.json();
};
const getUpcomingData = async () => {
  const url = "https://api.themoviedb.org/3/movie/upcoming";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
  });
  return response.json();
};

export { getTrendingData, getPopularData, getTopRatedData, getUpcomingData };
