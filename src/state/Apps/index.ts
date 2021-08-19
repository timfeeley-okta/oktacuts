export type OktaApp = {
  id?: string
  label?: string
  linkUrl?: string
  logoUrl?: string
  appName?: string
  appInstanceId?: string
  appAssignmentId?: string
  credentialsSetup?: boolean
  hidden?: boolean
  sortOrder?: number
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appsApi = createApi({
  reducerPath: 'apps',
  baseQuery: fetchBaseQuery({
    method: 'GET',

    baseUrl: 'https://okta.okta.com/api/v1/users/me/appLinks',
  }),
  tagTypes: ['App'],
  endpoints: (build) => ({
    getOktaApps: build.query<OktaApp[], void>({
      query: () => ({ url: '' }),
      providesTags: (result) => [
        ...result.map(({ id }) => ({ type: 'App', id } as const)),
        { type: 'App', id: 'LIST' },
      ],
    }),
  }),
})
export const { useGetOktaAppsQuery } = appsApi

// const getApps = createAsyncThunk('rules/getRules', async () => {
//   return new Promise<OktaApp[]>((resolve, reject) => {
//     try {
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(
//           tabs[0].id,
//           { data: 'apiquery' },
//           (response) => {
//             const payload: OktaApp[] = JSON.parse(response)
//             payload.sort((a, b) => {
//               let x = a.label
//               let y = b.label

//               if (typeof x == 'string') {
//                 x = ('' + x).toLowerCase()
//               }
//               if (typeof y == 'string') {
//                 y = ('' + y).toLowerCase()
//               }

//               return x < y ? -1 : x > y ? 1 : 0
//             })
//             resolve(payload)
//           }
//         )
//       })
//     } catch (e) {
//       reject(e)
//     }
//   })
// })

// const OktaAppsSlice = createSlice({
//   name: 'apps',
//   initialState: {
//     apps: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getApps.pending, (state) => {
//         state.status = 'loading'
//       })
//       .addCase(getApps.fulfilled, (state, action) => {
//         state.status = 'succeeded'
//         state.apps = action.payload
//       })
//   },
// })

// export default OktaAppsSlice.reducer
