import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { addLeaderboard } from "../../utils/api";

const LeaderboardForm = () => {
  const [name, setName] = useState("");

  const [metrics, setMetrics] = useState([]);
  const [metricName, setMetricName] = useState("");
  const [metricType, setMetricType] = useState("text");
  const [editIndex, setEditIndex] = useState(null);
  const queryClient = useQueryClient();

  const handleEditMetric = (index) => {
    setEditIndex(index);
    setMetricName(metrics[index].name);
    setMetricType(metrics[index].type);
  };

  const handleDeleteMetric = (index) => {
    const updatedMetrics = metrics.filter((_, i) => i !== index);
    setMetrics(updatedMetrics);
  };
  const handleAddMetric = () => {
    if (metricName.trim().length === 0) {
      alert("Metric name can't be blank");
      return;
    }

    if (editIndex !== null) {
      const updatedMetrics = [...metrics];
      updatedMetrics[editIndex] = { name: metricName, type: metricType };
      setMetrics(updatedMetrics);
      setEditIndex(null);
    } else {
      setMetrics([...metrics, { name: metricName, type: metricType }]);
    }
    setMetricName("");
    setMetricType("text");
  };
  const user = useAuthStore((state) => state.user);

  const addLeaderboardMutation = useMutation({
    mutationFn: (newLeaderboard) => addLeaderboard(newLeaderboard),
    onSuccess: () => {
      queryClient.invalidateQueries(["leaderboards", user.username]);
    },
  });

  const handleCreateLeaderboard = async () => {
    if (name.trim().length === 0) {
      alert("Leaderboard name can't be blank");
      return;
    }

    const leaderboard = {
      name,
      metrics,
      createdBy: user.username,
    };

    addLeaderboardMutation.mutate(leaderboard);
    setName("");
    setMetrics([]);
  };

  const inputRef = useRef();
  useEffect(() => {
    if (editIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editIndex]);

  return (
    <div className="flex-1 bg-gray-100 rounded-2xl shadow-lg px-8 py-6">
      <h2 className="text-3xl font-bold mb-7">Create Leaderboard</h2>
      <div className="relative mb-8">
        <input
          className="border rounded p-3  w-full outline-none focus:border-orange-400 border-2"
          type="text"
          placeholder="Leaderboard Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3 flex flex-col md:gap-2 md:flex-row ">
        <div className="relative flex-grow">
          <input
            className="rounded p-3 w-full focus:border-orange-400 border-2 outline-none"
            type="text"
            placeholder="Metric Name"
            ref={inputRef}
            value={metricName}
            onChange={(e) => setMetricName(e.target.value)}
          />
        </div>

        <select
          className="rounded p-3 outline-none focus:border-orange-400 border-2"
          value={metricType}
          onChange={(e) => setMetricType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
        </select>
        {editIndex === null ? (
          <button
            onClick={handleAddMetric}
            className="bg-orange-500 px-4 py-3 text-white rounded shadow-sm hover:brightness-110 transition duration-300 active:translate-y-0.5"
          >
            Add Metric
          </button>
        ) : (
          <button
            onClick={handleAddMetric}
            className="bg-blue-500 px-4 text-white rounded shadow-sm hover:brightness-110 transition duration-300 active:translate-y-0.5"
          >
            Update Metric
          </button>
        )}
      </div>

      <ul className="mb-4">
        {metrics.map((metric, index) => (
          <li
            key={index}
            className="p-4 mb-2 border rounded-lg flex items-center justify-between bg-white shadow-xs"
          >
            <div className="flex-1">
              <input
                className="border-none bg-transparent text-lg font-medium"
                type="text"
                value={metric.name}
                readOnly
              />
              <span className="text-gray-600"> ({metric.type})</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditMetric(index)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMetric(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleCreateLeaderboard}
        className="p-3 text-xl bg-orange-500 hover:brightness-110 transition duration-300 text-white rounded w-full active:translate-y-0.5"
      >
        Create Leaderboard
      </button>
    </div>
  );
};

export default LeaderboardForm;
