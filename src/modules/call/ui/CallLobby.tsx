'use client'
import { authClient } from "@/lib/auth-client";
import { generateAvatar } from "@/lib/generateAvatar";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton, 
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { VideoIcon } from 'lucide-react';
import Link from "next/link";

interface Props{
    onJoin:()=> void
}


const DisabledVideoPreview = ()=>{
    const {data} = authClient.useSession()
    return (
      <DefaultVideoPlaceholder
        participant={{
          name: data?.user.name || "" ,
          image: data?.user.image ?? generateAvatar({seed:data?.user.name || "" ,varient:"initials"}) ,
        } as StreamVideoParticipant
    }
      />
    );
}
const AllowBrowserPermission = ()=>{
   return (
     <p>
       please grant your brower a permission to access you camera and microphone{" "}
     </p>
   );
}

const CallLobby = ({onJoin}:Props) => {
    const {useCameraState,useMicrophoneState } = useCallStateHooks()

    const { hasBrowserPermission: hasCameraPermission } = useCameraState();
    const { hasBrowserPermission: hasMicrophonePermission } = useMicrophoneState();
    
    const hasBrowserMediaPermission = hasCameraPermission && hasMicrophonePermission

  return (
     <div className="flex flex-col  items-center justify-center h-screen bg-gradient-to-br from-sidebar-accent to-background p-6">
      <div className="bg-white dark:bg-background rounded-xl shadow-lg p-8 max-w-[50%] w-full flex flex-col items-center space-y-6">
        
        {/* Icon */}
        <div className="bg-accent p-3 rounded-full">
          <VideoIcon className="w-6  h-6 text-black" />
        </div>

        {/* Text */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">Ready to join?</h2>
          <p className="text-muted-foreground text-sm">
            Set up your call before joining to ensure everything works smoothly.
          </p>
        </div>
   
        <VideoPreview
        DisabledVideoPreview={
            hasBrowserMediaPermission? DisabledVideoPreview :AllowBrowserPermission
        }
        />

        <div className="flex gap-2" >
                <ToggleAudioPreviewButton/>
                <ToggleVideoPreviewButton/>
        </div>

        <div className="w-full flex justify-between px-15 " >
            <Link href={'/meetings'} >
              <button className="bg-rose-500 cursor-pointer px-4 py-2 rounded-2xl  text-white" >Cancel</button>
            </Link>
              <button onClick={onJoin} className="bg-green-600 cursor-pointer px-5 py-2 rounded-2xl  text-white" > Join </button>
        </div>
       
      </div>
    </div>
  )
}

export default CallLobby