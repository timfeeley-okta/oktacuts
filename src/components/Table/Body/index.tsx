import React from 'react'

type TableBodyProps = {
  data: {}[]
  children: JSX.Element[]
}

export const TableBody: React.FC<TableBodyProps> = ({ data, children }) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={'row_' + rowIndex}>
          {children.map((child, colIndex) => {
            const {
              props: { children, ...args },
            } = child
            return (
              <td key={'cell_' + rowIndex + '_' + colIndex} {...args}>
                {children({ row })}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}

// We don't actually use this function to render anything, but
// including it here for TypeScript.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TableBodyColumn = ({ children, ...rest }): JSX.Element => (
  <>{children}</>
)
