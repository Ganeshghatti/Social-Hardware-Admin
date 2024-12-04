'use client'
import React, {useState} from 'react'
import Navbar from '@/components/client-side/ui/Navbar/Navbar'
import Footer from '@/components/client-side/ui/Footer/Footer'
import '../../components/client-side/Home/Home.scss'
import Loader from '@/components/client-side/ui/Loader/Loader'

const layout = ({children}) => {
    const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 3000);
  return (
    <main >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </main>
  )
}

export default layout