import { Link, routes } from '@redwoodjs/router'
import DashboardLayout from 'src/layouts/DashboardLayout'

const GroupsLayout = (props) => {
  return (
    <DashboardLayout>
      <div className="rw-scaffold flex-1">
        <header className="rw-header">
          <h1 className="rw-heading rw-heading-primary">
            <Link
              to={routes.groups()}
              className="rw-link"
            >
              Danh sách nhóm
            </Link>
          </h1>
          <Link
            to={routes.newGroup()}
            className="rw-button rw-button-green"
          >
            <div className="rw-button-icon">+</div> Thêm Nhóm
          </Link>
        </header>
        <main className="rw-main">{props.children}</main>
      </div>
    </DashboardLayout>
  )
}

export default GroupsLayout
