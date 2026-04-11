import React from 'react'
import KPICard from '../common/KPICard';


const KPI = ({data}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-9'>
      {data.map((item) => (
        <KPICard
          key={item.title}
          title={item.title}
          subText={item.subText}
          img={item.img}
          value={item.value}
          iconBg={item.iconBg}
        />
      ))}
    </div>
  )
}

export default KPI
