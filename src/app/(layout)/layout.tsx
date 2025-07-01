import { SidebarProvider} from "@/components/ui/sidebar"
import AppNavbar from "@/modules/Layout/AppNavbar"
import AppSidebar from "@/modules/Layout/SideBar"



interface Props{
    children:React.ReactNode
}

const layout = ({children}:Props) => {
  return( 
  <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col bg-muted pb-20 min-h-screen w-screen " >
        <AppNavbar/>
        {children}
      </main>
    </SidebarProvider>
  )
}

export default layout

