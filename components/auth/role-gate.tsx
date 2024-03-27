"use client"

import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import React from 'react'

type RoleGateProps ={
    children:React.ReactNode;
    allowedRole:UserRole
}

const RoleGate = ({children , allowedRole}:RoleGateProps) => {
    const role = useCurrentRole()
    if(role !== allowedRole){
        return(
            <span>You do not have permission to view this content!</span>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default RoleGate 