"use client";

import { useState } from "react";
import { useLeaderboard, useTopThree } from "@/hooks/useLeaderboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Trophy,
  Medal,
  Award,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star,
  Flame,
} from "lucide-react";

// Helper function to get user initials
const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Rank indicator component
const RankIndicator = ({ rank, size = "md" }) => {
  const sizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
  };

  const styles = {
    1: "bg-amber-50 text-amber-600 border-amber-200",
    2: "bg-slate-50 text-slate-500 border-slate-200",
    3: "bg-orange-50 text-orange-600 border-orange-200",
  };

  const icons = {
    1: <Trophy className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
    2: <Medal className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
    3: <Award className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />,
  };

  const baseStyle = styles[rank] || "bg-neutral-50 text-neutral-500 border-neutral-200";

  return (
    <div
      className={`${sizes[size]} ${baseStyle} rounded-full border flex items-center justify-center font-medium`}
    >
      {icons[rank] || <span>{rank}</span>}
    </div>
  );
};

// Top 3 podium card component  
const PodiumCard = ({ user, rank, isWinner = false }) => {
  if (!user) return null;

  const cardWidth = isWinner ? "w-44" : "w-36";
  const avatarSize = isWinner ? "w-16 h-16" : "w-12 h-12";
  const podiumHeight = rank === 1 ? "h-20" : rank === 2 ? "h-14" : "h-10";
  
  const podiumStyles = {
    1: "bg-amber-50 border-amber-200 text-amber-600",
    2: "bg-slate-50 border-slate-200 text-slate-500",
    3: "bg-orange-50 border-orange-200 text-orange-600",
  };

  return (
    <div className="flex flex-col items-center">
      {/* Avatar */}
      <div className="relative mb-2">
        <Avatar className={`${avatarSize} border-2 ${rank === 1 ? "border-amber-300" : rank === 2 ? "border-slate-300" : "border-orange-300"}`}>
          <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" />
          <AvatarFallback className={`text-sm font-medium ${rank === 1 ? "bg-amber-50 text-amber-700" : rank === 2 ? "bg-slate-50 text-slate-600" : "bg-orange-50 text-orange-700"}`}>
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        {isWinner && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-100 border border-amber-300 rounded-full flex items-center justify-center">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          </div>
        )}
      </div>

      {/* User info */}
      <div className={`${cardWidth} text-center mb-2`}>
        <p className="font-medium text-neutral-800 truncate text-sm px-2">
          {user.name}
        </p>
        <p className={`font-semibold ${rank === 1 ? "text-xl text-amber-600" : "text-lg text-neutral-700"}`}>
          {user.totalPoints?.toLocaleString()}
        </p>
        <p className="text-[11px] text-neutral-400 uppercase tracking-wide">poin</p>
      </div>

      {/* Podium */}
      <div
        className={`${cardWidth} ${podiumHeight} ${podiumStyles[rank]} rounded-t-lg border border-b-0 flex items-center justify-center`}
      >
        <span className="text-lg font-bold">{rank}</span>
      </div>
    </div>
  );
};

// Leaderboard row component
const LeaderboardRow = ({ item, rank }) => {
  const isTopThree = rank <= 3;

  return (
    <div
      className={`group flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
        isTopThree
          ? "bg-emerald-50/40 hover:bg-emerald-50/60"
          : "hover:bg-neutral-50"
      }`}
    >
      {/* Rank */}
      <div className="w-9 flex justify-center">
        <RankIndicator rank={rank} size="md" />
      </div>

      {/* Avatar */}
      <Avatar className="w-9 h-9 border border-neutral-200">
        <AvatarImage src={item.user?.avatarUrl} alt={item.user?.name} className="object-cover" />
        <AvatarFallback className="bg-neutral-100 text-neutral-500 text-xs font-medium">
          {getInitials(item.user?.name)}
        </AvatarFallback>
      </Avatar>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-neutral-800 truncate text-sm leading-tight">
          {item.user?.name}
        </p>
        <p className="text-[11px] text-neutral-400 capitalize leading-tight">
          {item.user?.role?.toLowerCase()}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6">
        <div className="text-right min-w-[4rem]">
          <p className="font-semibold text-emerald-600 text-base leading-tight">
            {item.totalPoints?.toLocaleString()}
          </p>
          <p className="text-[10px] text-neutral-400 uppercase tracking-wide">poin</p>
        </div>
        <div className="text-right min-w-[3rem] hidden sm:block">
          <p className="font-medium text-neutral-600 text-sm leading-tight">
            {item.totalActions}
          </p>
          <p className="text-[10px] text-neutral-400 uppercase tracking-wide">aksi</p>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton for leaderboard
const LeaderboardSkeleton = () => (
  <div className="space-y-2">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex items-center gap-3 py-3 px-4">
        <Skeleton className="w-9 h-9 rounded-full" />
        <Skeleton className="w-9 h-9 rounded-full" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-2.5 w-16" />
        </div>
        <Skeleton className="h-5 w-14" />
      </div>
    ))}
  </div>
);

// Top 3 skeleton
const TopThreeSkeleton = () => (
  <div className="flex justify-center items-end gap-3">
    {[2, 1, 3].map((rank) => (
      <div key={rank} className="flex flex-col items-center">
        <Skeleton className={`${rank === 1 ? "w-16 h-16" : "w-12 h-12"} rounded-full mb-2`} />
        <Skeleton className={`${rank === 1 ? "w-44" : "w-36"} h-12 rounded-lg mb-2`} />
        <Skeleton className={`${rank === 1 ? "w-44 h-20" : rank === 2 ? "w-36 h-14" : "w-36 h-10"} rounded-t-lg`} />
      </div>
    ))}
  </div>
);

const LeaderboardComposite = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: topThree, loading: loadingTop } = useTopThree();
  const {
    data: leaderboardData,
    meta,
    loading: loadingAll,
    error,
  } = useLeaderboard(currentPage, 10);

  return (
    <div className="py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-3 border-emerald-200/80 text-emerald-600 bg-emerald-50/50 px-3 py-1 text-xs font-medium"
          >
            <Flame className="w-3 h-3 mr-1.5" />
            Top Kontributor
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight mb-2">
            Leaderboard
          </h1>
          <p className="text-neutral-500 text-sm max-w-md mx-auto leading-relaxed">
            Kumpulkan poin dari setiap aksi hijau dan tukarkan dengan reward menarik
          </p>
        </header>

        {/* Top 3 Podium */}
        <section className="mb-12">
          {loadingTop ? (
            <TopThreeSkeleton />
          ) : (
            <div className="flex justify-center items-end gap-2 sm:gap-4">
              {/* Rank 2 */}
              <PodiumCard user={topThree[1]} rank={2} />
              {/* Rank 1 */}
              <PodiumCard user={topThree[0]} rank={1} isWinner />
              {/* Rank 3 */}
              <PodiumCard user={topThree[2]} rank={3} />
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <Separator className="flex-1" />
          <span className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Semua Peringkat</span>
          <Separator className="flex-1" />
        </div>

        {/* All Rankings */}
        <Card className="border border-neutral-200/80 overflow-hidden">
          <CardHeader className="py-4 px-5 border-b border-neutral-100 bg-neutral-50/50">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-neutral-700">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Peringkat Lengkap
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            {loadingAll ? (
              <LeaderboardSkeleton />
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-neutral-500 text-sm mb-3">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="text-xs"
                >
                  Coba Lagi
                </Button>
              </div>
            ) : (
              <>
                <div className="divide-y divide-neutral-100/80">
                  {leaderboardData.map((item) => (
                    <LeaderboardRow
                      key={item.user?.id}
                      item={item}
                      rank={item.rank}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {meta && meta.totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4 pt-4 px-2 border-t border-neutral-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={!meta.hasPreviousPage}
                      className="text-xs gap-1 h-8"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Prev
                    </Button>

                    <span className="text-xs text-neutral-500">
                      Hal. <span className="font-medium text-neutral-700">{meta.page}</span> dari {meta.totalPages}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      disabled={!meta.hasNextPage}
                      className="text-xs gap-1 h-8"
                    >
                      Next
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardComposite;
