import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllLeaderboards } from "../../utils/api";
import LeaderboardView from "./LeaderboardView";
import Modal from "./Modal";

const PlayerLeaderboardList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["leaderboards"],
    queryFn: getAllLeaderboards,
  });
  const [selectedLeaderboard, setSelectedLeaderboard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group the leaderboards by `createdBy`
  const groupedLeaderboards = data?.reduce((acc, leaderboard) => {
    const { createdBy } = leaderboard;
    if (!acc[createdBy]) {
      acc[createdBy] = [];
    }
    acc[createdBy].push(leaderboard);
    return acc;
  }, {});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading leaderboards</div>;

  const handleLeaderboardClick = (leaderboard) => {
    setSelectedLeaderboard(leaderboard);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLeaderboard(null);
  };

  return (
    <div className="flex w-full justify-center">
      <div>
        {Object.keys(groupedLeaderboards).map((creator) => (
          <div key={creator} className="mb-6">
            <h2 className="text-2xl font-bold mb-6">
              {creator}'s Leaderboards
            </h2>
            <div>
              {groupedLeaderboards[creator].map((leaderboard) => (
                <div
                  key={leaderboard._id}
                  className="p-4 border-4 border-orange-500 rounded-md mb-4 cursor-pointer"
                  onClick={() => handleLeaderboardClick(leaderboard)}
                >
                  <h3 className="font-medium text-lg">
                    "{leaderboard.name}" Leaderboard
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedLeaderboard && (
          <LeaderboardView leaderboard={selectedLeaderboard} />
        )}
      </Modal>
    </div>
  );
};

export default PlayerLeaderboardList;
