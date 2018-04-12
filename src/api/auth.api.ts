import { fetchRequest } from '../utils/http.utils'
import { authApiUrl } from '../config'
import { UserInfoResponse } from './responses'

export const authApi = {
  fetchUser: () => fetchRequest<UserInfoResponse>(authApiUrl + '/userinfo')
}
