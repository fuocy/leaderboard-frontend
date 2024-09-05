import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import {
  getLeaderboardByCreatorName,
  removeLeaderboard,
} from "../../utils/api";
const LeaderboardList = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const removeLeaderboardMutation = useMutation({
    mutationFn: (id) => removeLeaderboard(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["leaderboards", user.username]);
    },
  });

  const handleRemoveLeaderboard = (id) => {
    removeLeaderboardMutation.mutate(id);
  };

  const {
    data: leaderboards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["leaderboards", user.username],
    queryFn: () => getLeaderboardByCreatorName(user.username),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(leaderboards);

  return (
    <div className="flex-1 bg-gray-100 rounded-2xl shadow-lg px-8 py-6">
      <h2 className="text-3xl font-bold mb-7">My Leaderboards</h2>
      {leaderboards.length === 0 && <div>Empty</div>}
      {leaderboards?.map((leaderboard) => (
        <div key={leaderboard._id} className="flex gap-3 mb-5">
          <div className="flex flex-1 justify-between items-center gap-6 bg-white px-6 py-4 rounded-lg">
            <h3 className="font-medium text-xl ">{leaderboard.name}</h3>
            <ul className="flex gap-3">
              {leaderboard.metrics.map((metric) => (
                <p className="text-lg text-gray-600">
                  {metric.name} ({metric.type})
                </p>
              ))}
            </ul>
            <p></p>
          </div>
          <button onClick={handleRemoveLeaderboard.bind(this, leaderboard._id)}>
            <MdDelete
              size={30}
              className="text-red-500 hover:brightness-105 transition duration-300"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardList;
