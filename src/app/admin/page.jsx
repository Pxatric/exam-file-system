import React from 'react'
import Container from './component/Container'
import SideNav from './component/SideNav'
import Content from './component/Content'
import AdminUserManagePage from './users/page'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function AdminPage() {
  return (
    <Container>
        <AdminUserManagePage />
    </Container>
  )
}

export default AdminPage