"use client";

import { useState } from "react";
import { useLeaderboard, useTopThree } from "@/hooks/useLeaderboard";
import Image from "next/image";

const LeaderboardComposite = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: topThree, loading: loadingTop } = useTopThree();
  const {
    data: leaderboardData,
    meta,
    loading: loadingAll,
    error,
  } = useLeaderboard(currentPage, 10);

  const getMedalColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-br from-gray-300 to-gray-500";
      case 3:
        return "bg-gradient-to-br from-amber-600 to-amber-800";
      default:
        return "bg-gray-200";
    }
  };

  const getMedalIcon = (rank) => {
    switch (rank) {
      case 1:
        return "👑";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  if (loadingTop) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏆 Leaderboard Sirkula
          </h1>
          <p className="text-gray-600">Top kontributor dalam komunitas</p>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <div className="flex justify-center items-end gap-4 mb-8">
            {/* Rank 2 */}
            {topThree[1] && (
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-400 shadow-lg">
                    <Image
                      src={topThree[1].avatarUrl || "/default-avatar.png"}
                      alt={topThree[1].name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    🥈
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 w-40 text-center transform hover:scale-105 transition-transform">
                  <h3 className="font-bold text-gray-800 truncate mb-1">
                    {topThree[1].name}
                  </h3>
                  <p className="text-2xl font-bold text-gray-600">
                    {topThree[1].totalPoints}
                  </p>
                  <p className="text-xs text-gray-500">poin</p>
                </div>
                <div className="w-40 h-32 bg-gradient-to-br from-gray-300 to-gray-500 mt-4 rounded-t-lg shadow-lg flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">2</span>
                </div>
              </div>
            )}

            {/* Rank 1 */}
            {topThree[0] && (
              <div className="flex flex-col items-center -mt-8">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl ring-4 ring-yellow-200">
                    <Image
                      src={topThree[0].avatarUrl || "/default-avatar.png"}
                      alt={topThree[0].name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl shadow-lg animate-pulse">
                    👑
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-2xl p-6 w-48 text-center transform hover:scale-105 transition-transform">
                  <h3 className="font-bold text-gray-800 truncate mb-2">
                    {topThree[0].name}
                  </h3>
                  <p className="text-3xl font-bold text-yellow-600">
                    {topThree[0].totalPoints}
                  </p>
                  <p className="text-sm text-gray-500">poin</p>
                </div>
                <div className="w-48 h-40 bg-gradient-to-br from-yellow-400 to-yellow-600 mt-4 rounded-t-lg shadow-2xl flex items-center justify-center">
                  <span className="text-white text-5xl font-bold">1</span>
                </div>
              </div>
            )}

            {/* Rank 3 */}
            {topThree[2] && (
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-600 shadow-lg">
                    <Image
                      src={topThree[2].avatarUrl || "/default-avatar.png"}
                      alt={topThree[2].name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    🥉
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 w-40 text-center transform hover:scale-105 transition-transform">
                  <h3 className="font-bold text-gray-800 truncate mb-1">
                    {topThree[2].name}
                  </h3>
                  <p className="text-2xl font-bold text-amber-700">
                    {topThree[2].totalPoints}
                  </p>
                  <p className="text-xs text-gray-500">poin</p>
                </div>
                <div className="w-40 h-24 bg-gradient-to-br from-amber-600 to-amber-800 mt-4 rounded-t-lg shadow-lg flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">3</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* All Leaderboard */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📊 Semua Peringkat
          </h2>

          {loadingAll ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <>
              <div className="space-y-3">
                {leaderboardData.map((item) => (
                  <div
                    key={item.user.id}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:shadow-md ${
                      item.rank <= 3
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50"
                        : "bg-gray-50"
                    }`}
                  >
                    {/* Rank Badge */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${getMedalColor(
                        item.rank
                      )} shadow-md`}
                    >
                      {item.rank <= 3 ? getMedalIcon(item.rank) : item.rank}
                    </div>

                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                      <Image
                        src={item.user.avatarUrl || "/default-avatar.png"}
                        alt={item.user.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.user.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.user.role.toLowerCase()}
                      </p>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {item.totalPoints}
                      </p>
                      <p className="text-xs text-gray-500">poin</p>
                    </div>

                    {/* Actions */}
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-700">
                        {item.totalActions}
                      </p>
                      <p className="text-xs text-gray-500">aksi</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {meta && meta.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={!meta.hasPreviousPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                  >
                    ← Previous
                  </button>

                  <span className="text-gray-700 font-medium">
                    Halaman {meta.page} dari {meta.totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={!meta.hasNextPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardComposite;
