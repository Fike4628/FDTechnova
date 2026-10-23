import React from 'react'

/**
 * Reusable Input component
 */
function Input({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className={`px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}
          ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-50' : ''}
        `}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
