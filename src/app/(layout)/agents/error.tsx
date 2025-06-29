'use client'

import ErrorState from "@/components/ErrorState"


const ErrorPage = () => {
  return (
    <ErrorState title="Error Occured" description="error happen while fetching agents" />
  )
}

export default ErrorPage