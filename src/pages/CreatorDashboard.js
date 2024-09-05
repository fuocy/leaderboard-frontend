import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import LeaderboardForm from "../components/Creator/LeaderboardForm";
import LeaderboardList from "../components/Creator/LeaderboardList";
const CreatorDashboard = () => {
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
      <div className="flex gap-16 md:items-start md:flex-row flex-col">
        <LeaderboardForm />
        <LeaderboardList />
      </div>
    </div>
  );
};

export default CreatorDashboard;
