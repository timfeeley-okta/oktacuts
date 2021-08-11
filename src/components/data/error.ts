import React from 'react'

export type AppError = {
  error?: 'sync' | 'apps'
  details?: any
}

export type AppErrorStateType = [
  AppError,
  React.Dispatch<React.SetStateAction<AppError>>
]
