import apiClient from '@/axios'
import type {   PostReservationHalls } from './models/reserveModels'
import type { Hall } from '@/core/models/Mainmodels'

import type { PaginationParamas } from '@/core/models/pagination-params'



  const Postreservation = (body: PostReservationHalls) => {
  return apiClient.post('HallReservations', body)
}




export {  Postreservation }



// postHall, deleteHall, putHall, getHallsByID
