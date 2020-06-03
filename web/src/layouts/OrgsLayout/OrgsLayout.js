import { Link, routes } from '@redwoodjs/router'

const OrgsLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.orgs()}
            className="rw-link"
          >
            Orgs
          </Link>
        </h1>
        <Link
          to={routes.newOrg()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Org
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default OrgsLayout
