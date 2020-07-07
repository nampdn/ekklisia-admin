import { Link, routes } from '@redwoodjs/router'
import DashboardLayout from 'src/layouts/DashboardLayout'

const SchedulesLayout = (props) => {
  return (
    <DashboardLayout>
      <div className="rw-scaffold flex-1">
        <header className="rw-header">
          <h1 className="rw-heading rw-heading-primary">
            <Link
              to={routes.schedules()}
              className="rw-link"
            >
              Lịch Sinh Hoạt
            </Link>
          </h1>
          <Link
            to={routes.newSchedule()}
            className="rw-button rw-button-green"
          >
            <div className="rw-button-icon">+</div> Thêm hoạt động
          </Link>
        </header>
        <main className="rw-main">{props.children}</main>
      </div>
    </DashboardLayout>
  )
}

export default SchedulesLayout
