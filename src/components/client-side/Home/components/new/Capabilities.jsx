import React from 'react'
import Image from 'next/image'
import TitleComponent from '@/components/client-side/ui/TitleComponent'
import Cab1 from '../../../../../../public/client/assets/images/new/cab1.png'
import Cab2 from '../../../../../../public/client/assets/images/new/cab2.png'

const Capabilities = () => {
  return (
     <section id="capabilities" className="relative flex">
          <TitleComponent title="Capabilities" styles={"absolute h-fit"} />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 z-10 mt-40 px-20">
        <div className="flex flex-col gap-20">
          <div className="w-full border border-white grid grid-cols-3 overflow-hidden">
            <div className="p-4 border-r border-white max-w-[80px] text-center w-full">01</div>
            <div className="p-4 col-span-2">TERRAIN CLIMBING</div>
          </div>
          <div className='flex justify-center items-center'>
            <Image src={Cab1} alt="Cab1" width={1000} height={1000} className='max-w-[501px] w-full'/>
          </div>
        </div>
        <div className="flex flex-col gap-20">
        <div className="w-full border border-white grid grid-cols-3 overflow-hidden">
            <div className="p-4 border-r border-white max-w-[80px] text-center w-full">02</div>
            <div className="p-4 col-span-2">STOW DIMENSIONS</div>
          </div>
          <div className='flex justify-center items-center'>
            <Image src={Cab2} alt="Cab1" width={1000} height={1000} className='max-w-[318px] w-full'/>
          </div>
        </div>
      </div>
        </section>
  )
}

export default Capabilities