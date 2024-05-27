import apiClient from '@/axios'
import type { PostCoures, Coures } from './models/courses'
import type { List } from './models/courses'
import type { PaginationParamas } from '@/core/models/pagination-params'

const postCoures = (body: PostCoures) => {
  return apiClient.post<PostCoures>('TrainingCouresReservations', body)
}

const getCourses = (paginationParams: PaginationParamas) => {
  return apiClient
    .get<List<Coures[]>>('TrainingCouresReservations', { params: paginationParams })
    .then((response) => {
      return response.data
    })
}

export { postCoures, getCourses }
