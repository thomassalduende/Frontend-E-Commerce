'use client'
import { useQuery } from '@apollo/client'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { GET_USER_ADMIN } from '@/api/admin/querys/GetUserAdmin'
import { Users } from '../components/Users'

export default function UsersAdmin() {
    const { data, loading } = useQuery(GET_USER_ADMIN)
    return (
        loading
            ? <AiOutlineLoading3Quarters style={{ marginLeft: '50%', marginTop: '20%' }} size='32px' />
            : data && <Users users={data.getUsersAdmin.users} />
    )
}