import React from 'react'
import AdminNav from './component/AdminNav'
import Container from './component/Container'
import SideNav from './component/SideNav'
import Content from './component/Content'
import AdminUserManagePage from './users/page'

function AdminPage() {
  return (
    <Container>
        <AdminUserManagePage />
    </Container>
  )
}

export default AdminPage