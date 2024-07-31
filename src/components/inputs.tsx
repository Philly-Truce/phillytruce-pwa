import React from "react"
import Image from "next/image"

// Base type for common properties
type BaseFieldProps = {
    name: string,
    placeholder?: string,
    label: string,
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    readOnly?: boolean
    disabled?: boolean
    width?: "1/2" | "full"
    icon?: string
  }
  
  // Type for InputField, extending BaseFieldProps
  type InputFieldProps = BaseFieldProps & {
    type?: string,
  }
  
  // Type for TextAreaField, extending BaseFieldProps
  type TextAreaFieldProps = BaseFieldProps & {
    rows?: number,
  }
  

// Base component for shared layout and functionality
const BaseField: React.FC<BaseFieldProps & { children: React.ReactNode }> = ({
    name,
    label,
    width,
    icon,
    children,
    disabled
  }) => (
    <div
      className={`
        ${width === '1/2' ? 'flex-grow flex-basis-[calc(50%-0.25rem)]' : 'w-full'}
        rounded-md bg-level-2 p-2
      `}
    >
      <label 
        className="sr-only" 
        htmlFor={name}
      >
        {label}
      </label>
      <div className="flex flex-row">
        {icon && (
          <div className={`flex flex-row items-center h-full w-12 ${disabled == true ? 'opacity-[0.50]' : ''}`}> 
            <Image width={24} height={24} src={icon} alt="" className="mr-2" />
          </div>
        )}
        {children}
      </div>
    </div>
  )
  
  // InputField component
  export const InputField: React.FC<InputFieldProps> = ({
    name,
    placeholder,
    label,
    type = 'text',
    value,
    onChange,
    readOnly,
    disabled,
    width,
    icon
  }) => (
    <BaseField name={name} label={label} width={width} icon={icon}>
      <input 
        className="bg-transparent w-full capitalize"
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
      />
    </BaseField>
  )
  
  // TextAreaField component
  export const TextAreaField: React.FC<TextAreaFieldProps> = ({
    name,
    placeholder,
    label,
    value,
    onChange,
    readOnly,
    disabled,
    width,
    icon,
    rows = 1
  }) => (
    <BaseField name={name} label={label} width={width} icon={icon}>
      <textarea
        className="bg-transparent w-full capitalize"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        rows={rows}
      />
    </BaseField>
  )
