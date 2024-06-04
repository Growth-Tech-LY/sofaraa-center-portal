import apiClient from '@/axios'
import type { PostCoures, Coures, studentInfo } from './models/courses'
import type { List } from './models/courses'
import type { PaginationParamas } from '@/core/models/pagination-params'
import type { postStudents } from './models/courses'
import { id } from 'vuetify/locale'
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
const postStudent = (body: postStudents) => {
  return apiClient.post<postStudents>('TrainingCouresReservations/AddStudentAttributing', body)
}

const getCoursesById = (id: string) => {
  return apiClient.get<{ studentInfo: studentInfo[] }>(
    `TrainingCouresReservations/Student?Id=${id}`
  )
}
export { postCoures, getCourses, postStudent, getCoursesById }
