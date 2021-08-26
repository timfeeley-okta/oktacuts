import React, { FC } from 'react'

type Props = {
  data: { id: string; title: string; width: string }[]
}
const TableHead: FC<Props> = ({ data }) => {
  return (
    <thead>
      <tr>
        {data.map(header => (
          <th
            key={'th_' + header.id}
            scope="col"
            style={{
              width: header.width + 'rem',
            }}
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            {header.title}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
