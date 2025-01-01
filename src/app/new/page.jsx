import React from 'react'
import BlockComponent from '@/components/client-side/Home/components/BlockComponent'
import System from '@/components/client-side/Home/components/new/System'
import Attachments from '@/components/client-side/Home/components/new/Attachments'
import Capabilities from '@/components/client-side/Home/components/new/Capabilities'
import Customization from '@/components/client-side/Home/components/new/Customization'
import Eclipes from '@/components/client-side/Home/components/new/Eclipes'
import '../../components/client-side/Home/Home.scss'
import Navbar from '@/components/client-side/ui/Navbar/Navbar'

const page = () => {
  return (
    <main className=''>
        <Navbar />
      <div className='mt-12'>
      <BlockComponent />
      </div>
      <Eclipes />
      <BlockComponent />
      <System />
      <BlockComponent />
      <Attachments />
      <BlockComponent />
      <Capabilities />
      <BlockComponent />
      <Customization />
      <BlockComponent />
    </main>
  )
}

export default page