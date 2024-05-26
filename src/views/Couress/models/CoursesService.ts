import apiClient from '@/axios'
import type { PostCoures, Coures } from './courses'
import type { Customer, Service } from '@/core/models/Mainmodels'
const postCoures = (body: PostCoures) => {
  return apiClient.post<PostCoures>('TrainingCouresReservations', body)
}

const getCourses = () => {
  return apiClient.get<Coures[]>('TrainingCouresReservations').then((response) => {
    return response.data
  })
}

export { postCoures, getCourses }
