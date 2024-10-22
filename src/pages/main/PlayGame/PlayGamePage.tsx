import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import LoadingScreen from "../../../components/layout/LoadingScreen";
import RoomCard from "../../../components/join-room/Room";
import JoinRoomDialog from "../../../components/join-room/JoinRoomDialog";
import WaitingRoom from "../../../components/create-room/WaitingRoom/WaitingRoom";
import UnityGameComponent, { useUnityGame } from "../../../hooks/useUnityGame";
import { RoomType } from "../../../type/type";
import CreateForm from "../../../components/create-room/CreateForm/CreateForm";
import AlertComponent from "../../../components/layout/AlertComponent";
import {
  Aptos,
  AptosConfig,
  InputViewFunctionData,
  Network,
} from "@aptos-labs/ts-sdk";
import {
  ButtonContainer,
  ContainerBox,
  CustomTextField,
  FlexBox,
  GridContainer,
  JoinRoomContainer,
} from "./PlayGame.style";
import CustomButton from "../../../components/buttons/CustomButton";
import { useAlert } from "../../../contexts/AlertProvider";

const ITEMS_PER_PAGE = 6;

const PlayGame: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roomObj, setRoomObj] = useState<RoomType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openWaitRoom, setOpenWaitRoom] = useState(false);
  const { sendMessage, show, setShow, isLoaded } = useUnityGame();
  const address = localStorage.getItem("address");
  const [loadGame, setLoadGame] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const { setAlert } = useAlert();




  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on search
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const openGame = () => {
    if (isLoaded === false) {
   
      return;
    }
    const obj = {
      roomId: roomObj?.room_id,
      roomName: roomObj?.room_name,
      userId: address,
      userName: "123456",
    };
    sendMessage("RoomPlayer", "JoinOrCreateRoom", JSON.stringify(obj));
    setShow(true);
    setOpenWaitRoom(false);
  };


  return (
    <>
      <JoinRoomContainer>
        {loadGame && (
          <Modal
            open={true}
            style={{ display: show ? "block" : "none" }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <>
              <UnityGameComponent />
            </>
          </Modal>
        )}

        {openWaitRoom && (
          <WaitingRoom
            openGame={openGame}
            room={roomObj}
            open={openWaitRoom}
            closeRoom={() => {
              setShow(false);

              setOpenWaitRoom(false);
            }}
            isCreator={isCreator}
          />
        )}
      </JoinRoomContainer>
      
  
    </>
  );
};
export default PlayGame;
