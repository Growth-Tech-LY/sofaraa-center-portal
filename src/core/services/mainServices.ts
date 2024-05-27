import type { Customer, Service, Hall, Coures, Teacher } from '../models/Mainmodels'
import apiClient from '@/axios'

const getHalls = async () => {
  const response = await apiClient.get<Hall[]>('GetAllHSCP/GetAllHallsManagement')
  return response.data
}

const getCustomers = async () => {
  const response = await apiClient.get<Customer[]>('GetAllHSCP/GetAllCustomersManagement')
  return response.data
}

const getServices = async () => {
  const response = await apiClient.get<Service[]>('GetAllHSCP/GetAllServicesManagement')
  return response.data
}
const getCouresesFromMang = async () => {
  const response = await apiClient.get<Coures[]>('GetAllHSCP/GetAllGetCouresManagement')
  return response.data
}
const getTeacher = async () => {
  const response = await apiClient.get<Teacher[]>('GetAllHSCP/GetAllGetTeacherManagement')
  return response.data
}
const getStudent = async () => {
  const response = await apiClient.get<Teacher[]>('GetAllHSCP/GetAllGetStudentManagement')
  return response.data
}

export { getCouresesFromMang, getStudent, getTeacher, getServices, getCustomers, getHalls }
