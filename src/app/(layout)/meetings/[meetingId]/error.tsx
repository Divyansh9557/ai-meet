'use client'

import ErrorState from '@/components/ErrorState'
import React from 'react'

const ErrorPage = () => {
  return (
    <ErrorState title='Error' description='Failed to load page' />
  )
}

export default ErrorPage