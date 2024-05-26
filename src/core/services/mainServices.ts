import type { Customer, Service, Hall, Coures } from '../models/Mainmodels'
import apiClient from '@/axios'

const getHalls = () => {
  return apiClient.get<Hall[]>('GetAllHSCP/GetAllHallsManagement').then((response) => {
    return response.data
  })
}

const getCustomers = () => {
  return apiClient.get<Customer[]>('GetAllHSCP/GetAllCustomersManagement').then((response) => {
    return response.data
  })
}

const getServices = () => {
  return apiClient.get<Service[]>('GetAllHSCP/GetAllServicesManagement').then((response) => {
    return response.data
  })
}
const getCouresesFromMang = () => {
  return apiClient.get<Coures[]>('GetAllHSCP/GetAllGetCouresManagement').then((response) => {
    return response.data
  })
}

export { getCouresesFromMang }
