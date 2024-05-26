import apiClient from '@/axios'
import type { Hall , Service , Customer , packages } from './models/reserveModels'

import type { PaginationParamas } from '@/core/models/pagination-params'

const getHalls = () => {
  return apiClient
    .get<Hall[]>('GetAllHSCP/GetAllHallsManagement')
    .then((response) => {
      return response.data
    })
}

const getCustomers = () => {
    return apiClient
      .get<Customer[]>('GetAllHSCP/GetAllCustomersManagement')
      .then((response) => {
        return response.data
      })
  }

  const getServices = () => {
    return apiClient
      .get<Service[]>('GetAllHSCP/GetAllServicesManagement')
      .then((response) => {
        return response.data
      })
  }




// const postHall = (body: PostHall) => {
//   return apiClient.post<Hall>('Hall_management', body)
// }
// const deleteHall = (id: number) => {
//   return apiClient.delete<number>(`Hall_management/delete?Id=${id}`)
// }

// const putHall = (body: PostHall) => {
//   return apiClient.put<Hall>('Hall_management/update', body)
// }

// const getHallsByID = (id: number) => {
//   return apiClient.get<Hall>(`Hall_management/Id?Id=${id}`).then((response) => {
//     return response.data
//   })
// }
export { getHalls ,getCustomers , getServices }



// postHall, deleteHall, putHall, getHallsByID
