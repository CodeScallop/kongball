import React from "react";
import { Modal, Button } from "@mui/material";
import { PlayerInfoModalBox, InfoItem } from "./Header.style";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { PlayerInfo } from "../../../type/type";
import { useState, useEffect } from "react";
import { useAlert } from "../../../contexts/AlertProvider";

interface PlayerInfoModalProps {
    open: boolean;
    handleClose: () => void;
    playerInfo: PlayerInfo | null;
    playerAddress: string | null;
}

const PlayerInfoModal: React.FC<PlayerInfoModalProps> = ({ open, handleClose, playerInfo, playerAddress }) => {
    const { setAlert } = useAlert();
    
    const [likes, setLikes] = useState<number>(0);
    const [dislikes, setDislikes] = useState<number>(0);

    useEffect(() => {
        if (playerInfo) {
            setLikes(Number(playerInfo.likes_received));
            setDislikes(Number(playerInfo.dislikes_received));
        }
    }, [playerInfo]);

    if (!playerInfo) {
        return null; // Or show a loading spinner, or placeholder content
    }

    const { username, name, points, games_played, winning_games, likes_received, dislikes_received, user_image } = playerInfo;
    const winRate = (Number(games_played) > 0) ? (Number(winning_games) / Number(games_played)) * 100 : 0;

    // useEffect(() => {
    //     setLikes(Number(likes_received));
    //     setDislikes(Number(dislikes_received));
    // }, [likes_received, dislikes_received]);

    return (
        <Modal open={open} onClose={handleClose}>
            <PlayerInfoModalBox>
                <img src={user_image} alt={`${username}'s avatar`} style={{ width: '100px', borderRadius: '50%', marginBottom: '20px' }} />
                <div style={{ width: '100%', textAlign: 'left' }}>
                    <h2>{name}</h2>
                    <h4>{username}</h4>
                    <InfoItem>
                        <span>Points:</span> <span>{points}</span>
                    </InfoItem>
                    <InfoItem>
                        <span>Games Played:</span> <span>{games_played}</span>
                    </InfoItem>
                    <InfoItem>
                        <span>Winning Games:</span> <span>{winning_games}</span>
                    </InfoItem>
                    <InfoItem>
                        <span>Win Rate:</span> <span>{winRate.toFixed(2)}%</span>
                    </InfoItem>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
                        Like ({likes})

                </div>
            </PlayerInfoModalBox>
        </Modal>
    );
};

export default PlayerInfoModal;
