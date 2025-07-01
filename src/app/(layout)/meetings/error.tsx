"use client"

import ErrorState from '@/components/ErrorState'
import React from 'react'

const ErrorPage = () => {
  return <ErrorState title="Error" description="error while fetching meeting" />;
}

export default ErrorPage