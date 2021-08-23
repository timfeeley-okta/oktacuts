import * as React from 'react'

import { TableBuilder } from 'baseui/table-semantic'

type Props = {
  data: {}[]
  isLoading: boolean
  overrides?: {}
}
const CommonTable: React.FC<Props> = ({
  isLoading,
  data,
  children,
  overrides,
}) => {
  return (
    <TableBuilder
      isLoading={isLoading}
      data={data}
      overrides={{
        Table: {
          style: {
            minWidth: '',
          },
        },
        TableBodyRow: {
          style: {
            ':hover': '',
          },
        },
        TableBodyCell: {
          style: {
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '8px',
            paddingBottom: '8px',
          },
        },
        ...overrides,
      }}>
      {children}
    </TableBuilder>
  )
}

export default CommonTable
