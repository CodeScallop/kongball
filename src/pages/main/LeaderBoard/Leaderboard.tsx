import React, { useState, useEffect } from "react";
import PlayerInfoModal from "../../../components/layout/Header/PlayerInfoModal.tsx";
import { PlayerInfo } from "../../../type/type.tsx";// Player Interface
import { GlobalStyle, LeaderboardContainer, TopPlayerContainer, TabContainer, Tab, PodiumContainer, PodiumPlace, Crown, Avatar, Username, Score, Pedestal, TableContainer, LeaderboardItem, PlayerInfoWrapper, SmallAvatar, PlayerScore, Rank } from "./LeaderBoard.style.tsx";

interface Player {
  rank: number;
  address: string;
  user_image: string;
  username: string;
  points: string;
}

const shortenAddress = (address: string, chars = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"top10" | "top50" | "top100">("top10");
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerInfoModalOpen, setPlayerInfoModalOpen] = useState(false);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [playerAddress, setPlayerAddress] = useState<string | null>(null);



  const handlePlayerInfoOpen = async (playerAddress: string) => {
    setLoading(false);
  };

  const topPlayers = players.slice(0, 3);
  const remainingPlayers = players.slice(3);

  return (
    <>
      {/* <GlobalStyle /> */}
      <LeaderboardContainer>
        <TopPlayerContainer>
          <TabContainer>
            <Tab $active={activeTab === "top10"} onClick={() => setActiveTab("top10")}>Top 10</Tab>
            <Tab $active={activeTab === "top50"} onClick={() => setActiveTab("top50")}>Top 50</Tab>
            <Tab $active={activeTab === "top100"} onClick={() => setActiveTab("top100")}>Top 100</Tab>
          </TabContainer>
          <PodiumContainer>
            {topPlayers.map((player, index) => (
              <PodiumPlace key={player.address} place={index + 1}>
                <Crown>{index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}</Crown>
                <Avatar
                  src={player.user_image}
                  alt={player.username}
                />  
                <Username onClick={() => handlePlayerInfoOpen(player.address)}>
                  {shortenAddress(player.address)}
                </Username>
                <Score>{player.points}</Score>
                <Pedestal place={index + 1}>{index + 1}</Pedestal>
              </PodiumPlace>
            ))}
          </PodiumContainer>
        </TopPlayerContainer>

        <TableContainer>
          {remainingPlayers.map((player) => (
            <LeaderboardItem key={player.address}>
              <Rank>{player.rank}</Rank>
              <PlayerInfoWrapper>
                <SmallAvatar
                  src={player.user_image}
                  alt={player.username}
                />
                <Username onClick={() => handlePlayerInfoOpen(player.address)}>
                  {shortenAddress(player.address)}
                </Username>
              </PlayerInfoWrapper>
              <PlayerScore>{player.points}</PlayerScore>
            </LeaderboardItem>
          ))}
        </TableContainer>
      </LeaderboardContainer>

      <PlayerInfoModal
        open={playerInfoModalOpen}
        handleClose={() => setPlayerInfoModalOpen(false)}
        playerInfo={playerInfo}
        playerAddress={playerAddress}
      />
    </>
  );
};

export default Leaderboard;