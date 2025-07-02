"use client"
import { useCall,StreamTheme } from "@stream-io/video-react-sdk"
import { useState } from "react"
import CallLobby from "./CallLobby";
import { ActiveCall } from "./ActiveCall";
import EndedCall from "./EndedCall";

  interface Props{
    meetingName:string | undefined ;
  }

const CallUi = ({meetingName}:Props) => {

   const call = useCall()

   const [show, setShow] = useState<"lobby"|"call"|"ended" >("lobby");

   const handleJoin= async()=>{
    if(!call){
        return
    }
     await call.join()
     setShow("call");
   }

   const handleLeave= async()=>{
    if(!call){
        return
    }
    await call.endCall()
    setShow("ended");
   }

  return (
    <StreamTheme>
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <ActiveCall onLeave={handleLeave} meetingName={meetingName || "" } />
      )}
      {show === "ended" && <EndedCall/>}
    </StreamTheme>
  );
}

export default CallUi