import { useGetOktaAppsQuery } from '@/state/Apps'
import { Transition } from '@headlessui/react'
import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/state/index'
import { setUI } from '@/state/UI'
import { XIcon } from '@heroicons/react/outline'
import Table, { EditableCell } from '../Table'
import { Column } from 'react-table'
const SyncSheet = () => {
  const { data: appsList } = useGetOktaAppsQuery()
  const isShowing = useAppSelector(({ uiState }) => uiState)
  const dispatch = useAppDispatch()
  const closeSheet = () =>
    dispatch(setUI({ uiElement: 'syncSheet', value: false }))

  const columns = useMemo(
    (): Column[] => [
      {
        Header: 'App Name',
        accessor: 'label',
        Cell: function CellRender({ row }) {
          return (
            <div className="flex items-center justify-start h-full space-x-3 text-sm">
              <div
                className="flex-shrink-0 w-16 h-full bg-center bg-no-repeat bg-contain"
                style={{
                  backgroundSize: '60%',
                  backgroundImage: 'url("' + row.original['logoUrl'] + '")',
                }}></div>
              <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                {row.original['label']}
              </span>
            </div>
          )
        },
        width: 250,
      },
      {
        Header: 'Full URL',
        accessor: 'url',
        Cell: EditableCell.bind(false, { placeholder: '<not mapped>' }),
        width: 150,
      },
      {
        Header: '',
        Cell: 'X',
        accessor: 'action',
        width: 50,
      },
    ],
    []
  )

  const data = useMemo(() => {
    console.log(appsList)
    return appsList
  }, [appsList])

  return (
    <>
      <Transition
        show={isShowing.syncSheet}
        enter="transition-opacity ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity  ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <Transition
          show={isShowing.syncSheet}
          enter="transform transition ease-in-out duration-500 sm:duration-700"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 sm:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="relative w-screen ">
          <Transition
            show={isShowing.syncSheet}
            enter="transition-opacity ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity  ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
            <button
              type="button"
              onClick={closeSheet}
              className="text-gray-300 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Close panel</span>
              <XIcon className="w-6 h-6" />
            </button>
          </Transition>

          <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
            <div className="px-4 sm:px-6">
              <h2
                className="text-lg font-medium text-gray-900"
                id="slide-over-title">
                Panel title
              </h2>
            </div>
            <div className="relative flex-1 px-4 mt-6 sm:px-6">
              <div className="absolute inset-0 px-4 sm:px-6">
                {appsList && <Table data={data} columns={columns} />}
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  )
}

export default SyncSheet
