import apiClient from '@/axios'
import type { PostCoures, Coures } from './courses'

const postCoures = (body: PostCoures) => {
  return apiClient.post<PostCoures>('TrainingCouresReservations', body)
}

const getCouresManagement = () => {
  return apiClient.get(' GetAllHSCP/GetAllGetCouresManagement').then((response) => {
    return response.data
  })
}

const getCourses = () => {
  return apiClient.get<Coures[]>('TrainingCouresReservations').then((response) => {
    return response.data
  })
}

export { postCoures, getCourses, getCouresManagement }
