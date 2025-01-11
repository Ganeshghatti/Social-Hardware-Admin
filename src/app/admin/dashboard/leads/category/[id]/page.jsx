import React from 'react'
import LeadsTable from '@/components/admin-dashboard/leads/LeadsTable'

const page = ({params}) => {
  return (
    <div>
      <LeadsTable isView id={params.id} />
    </div>
  )
}

export default page