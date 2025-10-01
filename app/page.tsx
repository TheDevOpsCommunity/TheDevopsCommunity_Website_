import React from 'react'
import { HeroSectionOne } from '@/components/HeroSection/HeroSection'
import WebinarPopup from '@/components/WebinarPopup/WebinarPopup'

const page = () => {
  return (
    <div className=''>
      <HeroSectionOne />
      <WebinarPopup showOnPages={["/"]} delay={2500} />
    </div>
  )
}

export default page