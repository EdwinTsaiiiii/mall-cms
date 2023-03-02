import selfRequest from '@/service'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return selfRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return selfRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return selfRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return selfRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
