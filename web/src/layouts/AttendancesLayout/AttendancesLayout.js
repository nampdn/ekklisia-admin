import { Link, routes } from '@redwoodjs/router'

const AttendancesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.attendances()}
            className="rw-link"
          >
            Attendances
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
  )
}

export default AttendancesLayout
