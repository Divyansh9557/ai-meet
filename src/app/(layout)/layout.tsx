import { SidebarProvider} from "@/components/ui/sidebar"
import AppNavbar from "@/modules/ui/home/AppNavbar"
import AppSidebar from "@/modules/ui/home/SideBar"



interface Props{
    children:React.ReactNode
}

const layout = ({children}:Props) => {
  return( 
  <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted" >
        <AppNavbar/>
        {children}
      </main>
    </SidebarProvider>
  )
}

export default layout