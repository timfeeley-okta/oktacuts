import { Button, IconButton, Table, TrashIcon } from 'evergreen-ui'
import React, { FC } from 'react'

import {
  DataStateType,
  deleteRule,
  getRules,
  re_alpha_numeric,
  re_js_rfc3986_URI,
  updateRule,
} from '../data/rules'

const alphaSort = (
  a: chrome.declarativeNetRequest.Rule,
  b: chrome.declarativeNetRequest.Rule
) => {
  let x = a.condition.urlFilter.replaceAll('|', '')
  let y = b.condition.urlFilter.replaceAll('|', '')

  if (typeof x == 'string') {
    x = ('' + x).toLowerCase()
  }
  if (typeof y == 'string') {
    y = ('' + y).toLowerCase()
  }

  return x < y ? -1 : x > y ? 1 : 0
}

const LinkTable: FC<{
  dataState: DataStateType
}> = ({ dataState }) => {
  const [data, setData] = dataState
  const syncRules = () =>
    getRules().then((rules) => setData(rules.sort(alphaSort)))

  syncRules()

  return (
    <>
      <Table>
        <Table.Head height={48}>
          <Table.TextHeaderCell>Shortcut</Table.TextHeaderCell>
          <Table.TextHeaderCell
            rightView={
              <Button
                appearance="primary"
                height={24}
                onClick={() => {
                  updateRule({
                    id: data.length + 1,
                    shortUrl: 'url' + (data.length + 1),
                    longUrl: 'https://google.com/' + (data.length + 1),
                  }).then(syncRules)
                }}>
                Add
              </Button>
            }>
            Destination
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {data &&
            data.map((item) => (
              <Table.Row key={item.id} height={32}>
                <Table.EditableCell
                  isNumber={true}
                  width={50}
                  onChange={(v) => {
                    if (!re_alpha_numeric.test(v)) {
                      alert('Please use letters, numbers and underscores only.')
                    } else {
                      updateRule({
                        id: item.id,
                        shortUrl: v,
                        longUrl: item.action.redirect.url,
                      }).then(syncRules)
                    }
                  }}>
                  {item.condition.urlFilter.substr(
                    2,
                    item.condition.urlFilter.length - 4
                  )}
                </Table.EditableCell>

                <Table.EditableCell
                  rightView={
                    <IconButton
                      icon={TrashIcon}
                      intent="danger"
                      border="none"
                      size="small"
                      onClick={() => deleteRule(item.id).then(syncRules)}
                    />
                  }
                  onChange={(v) => {
                    if (!re_js_rfc3986_URI.test(v)) {
                      alert(
                        'Please enter a valid URL, including http[s]:// at the beginning'
                      )
                    } else {
                      updateRule({
                        id: item.id,
                        shortUrl: item.condition.urlFilter,
                        longUrl: v,
                      }).then(syncRules)
                    }
                  }}>
                  {item.action.redirect.url}
                </Table.EditableCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  )
}

export default LinkTable
