import React from "react";
import PlayerLeaderboardList from "../components/Player/PlayerLeaderboardList";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const PlayerDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-10">
      <button
        onClick={() => navigate("/")}
        className="flex gap-2 items-center mb-10"
      >
        <IoMdArrowRoundBack size={30} className="text-orange-500 " />
        <p className="text-orange-500 text-lg font-medium">Back</p>
      </button>
      <div className="flex  gap-16 items-start ">
        <PlayerLeaderboardList />
      </div>
    </div>
  );
};

export default PlayerDashboard;
