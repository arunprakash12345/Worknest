import React from 'react'

const SideWidgetCard = ({title, icon, data, tagBackground, tagTextColor}) => {
    return (
        <div className='bg-white  border border-zinc-200  hover:border-zinc-300 transition-all duration-200 rounded-lg overflow-hidden'>
            <div className='border-b border-zinc-200 p-4 pb-3'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 bg-zinc-50 rounded-lg'>
                        <img src={icon} alt="user-icon" className='w-4 h-4' />
                    </div>
                    <div className='flex items-center justify-between flex-1'>
                        <h3 className='text-sm font-medium text-gray-800'>{title}</h3>
                        <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-semibold ${tagBackground} ${tagTextColor}`}>{data.length}</span>
                    </div>
                </div>
            </div>
            <div className='p-4'>
                {
                    data.length === 0 ? <p className='text-sm text-gray-500 text-center py-4'>No Tasks available</p> : <p className='text-sm text-gray-500 text-center py-4'>Tasks available</p>
                }
            </div>
        </div>
    )
}

export default SideWidgetCard
