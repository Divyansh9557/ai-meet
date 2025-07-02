import { ReactNode } from "react"


const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className="bg-black h-screen" >{children}</div>
  )
}

export default layout