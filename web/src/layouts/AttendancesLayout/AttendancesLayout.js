import { Link, routes } from '@redwoodjs/router'
import DashboardLayout from 'src/layouts/DashboardLayout'

const AttendancesLayout = (props) => {
  return (
    <DashboardLayout>
      <div className="rw-scaffold flex-1">
        <header className="rw-header">
          <h1 className="rw-heading rw-heading-primary">
            <Link to={routes.attendances()} className="rw-link">
              Điểm Danh
            </Link>
          </h1>
          <Link
            to={routes.newAttendance()}
            className="rw-button rw-button-green"
          >
            <div className="rw-button-icon">+</div> New Attendance
          </Link>
        </header>
        <main className="rw-main">{props.children}</main>
      </div>
    </DashboardLayout>
  )
}

export default AttendancesLayout
