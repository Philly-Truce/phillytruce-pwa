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
  width?: string //1/2 or full
  icon?: React.ReactNode
}

export const InputField = ({ name, placeholder, label, type, value, onChange, readOnly, disabled, width, icon } 
    : InputFieldProps) => (
    <div
    className={`${width ? `w-${width}` : 'w-full'} rounded-md bg-level-2 p-2`}
    >
    <label 
    className="sr-only" htmlFor={name}>{label}
    </label>
    <div>
        {icon && icon}
        <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            disabled={disabled}
            />
        </div>
    </div>
)