import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react'

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  label?: string
  error?: { message?: string | undefined }
  type?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, type, error = null, ...rest },
  ref
) => {
  const [show, setShow] = useState(true)

  return (
    <div className="grid gap-3 w-full">
      <div className="w-full">
        {!!label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <label className="input-group">
          <input
            name={name}
            ref={ref}
            {...rest}
            type={type === 'password' ? (show ? type : 'text') : type}
            className="input input-bordered rounded-md !important w-full text-info-content"
          />
          {type === 'password' ? (
            <span onClick={() => setShow(!show)}>
              {show ? (
                <EyeOffIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </span>
          ) : null}
        </label>
      </div>
      {!!error && (
        <div className="flex gap-2 items-center text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current h-4 w-4"
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
          <span className="text-sm">{error.message}</span>
        </div>
      )}
    </div>
  )
}

export const Input = forwardRef(InputBase)