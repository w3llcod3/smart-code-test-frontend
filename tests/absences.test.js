import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
const host = process.env.NEXT_PUBLIC_HOST

import Absences from './../src/pages/absences'

test('render title', () => {
    render(<Absences />)
    const title = screen.getByText(/^Absences/)
    expect(title).toBeInTheDocument()
})

test('render type filter', () => {
    render(<Absences />)
    const element = screen.getByTestId('type-filter-select')
    expect(element).toBeInTheDocument()
})

test('render date filter', () => {
    render(<Absences />)
    const element = screen.getByTestId('date-filter-select')
    expect(element).toBeInTheDocument()
})

test('render circular loader', () => {
    render(<Absences />)
    const element = screen.getByTestId('circular-loader')
    expect(element).toBeVisible()
})

// test('render table', async () => {
//     const fetchData = axios.get(host + '/api/absences/v1', { params: { offset: 0, limit: 5 } })
    
//     const data = {
//         data: {
//             "successResult": {
//                 "total": 42,
//                 "items": [
//                     {
//                         "_id": 2521,
//                         "admitterId": null,
//                         "admitterNote": "Sorry",
//                         "confirmedAt": null,
//                         "createdAt": "2021-01-03T16:36:52.000Z",
//                         "crewId": 352,
//                         "endDate": "2021-01-05T00:00:00.000Z",
//                         "memberNote": "ganzer tag",
//                         "rejectedAt": "2021-01-03T16:39:50.000Z",
//                         "startDate": "2021-01-05T00:00:00.000Z",
//                         "type": "vacation",
//                         "userId": {
//                             "_id": 2664,
//                             "id": 2650,
//                             "image": "https://loremflickr.com/300/400",
//                             "name": "Mike"
//                         }
//                     },
//                     {
//                         "_id": 2351,
//                         "admitterId": null,
//                         "admitterNote": "",
//                         "confirmedAt": "2020-12-12T17:03:55.000Z",
//                         "createdAt": "2020-12-12T13:17:01.000Z",
//                         "crewId": 352,
//                         "endDate": "2021-01-13T00:00:00.000Z",
//                         "memberNote": "",
//                         "rejectedAt": null,
//                         "startDate": "2021-01-13T00:00:00.000Z",
//                         "type": "sickness",
//                         "userId": {
//                             "_id": 2664,
//                             "id": 2650,
//                             "image": "https://loremflickr.com/300/400",
//                             "name": "Mike"
//                         }
//                     }
//                 ]
//             }
//         }
//     };
//     jest.spyOn(axios, 'get').mockResolvedValue(data);

//     const { getByText } = render(<Absences />)

//     await waitFor((fetchData) => {
//         expect(getByText('Mike')).toBeInTheDocument();
//     });

// })