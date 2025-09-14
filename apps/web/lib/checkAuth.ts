import { auth, currentUser } from '@clerk/nextjs/server'

export default async function CheckAuth () {
    const { isAuthenticated } = await auth()

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return;
  }

}