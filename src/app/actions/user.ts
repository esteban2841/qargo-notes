import { getCurrentUser, getUserById } from '@/utils/serverUtils';

export async function getCurrentUserAction(token?: string) {
    return await getCurrentUser(token)
  }
export async function getUserByIdAction(user: string) {
    return await getUserById(user)
  }
  