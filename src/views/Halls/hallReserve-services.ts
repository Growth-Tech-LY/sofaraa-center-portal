import apiClient from '@/axios'
import type {   PostReservationHalls  , ReservationTable} from './models/reserveModels'
import type { Hall } from '@/core/models/Mainmodels'
import type { List } from '../Couress/models/courses' 

import type { PaginationParamas } from '@/core/models/pagination-params'



  const Postreservation = (body: PostReservationHalls) => {
  return apiClient.post('HallReservations', body)
}


const getResHallTaple = (paginationParams: PaginationParamas) => {
  return apiClient
    .get<List<ReservationTable[]>>('HallReservations', { params: paginationParams })
    .then((response) => {
      return response.data
    })
}

const getResHallByID = (id: string) => {
  return apiClient.get<ReservationTable>(`HallReservations/Id?Id=${id}`).then((response) => {
    return response.data
  })
}


export {  Postreservation ,getResHallTaple , getResHallByID }



// postHall, deleteHall, putHall, getHallsByID
