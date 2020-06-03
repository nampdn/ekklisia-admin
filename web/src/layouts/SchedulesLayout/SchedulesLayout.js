import { Link, routes } from '@redwoodjs/router'

const SchedulesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.schedules()}
            className="rw-link"
          >
            Schedules
          </Link>
        </h1>
        <Link
          to={routes.newSchedule()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Schedule
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default SchedulesLayout
