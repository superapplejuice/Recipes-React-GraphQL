import React from 'react'

const DropdownField = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  itemList,
  errors,
  touched
}) => (
  <div>
    <label>{label}</label>
    <select
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      {itemList.map((item, index) => (
        <option
          key={index}
          value={item}
          label={item === null ? 'Choose one' : item}
        ></option>
      ))}
    </select>
    {errors && touched && errors}
  </div>
)

export default DropdownField
