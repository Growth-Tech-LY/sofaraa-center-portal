import apiClient from '@/axios'
import type { PostCoures, Couress, studentInfo } from './models/courses'
import type { List } from './models/courses'
import type { PaginationParamas } from '@/core/models/pagination-params'
import type { postStudents } from './models/courses'
import { id } from 'vuetify/locale'
const postCoures = (body: PostCoures) => {
  return apiClient.post<PostCoures>('TrainingCouresReservations', body)
}

const getCourses = (paginationParams: PaginationParamas) => {
  return apiClient
    .get<List<Couress[]>>('TrainingCouresReservations', { params: paginationParams })
    .then((response) => {
      return response.data
    })
}
const postStudent = (body: postStudents) => {
  return apiClient.post<postStudents>('TrainingCouresReservations/AddStudentAttributing', body)
}

const getStudentsByID = (id: string) => {
  return apiClient.get<{ studentInfo: studentInfo[] }>(
    `TrainingCouresReservations/Student?Id=${id}`
  )
}
const getCourseByID = (id: string) => {
  return apiClient.get<Couress>(`TrainingCouresReservations/${id}`).then((response) => {
    return response.data
  })
}

const deleteCoures = (ID: string) => {
  return apiClient.delete(`TrainingCouresReservations/${ID}`)
}
const UpdateCoures = (body: PostCoures) => {
  return apiClient.put<postStudents>(`TrainingCouresReservations`, body)
}
export {
  postCoures,
  getCourses,
  postStudent,
  getStudentsByID,
  deleteCoures,
  UpdateCoures,
  getCourseByID
}
