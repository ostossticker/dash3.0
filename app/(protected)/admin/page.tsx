"use client"
import RoleGate from '@/components/auth/role-gate'
import { UserRole } from '@prisma/client'
import React from 'react'

const AdminPage = () => {
  return (
    <div>
        Admin page
        <RoleGate allowedRole={UserRole.ADMIN}>
            <span>
                you are allowed to see this content!
            </span>
        </RoleGate>
    </div>
  )
}

export default AdminPage