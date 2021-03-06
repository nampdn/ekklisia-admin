import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

const DraftProfilesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Flash timeout={1000} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.draftProfiles()} className="rw-link">
            Danh sách đăng ký TKMT
          </Link>
        </h1>
        {/* <Link
          to={routes.newDraftProfile()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New DraftProfile
        </Link> */}
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default DraftProfilesLayout
