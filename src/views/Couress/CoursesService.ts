import apiClient from '@/axios'
import type {
  PostCoures,
  Couress,
  studentInfo,
  CouressByID,
  reservationDate,
  UpdaterestPrice
} from './models/courses'
import type { List } from './models/courses'
import type { PaginationCoures } from '@/core/models/pagination-params'
import type { postStudents } from './models/courses'
import { alertStore } from '@/core/stores/alert.store'

const postCoures = (body: PostCoures) => {
  return apiClient.post<PostCoures>('TrainingCouresReservations', body).then(() => {
    alertStore.show({
      msg: ' تمت الإضافة بنجاح',
      color: 'green'
    })
  })
}

const getCourses = (paginationParams: PaginationCoures) => {
  return apiClient
    .get<List<Couress[]>>('TrainingCouresReservations', { params: paginationParams })
    .then((response) => {
      return response.data
    })
}
const postStudent = (body: postStudents) => {
  return apiClient
    .post<postStudents>('TrainingCouresReservations/AddStudentAttributing', body)
    .then(() => {
      alertStore.show({
        color: 'teal-accent-4',
        msg: 'تمت إضافة الطلاب بنجاح'
      })
    })
}

const UpdateStudentPayed = (body: UpdaterestPrice) => {
  return apiClient.put(`TrainingCouresReservations/UpdateStudentAttributing`, body).then(() => {
    alertStore.show({
      color: 'green-lighten-1',
      msg: 'تمت عملية الدفع بنجاح '
    })
  })
}

const getStudentsByID = (id: string) => {
  return apiClient.get<{ studentInfo: studentInfo[] }>(
    `TrainingCouresReservations/Student?Id=${id}`
  )
}
const getCourseByID = (id: string) => {
  return apiClient.get<CouressByID>(`TrainingCouresReservations/${id}`).then((response) => {
    return response.data
  })
}

const deleteCoures = (ID: string) => {
  return apiClient.delete(`TrainingCouresReservations/${ID}`)
}
const UpdateCoures = (body: PostCoures) => {
  return apiClient.put<postStudents>(`TrainingCouresReservations`, body).then(() => {
    alertStore.show({
      msg: 'تم التعديل بنجاح',
      color: 'yellow'
    })
  })
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
