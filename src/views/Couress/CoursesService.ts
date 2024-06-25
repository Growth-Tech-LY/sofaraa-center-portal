import apiClient from '@/axios'
import type {
  PostCoures,
  Couress,
  studentInfo,
  reservationDate,
  UpdaterestPrice
} from './models/courses'
import type { List } from './models/courses'
import type { PaginationCoures } from '@/core/models/pagination-params'
import type { postStudents } from './models/courses'

const postCoures = (body: PostCoures) => {
  return apiClient.post<PostCoures>('TrainingCouresReservations', body)
}

const getCourses = (paginationParams: PaginationCoures) => {
  return apiClient
    .get<List<Couress[]>>('TrainingCouresReservations', { params: paginationParams })
    .then((response) => {
      return response.data
    })
}
const postStudent = (body: postStudents) => {
  return apiClient.post<postStudents>('TrainingCouresReservations/AddStudentAttributing', body)
}

const UpdateStudentPayed = (body: UpdaterestPrice) => {
  return apiClient.put(`TrainingCouresReservations/UpdateStudentAttributing`, body)
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

const checkReservation = (body: reservationDate) => {
  return apiClient
    .post('TrainingCouresReservations/CheckTrainingCouresReservations', body)
    .then((response) => {
      return response.data
    })
}
export {
  postCoures,
  getCourses,
  postStudent,
  getStudentsByID,
  deleteCoures,
  UpdateCoures,
  getCourseByID,
  checkReservation,
  UpdateStudentPayed
}
