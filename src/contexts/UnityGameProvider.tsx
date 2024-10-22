import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  useUnityContext,
  Unity,
} from "react-unity-webgl";

// Create UnityGame context
const UnityGameContext = createContext<any>(null);

interface GameProviderProps {
  children: ReactNode;
}
interface PickWinner {
  roomId: string;
  userId: string;
}

export const UnityGameProvider: React.FC<GameProviderProps> = ({
  children,
}) => {
  const {
    sendMessage,
    isLoaded,
    unityProvider,
    addEventListener,
    removeEventListener,
    unload,
  } = useUnityContext({
    loaderUrl: "build/Build/Build.loader.js",
    dataUrl: "build/Build/Build.data",
    frameworkUrl: "build/Build/Build.framework.js",
    codeUrl: "build/Build/Build.wasm",
  });

  const [show, setShow] = useState(false);
  const handleUnload = async () => {
    await unload();
  };

  const handleUnityApplicationQuit = useCallback(() => {
    setShow(false);
    unload();
  }, []);

  const handleUnityApplicationFinish = useCallback((jsonData: any) => {
    const data: PickWinner = JSON.parse(jsonData);
    const address = localStorage.getItem("address")


  }, []);

  useEffect(() => {
    // Add the event listener
    addEventListener("ExitGame", handleUnityApplicationQuit);
    addEventListener("FinishGame", handleUnityApplicationFinish);

    // Clean up the event listener on unmount
    return () => {
      removeEventListener("ExitGame", handleUnityApplicationQuit);
      removeEventListener("FinishGame", handleUnityApplicationFinish);
    };
  }, [addEventListener, removeEventListener, handleUnityApplicationQuit, handleUnityApplicationFinish]);

  return (
    <UnityGameContext.Provider
      value={{
        sendMessage,
        isLoaded,
        unityProvider,
        show,
        setShow,
        handleUnload,
      }}
    >
      {children}
    </UnityGameContext.Provider>
  );
};

export default UnityGameContext;