import { useQuery } from "@tanstack/react-query";
import React from "react";
import { LiaMedalSolid } from "react-icons/lia";
import { generateDummyData } from "../../utils/api";
const LeaderboardView = ({ leaderboard }) => {
  const {
    data: dummyData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dummyData", leaderboard._id],
    queryFn: () => generateDummyData(leaderboard._id),
  });

  if (isLoading) return <div>Loading dummy data...</div>;
  if (error) return <div>Error loading dummy data</div>;

  return (
    <div className="p-4 border-4 border-orange-500 rounded-md md:min-w-[600px] flex-1">
      <h3 className="flex gap-3 items-center justify-center uppercase border-b border-orange-500 pb-4">
        <LiaMedalSolid className="text-orange-500" size={45} />
        <p className="font-bold text-xl">"{leaderboard.name}" LEADERBOARD</p>
        <LiaMedalSolid className="text-orange-500" size={45} />
      </h3>
      <table className="table-auto w-full mt-4">
        <thead className="mb-12">
          <tr>
            <th className="font-semibold text-xl text-center ">Player</th>
            {leaderboard.metrics.map((metric, index) => (
              <th className="font-semibold text-xl text-center " key={index}>
                {metric.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dummyData.map((player, index) => (
            <tr key={index}>
              <td className="text-center text-lg">{player.player}</td>
              {player.metrics.map((metric, i) => (
                <td className="text-center text-lg" key={i}>
                  {metric.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-right mt-6 text-lg italic">
        Creator: {leaderboard.createdBy}
      </p>
    </div>
  );
};

export default LeaderboardView;
