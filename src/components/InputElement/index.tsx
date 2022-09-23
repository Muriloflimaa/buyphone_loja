import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import React from 'react'
import { cpfMask, maskCpfInput } from '../../utils/masks'
// import { FieldError } from 'react-hook-form'

interface InputProps {
  label?: string
  name: string
  error?: { message?: string | undefined }
  type: string
  mask?: string | undefined
  max?: any
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type, mask, max, ...props }, ref) => {
    const [show, setShow] = React.useState(true)

    return (
      <div className="grid gap-3">
        <div>
          {' '}
          {!!label && (
            <label className="label">
              <span className="label-text">{label}</span>
            </label>
          )}
          <label className="input-group">
            <input
              {...props}
              id={props.name}
              type={type === 'password' ? (show ? type : 'text') : type}
              ref={ref}
              className="input input-bordered rounded-md !important w-full text-info-content"
              maxLength={max}
              onKeyUp={(e) => mask === 'cpf' && maskCpfInput(e)}
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
)
