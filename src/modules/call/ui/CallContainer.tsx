'use client'
import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';

import { useState,useEffect } from 'react';
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import CallUi from './CallUi';


interface Props{
    meetingId:string | undefined ;
    meetingName:string | undefined ;
    userId:string;
    username:string;
    userImage:string;
}

const CallContainer = ({
meetingId,
userId,
meetingName,
username,
userImage,
}:Props) => {

    const trpc = useTRPC()

    const [client,setClient] = useState<StreamVideoClient>()

    const {mutateAsync:generateToken} = useMutation(
        trpc.meetings.getToken.mutationOptions()
    )

    useEffect(()=>{
          const _client= new StreamVideoClient({
            apiKey:process.env.NEXT_PUBLIC_STREAM_KEY!,
            user:{
               id:userId,
               image:userImage,
               name:username,
               
            },
            tokenProvider: async () => {
            
              return await generateToken();
            }
          })

          setClient(_client)

          return ()=>{
            _client.disconnectUser()
            setClient(undefined)
          }

    },[username,userId,userImage,generateToken])

    const [call,setCall] = useState<Call>()

    useEffect(()=>{
        if(!client){
            return
        }
        const _call= client.call("default",meetingId!)
        _call.camera.disable()
        _call.microphone.disable()
        setCall(_call)

        return ()=>{
            if(_call.state.callingState !== CallingState.LEFT){
                _call.leave()
                _call.endCall()
            }
        }
    },[client,meetingId])

    if(!call || !client ){
         return (
       <div className="h-screen bg-radial from-sidebar to-sidebar-accent w-full flex items-center justify-center text-2xl ">
         <Loader className="text-white animate-spin " />
       </div>
     );
    }

  return (
   <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUi meetingName={meetingName } />
      </StreamCall>
    </StreamVideo>
  )
}

export default CallContainer