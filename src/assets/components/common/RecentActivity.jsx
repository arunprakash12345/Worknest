import React from 'react'
import CheckmarkIcon from '../../utils/icons/CheckmarkIcon'
const RecentActivity = () => {
  return (
    <div className='divide-y divide-zinc-200'>
      <div className='p-6 hover:bg-zinc-50  transition-colors'>
        <div className='flex items-start gap-4'>
            <div className='p-2 bg-zinc-100 rounded-lg'>
                <CheckmarkIcon width="12" height="12" color="text-green-500"  />
            </div>
                <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between mb-2'>
                        <h4 className='text-zinc-800 truncate'>Uyijaskdn</h4>
                        <span className='ml-2 px-2 py-1 rounded text-xs bg-amber-200 text-amber-800'>IN PROGRESS</span>
                    </div>
                    <div className='flex items-center gap-3 text-xs text-zinc-500'>
                        <span className='capitalize'>Task</span>
                        <div className='flex items-center gap-1'>
                            <div className='w-4 h-4 bg-zinc-300  rounded-full flex items-center justify-center text-[10px] text-zinc-800 '>A</div>
                            Arun Prakash G 
                        </div>
                        <span>Apr 9, 4:16 PM</span>
                    </div>
                </div>
            </div> 
       
      </div>
    </div>
  )
}

export default RecentActivity
