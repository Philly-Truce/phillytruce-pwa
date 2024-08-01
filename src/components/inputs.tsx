"use client"
import React, { useRef, useEffect, useState } from "react"
import Image from "next/image"

// Base type for common properties
type BaseFieldProps = {
  name: string,
  placeholder?: string,
  label: string,
  value?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  readOnly?: boolean
  width?: "1/2" | "full"
  icon?: string,
  status?: string
}

// Type for InputField, extending BaseFieldProps
type InputFieldProps = BaseFieldProps & {
  type?: string,
}

// Type for TextAreaField, extending BaseFieldProps
type TextAreaFieldProps = BaseFieldProps & {
  rows?: number,
  maxRows?: number
}

// Base component for shared layout and functionality
const BaseField: React.FC<BaseFieldProps & { children: React.ReactNode }> = ({
  name,
  label,
  width,
  icon,
  children,
  status    
}) => (
  <div
    className={`
      ${width === '1/2' ? 'flex-grow flex-basis-1' : 'w-full'}
      rounded-md bg-level-2 p-2
    `}
  >
    <label 
      className="sr-only" 
      htmlFor={name}
    >
      {label}
    </label>
    <div className="flex flex-row relative">
      {icon && (
        <div className={`flex flex-row items-center h-full w-12 ${status === 'unclaimed' ? 'opacity-50' : ''}`}> 
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
  width,
  icon,
  status
}) => (
  <BaseField name={name} label={label} width={width} icon={icon} status={status}>
    <input 
      className="bg-transparent w-full capitalize"
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
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
  width,
  icon,
  rows = 1,
  maxRows = 3,
  status
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
      const maxHeight = maxRows * lineHeight;
      
      if (scrollHeight > maxHeight) {
        setShowExpandButton(true);
        if (!isExpanded) {
          textarea.style.height = `${maxHeight}px`;
        } else {
          textarea.style.height = `${scrollHeight}px`;
        }
      } else {
        setShowExpandButton(false);
        textarea.style.height = `${scrollHeight}px`;
      }
    }
  }, [value, maxRows, isExpanded]);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleExpand = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsExpanded(!isExpanded);
  };

  return (
    <BaseField name={name} label={label} width={width} icon={icon} status={status}>
      <div className="flex flex-col w-full">
      <textarea
        ref={textareaRef}
        className={`
          bg-transparent w-full capitalize resize-none
          py-0.5 leading-normal
          ${isExpanded ? 'overflow-auto' : 'overflow-hidden'}
        `}
        style={{
          maxHeight: isExpanded ? 'none' : `${maxRows * 1.5}rem`
        }}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        rows={rows}
      />
      {showExpandButton && (
        <button 
          className="self-end mt-2"
          onClick={e => handleExpand(e)}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          <Image 
            className={`transition-transform ${isExpanded ? 'rotate-[270deg]' : 'rotate-90'}`} 
            width={24} 
            height={24} 
            src="/icons/arrow_right_24px.svg" 
            alt={isExpanded ? "collapse" : "expand"} 
          />
        </button>
      )}
      </div>
    </BaseField>
  );
};