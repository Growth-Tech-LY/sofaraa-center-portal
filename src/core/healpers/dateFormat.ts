import { format } from 'date-fns'
import { ar } from 'date-fns/locale'

export const formatDate = (date: string | null): string => {
  return date ? format(new Date(date), 'dd-MM-yyyy') : ''
}

export const formatDateWithTime = (date: string | null): string => {
  return date ? format(new Date(date), 'dd-MM-yyyy | hh:mm aaaa', { locale: ar }) : ''
}

export const formatDateServer = (date: string): string => {
  return format(new Date(date), 'yyyy-MM-dd')
}