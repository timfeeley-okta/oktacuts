import { CrossIcon, IconButton, Pane, Spinner, Table } from 'evergreen-ui'
import React, { FC } from 'react'

import { AppErrorStateType } from '../data/error'
import { OktaApp } from '../data/okta'
import { DataStateType, re_alpha_numeric, updateRule } from '../data/rules'
import SyncError from './SyncError'

import type { PayloadStateType } from '../data/okta'
const OktaSyncTable: FC<{
  dataState: DataStateType
  payloadState: PayloadStateType
  errorState: AppErrorStateType
}> = ({ dataState, payloadState, errorState }) => {
  const locateLink = (
    data: chrome.declarativeNetRequest.Rule[],
    item: OktaApp
  ) => {
    const matched = data.find((key) => key.action.redirect.url === item.linkUrl)

    return matched
      ? matched.condition.urlFilter.substr(
          2,
          matched.condition.urlFilter.length - 5
        )
      : ''
  }

  const [data] = dataState
  const [payload] = payloadState
  const [getErrorState] = errorState

  return (
    <Pane width={450}>
      <>
        {getErrorState && (
          <SyncError
            details={getErrorState.details}
            error={getErrorState.error}
          />
        )}
        {!getErrorState && (
          <Table>
            <Table.Head height={48}>
              <Table.HeaderCell flexGrow={1}>App</Table.HeaderCell>
              <Table.HeaderCell
                textAlign="left"
                flexGrow={6}></Table.HeaderCell>
              <Table.HeaderCell textAlign="left" flexGrow={5}>
                Shortlink
              </Table.HeaderCell>
            </Table.Head>
            <Table.Body>
              {payload &&
                payload.map(
                  (item) =>
                    (
                      <Table.Row key={item.id} height={32}>
                        <Table.Cell flexGrow={1}>
                          <img
                            src={item.logoUrl}
                            style={{
                              maxHeight: '24px',
                              maxWidth: '40px',
                            }}></img>
                        </Table.Cell>
                        <Table.TextCell flexGrow={6}>
                          {item.label}
                        </Table.TextCell>

                        <Table.EditableCell
                          flexGrow={5}
                          placeholder="(blank)"
                          isNumber={true}
                          rightView={
                            <IconButton
                              icon={CrossIcon}
                              border="none"
                              size="small"
                            />
                          }
                          onChange={(v) => {
                            if (!re_alpha_numeric.test(v)) {
                              alert(
                                'Please use letters, numbers and underscores only.'
                              )
                            } else {
                              updateRule({
                                id: data.length + 1,
                                shortUrl: v,
                                longUrl: item.linkUrl,
                              })
                            }
                          }}>
                          {locateLink(data, item)}
                        </Table.EditableCell>
                      </Table.Row>
                    ) || <Spinner marginX="auto" marginY={120} />
                )}
            </Table.Body>
          </Table>
        )}
      </>
    </Pane>
  )
}

export default OktaSyncTable
