'use client'

import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"

const HomePage = () => {

    const trpc= useTRPC()
    const {data}= useQuery(trpc.hello.queryOptions({text:"Divyansh "}))

  return (
    <div><p>{data?.greeting}</p></div>
  )
}

export default HomePage