import { Link, routes } from '@redwoodjs/router'

const GroupsLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.groups()}
            className="rw-link"
          >
            Groups
          </Link>
        </h1>
        <Link
          to={routes.newGroup()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Group
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default GroupsLayout
