import React from 'react'
import BlogDetail from '@/components/client-side/BlogDetail/BlogDetail'

const page = async ({ params}) => {
  const id = await params.id
  return (
    <BlogDetail id={id} />
  )
}

export default page