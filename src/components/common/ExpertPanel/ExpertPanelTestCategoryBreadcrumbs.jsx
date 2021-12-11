import React, { memo } from 'react'
import { Breadcrumbs, Link } from '@material-ui/core'
import { NavLink } from "react-router-dom";

const ExpertPanelTestCategoryBreadcrumbs = memo(({ breadcrumbs, children }) => {
  return (
    <Breadcrumbs aria-label='breadcrumb'>
      <Link color='inherit' component={NavLink} to='/expertPanel'>
        Expert панель
      </Link>
      {
        breadcrumbs.map(value =>
          <Link key={value.id} color='inherit' component={NavLink} to={`/expertPanel/${value.id}`}>
            {value.title}
          </Link>
        )
      }
      {children}
    </Breadcrumbs>
  )
})

export default ExpertPanelTestCategoryBreadcrumbs
