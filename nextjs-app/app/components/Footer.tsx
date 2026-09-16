import { BotIcon } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <section className='py-4 px-4 md:px-0 bg-gradient-to-r from-indigo-400 to-indigo-600'>
      <div className='text-center'>
        <p className='text-md text-blue-50'>Build confidence before the next customer conversation. Practise with <span className="underline decoration-4 decoration-[#F7AB0A]">Hey Harvey</span> and get feedback you can put to work.</p>
        <p className='text-md text-white mb-6 flex items-center justify-center p-2'>
          Realistic voice practice | Feedback on empathy and clarity | Consistent coaching
          <BotIcon className='ml-2' />
        </p>
      </div>
    </section>
  )
}

export default Footer
