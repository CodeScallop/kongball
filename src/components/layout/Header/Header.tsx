import React, { useState, useRef, useEffect } from "react";

import { Aptos, AptosConfig, InputViewFunctionData, Network } from "@aptos-labs/ts-sdk";
import { Menu, MenuItem, Modal, Box, TextField, Button, Avatar, Tooltip, Typography } from "@mui/material";
import { HeaderContainer, LeftHeader, TitleContainer, Logo, Title, RightHeader, WelcomeText, ChatModalBox, MessageList, MessageItem, MessageInfo, MessageText, MessageMeta, MessageUsername } from "./Header.style";
import ProfileModal from "../../ProfileModal/ProfileModal";
import PlayerInfoModal from "./PlayerInfoModal";
import { ClipLoader } from "react-spinners";

import { PlayerInfo } from "../../../type/type";


interface CoinStoreResource {
  data: {
    coin: {
      value: string;
    };
  };
}

interface Coin {
  coin: {
    value: string;
  };
}

const Header: React.FC = () => {
  const address = localStorage.getItem("address");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [playerInfoModalOpen, setPlayerInfoModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ message: string; sender: string; timestamp: string; username: string }>>([]);
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const [playerAddress, setPlayerAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("");
  const open = Boolean(anchorEl);

  useEffect(()=>{},[])

  const fetchPlayerInfo = async (address: string) => {

    setLoading(false);
  };

  
  const fetchBalance = async (address: string) => {
    setLoading(true);
    const aptosConfig = new AptosConfig({ network: Network.TESTNET });
    const aptos = new Aptos(aptosConfig);
    const resource =await aptos.getAccountResource<Coin>({
      accountAddress: address,
      resourceType: "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
    });
     
    // Now you have access to the response type property
    const value = resource.coin.value;
    setBalance(value)
    setLoading(false);
  };
  
  useEffect(()=>{
    const address = localStorage.getItem("address")??""
    fetchPlayerInfo(address)
  },[])

  useEffect(() => {
    if (address) {
      fetchBalance(address);
    }
  }, [address]);
  
  useEffect(() => {
    if (messageListRef.current) messageListRef.current.scrollTop = messageListRef.current.scrollHeight; 
  }, [messages]);


  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleProfileOpen = () => {
    console.log("adsdad")
    setProfileModalOpen(true);
    handleClose();
  };

  const handlePlayerInfoOpen = async (playerAddress: string) => {
    await fetchPlayerInfo(playerAddress);
    setPlayerInfoModalOpen(true);
    setPlayerAddress(playerAddress);
  };

  const handlePlayerInfoClose = () => {
    setPlayerInfoModalOpen(false);
    setPlayerInfo(null);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      setLoading(true);
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const newMessage = {
        message,
        sender: address ?? "unknown",
        timestamp,
        username: address ?? "unknown",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
 
    <HeaderContainer>
      <div className="w-40 h-40 absolute top-[15%] left-[40px]">
        <img src="/logo.png" alt="" className="object-cover"/>
      </div>
       <RightHeader>

         <Avatar
           component="div"
           src={playerInfo?playerInfo?.user_image:"https://i.pinimg.com/564x/08/13/41/08134115f47ccd166886b40f36485721.jpg"}
            onClick={handleClick}
           sx={{ cursor: "pointer" }}
         />
         <Menu
           id="basic-menu"
           anchorEl={anchorEl}
           open={open}
           onClose={handleClose}
           MenuListProps={{
             "aria-labelledby": "basic-button",
           }}
        >
          <MenuItem onClick={handleProfileOpen}>Profile</MenuItem>
           <MenuItem onClick={handleClose}>My account</MenuItem>
       </Menu>
    </RightHeader>
    <ProfileModal
        open={profileModalOpen}
        handleOpen={handleProfileOpen}
        handleClose={() => setProfileModalOpen(false)}
        
      />
    <PlayerInfoModal
        open={playerInfoModalOpen}
        handleClose={handlePlayerInfoClose}
        playerInfo={playerInfo}
        playerAddress={playerAddress}
      />
    </HeaderContainer>
  );
};

export default Header;