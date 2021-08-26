import { useAddRuleMutation } from '@/state/data'
import React from 'react'
import { useForm, DeepMap, FieldError } from 'react-hook-form'
import { re_alpha_numeric, re_js_rfc3986_URI } from '../../../lib/validation'

type FormData = {
  url: string
  shortCode: string
}

const AddForm = ({ onChange, closeSheet }) => {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormData>()

  const [addNewRule] = useAddRuleMutation()

  const onSubmit = async () => {
    const { shortCode, url } = getValues()

    return await addNewRule({
      rule: {
        shortCode,
        url,
      },
    })
      .unwrap()
      .then(() => {
        alert('done')
      })
      .catch(() => {
        setError('shortCode', {
          type: 'taken',
        })
      })
  }

  return (
    <form className="m-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-0.5 text-sm font-medium">Shortcut:</div>
      <input
        type="text"
        placeholder="shortCode"
        onKeyUp={() => onChange(getValues())}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...register('shortCode', {
          required: true,
          validate: {
            format: (value) => re_alpha_numeric.test(value),
          },
        })}
      />
      <div className="mt-4 text-sm font-medium mb-0.5">Destination:</div>
      <input
        type="url"
        placeholder="url"
        onKeyUp={() => onChange(getValues())}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...register('url', {
          required: true,
          validate: {
            format: (value) => re_js_rfc3986_URI.test(value),
          },
        })}
      />
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={closeSheet}>
          Cancel
        </button>
        <input
          type="submit"
          className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-oktaBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          value="Add"
        />
      </div>
      {showErrors(errors)}
    </form>
  )
}

export default AddForm

const showErrors = (errors: DeepMap<FormData, FieldError>) => {
  let out: string
  if (errors.shortCode) {
    if (errors.shortCode.type === 'format') {
      out = 'Shortcut should be alphanumeric'
    } else {
      out = 'Shortcut is already in use'
    }
  } else if (errors.url) {
    out = 'Enter a valid URL, including http'
  }

  return <>{out && <p>{out}</p>}</>
}
