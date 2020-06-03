import { Link, routes } from '@redwoodjs/router'
import DashboardLayout from 'src/layouts/DashboardLayout'

const ProfilesLayout = (props) => {
  return (
    <DashboardLayout>
        <div className="rw-scaffold flex-1">
          <header className="rw-header">
            <h1 className="rw-heading rw-heading-primary">
              <Link
                to={routes.profiles()}
                className="rw-link"
              >
                Profiles
              </Link>
            </h1>
            <Link
              to={routes.newProfile()}
              className="rw-button rw-button-green"
            >
              <div className="rw-button-icon">+</div> New Profile
            </Link>
          </header>
          <main className="rw-main">{props.children}</main>
        </div>
    </DashboardLayout>
  )
}

export default ProfilesLayout
