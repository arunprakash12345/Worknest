import React from 'react'

const Dropdown = ({name,id,values}) => {
  return (
    <div>
       <select
  name={name}
  id={name}
  className="px-4 pr-6 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm"
>
  {values.map((currValue) => (
    <option key={currValue} value={currValue}>
      {currValue}
    </option>
  ))}
</select>
    </div>
  )
}

export default Dropdown
