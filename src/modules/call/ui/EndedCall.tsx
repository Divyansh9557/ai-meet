import { Button } from "@/components/ui/button"
import Link from "next/link"




const EndedCall = () => {
  
  return (
     <div className="flex flex-col  items-center justify-center h-screen bg-gradient-to-br from-sidebar-accent to-background p-6">
      <div className="bg-white dark:bg-background rounded-xl shadow-lg p-8 max-w-[50%] w-full flex flex-col items-center space-y-6">
        
        

        {/* Text */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">Call has been ended</h2>
          <p className="text-muted-foreground text-sm">
            Summary will appear in few minutes.
          </p>
        </div>

        <Link href={'/meetings'} >
        <Button >
            return
        </Button>
         </Link> 
        
      </div>
    </div>
  )
}

export default EndedCall