'use client'
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import CallContainer from "./CallContainer";
import { generateAvatar } from "@/lib/generateAvatar";

interface Props{
    meetingId:string | undefined,
    meetingName:string | undefined
}

const CallPageCalls = ({meetingId,meetingName}:Props) => {

  const {data,isPending} = authClient.useSession()

  if(!data || isPending){
     return (
       <div className="h-screen bg-radial from-sidebar to-sidebar-accent w-full flex items-center justify-center text-2xl ">
         <Loader className="text-white animate-spin " />
       </div>
     );
  }

  return (
    <CallContainer
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      username={data.user.name}
      userImage={data.user.image || generateAvatar({ seed: data.user.name,varient:"initials" })}
    />
  );
}

export default CallPageCalls