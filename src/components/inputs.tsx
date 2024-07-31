import React from "react"

type InputFieldProps = {
  name: string,
  placeholder: string,
  label: string,
  type: string,
  value?: string,
  onChange?: any,
  readOnly?: boolean
  disabled?: boolean
  width?: number //1/2 or full
}

export const InputField = ({ name, placeholder, label, type, value, onChange, readOnly, disabled, width } 
    : InputFieldProps) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      className="grid grid-cols-6"
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      disabled={disabled}
    />
  </div>

)