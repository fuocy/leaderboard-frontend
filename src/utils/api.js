import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const addLeaderboard = async (data) => {
  const response = await api.post("/leaderboards/create", data);
  return response.data;
};
export const getAllLeaderboards = async () => {
  try {
    const response = await api.get("/leaderboards");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching all leaderboards"
    );
  }
};
export const getLeaderboardById = async (id) => {
  try {
    const response = await api.get(`/leaderboards/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching leaderboard by ID"
    );
  }
};
export const getLeaderboardByCreatorName = async (creatorName) => {
  try {
    const response = await api.get("/leaderboards", {
      params: { createdBy: creatorName },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching leaderboards"
    );
  }
};
// export const deleteLeaderboard = (id) => api.delete(`/leaderboards/${id}`);
export const removeLeaderboard = async (id) => {
  const response = await api.delete(`/leaderboards/${id}`);
  return response.data;
};
// export const generateDummyData = (id) =>
//   api.get(`/leaderboards/${id}/dummy-data`);
export const generateDummyData = async (leaderboardId) => {
  try {
    const response = await api.get(`/leaderboards/${leaderboardId}/dummy-data`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error generating dummy data"
    );
  }
};
