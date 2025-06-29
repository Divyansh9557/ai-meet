import {createAvatar} from "@dicebear/core"
import {botttsNeutral,initials} from "@dicebear/collection"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  varient: "botttsNeutral" | "initials";
}

const GeneratedAvatar = ({seed, className, varient}: GeneratedAvatarProps) => {
  let avatar;

  if(varient === "botttsNeutral"){
    avatar = createAvatar(botttsNeutral, {
      seed,
    })
  }
  else{
    avatar= createAvatar(initials, {
      seed,
    })
  }
  
  return (
    <Avatar className={cn(className)} >
        <AvatarImage src={avatar.toDataUri()} alt="Avator"  />
        <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

export default GeneratedAvatar