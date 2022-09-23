import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps {
  label?: string
  name: string
  error?: FieldError
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    const [show, setShow] = useState(true)
    return (
      <div>
        {!!label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <label className="input-group">
          <input
            {...props}
            id={props.name}
            type={
              props.name === 'password'
                ? show
                  ? props.name
                  : 'text'
                : props.name
            }
            ref={ref}
            className="input input-bordered rounded-md !important w-full text-info-content"
          />
          {props.name === 'password' ? (
            <span onClick={() => setShow(!show)}>
              {show ? (
                <EyeOffIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </span>
          ) : null}
        </label>
        {!!error && (
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current  h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error.message}</span>
          </div>
        )}
      </div>
    )
  }
)
