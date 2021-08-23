import { Input, InputOverrides, SIZE } from 'baseui/input'
import * as React from 'react'

type Props = {
  size?: typeof SIZE
  overrides?: InputOverrides
}
export const CommonInput = ({ size, overrides, ...props }) => (
  <Input
    size={size || SIZE.compact}
    overrides={{
      Input: {
        style: {
          backgroundColor: 'white',
          borderLeftWidth: '1px',
          borderRightWidth: '1px',
          borderTopWidth: '1px',
          borderBottomWidth: '1px',
        },
      },
      Root: {
        style: {
          borderLeftWidth: '1px',
          borderRightWidth: '1px',
          borderTopWidth: '1px',
          borderBottomWidth: '1px',
        },
      },
    }}
    {...props}
  />
)
