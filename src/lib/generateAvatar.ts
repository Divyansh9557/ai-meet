import {createAvatar} from "@dicebear/core"
import {botttsNeutral,initials} from "@dicebear/collection"

interface Props{
    varient: "botttsNeutral" | "initials" ,
    seed:string
}

 export const generateAvatar = ({seed,varient}:Props)=>{
  let avatar;

  if(varient==="botttsNeutral"){
    avatar=createAvatar(botttsNeutral,{seed:seed})
  }
  else{
    avatar=createAvatar(initials,{seed,fontWeight:500,fontSize:42})
  }

  return avatar.toDataUri()

}