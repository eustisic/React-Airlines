import React from 'react';

const Select = ({ options, valueKey, titleKey, allTitle, value, handleSelect }) => {

  return (
    <section>
      <label>{allTitle}</label>
      <select name={allTitle} value={value} onChange={(e) => handleSelect(e.target.value)}>
        <option value="all">All</option>
        {options.map(airline => {
            return (
              <option key={airline[valueKey]} value={airline[valueKey]}>{airline[titleKey]}</option>
            )
          })
        }
      </select>
    </section>
  )
}

export default Select;