import React from 'react'
import shiftProps from './interface'

function Shift({ shift }: shiftProps) {
  return (
    <div className={shift === 'upcoming' || shift ===  'next' ? ' ' : 'my-4'}>
      {
        shift === 'open' ?
          <div className='text-sm border-l-[4px] border-solid border-[#EDA12F] rounded-tl-[3px] rounded-bl-[3px] pl-4'>
            <p className='font-bold'>08:00am - 10:00am</p>
            <p className='text-grayscale-60'>Back of house</p>

            <div className='border border-solid border-grayscale-30 p-2 rounded-md flex justify-between items-center my-2'>
              <div className='flex items-center gap-4'>
                <div className='h-[20px] w-[20px] border border-solid border-grayscale-60 rounded-full flex items-center justify-center'>
                  <div className='h-[5px] w-[5px] border border-solid border-grayscale-60 rounded-full'>
                  </div>
                </div>
                <p className='text-grayscale-60'>Claim Open Shift</p>
              </div>

              <p className='text-lydia'>View</p>
            </div>
          </div>
          : shift === 'next' ?
            <div className='text-sm border-l-[4px] border-solid border-lydia rounded-tl-[3px] rounded-bl-[3px] pl-4'>
              <p className='text-grayscale-60'>Next Shift</p>
              <p className='font-bold'>08:00am - 10:00am</p>
              <p className='text-grayscale-60'>Back of house</p>
            </div>
            : shift === 'upcoming' ?
              <div className='text-sm border-l-[4px] border-solid border-lydia rounded-tl-[3px] rounded-bl-[3px] pl-4'>
                <p className='text-grayscale-60'>05 Sept, 2023</p>
                <p className='font-bold'>12:00pm - 02:00pm</p>
                <p className='text-grayscale-60'>Back of house</p>
              </div>
              :
              <div className='text-sm border-l-[4px] border-solid border-lydia rounded-tl-[3px] rounded-bl-[3px] pl-4'>
                <p className='font-bold'>12:00pm - 02:00pm</p>
                <p className='text-grayscale-60'>Back of house</p>
              </div>
      }
    </div>
  )
}

export default Shift