export type PaginationParamas = {
  page: number
  size: number
  HallId: string | undefined
  CustomerId: string
  startDate: string
  endDate: string
  phoneNumber: string
}
export type PaginationCoures = {
  page: number
  size: number
  HallID: string | undefined
  TeacherId: string
  startDate: string
  endDate: string
  CouresID: string
}

export type DatePaginationParamas = {
  HId: string
  Date: string
}
