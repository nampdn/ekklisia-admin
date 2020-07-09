import { NavLink, routes } from '@redwoodjs/router'

const MenuLink = ({ to, children }) => (
  <NavLink
    className="bg-green-400 hover:shadow-md hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
    activeClassName="bg-yellow-400"
    to={to}
  >
    {children}
  </NavLink>
)

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col bg-gray-600 py-4 px-2 h-screen">
        <p className="px-8 text-green-500 text-3xl font-bold">Admin</p>
        <div className="grid gap-2 mt-8">
          <MenuLink to={routes.home()}>Tổng Quan</MenuLink>
          <MenuLink to={routes.profiles()}>Danh sách ban viên</MenuLink>
          <MenuLink to={routes.groups()}>Danh sách nhóm</MenuLink>
          <MenuLink to={routes.schedules()}>Lịch hoạt động</MenuLink>
          <MenuLink to={routes.activities()}>Loại hình hoạt động</MenuLink>
          <MenuLink to={routes.attendances()}>Điểm Danh</MenuLink>
        </div>
      </div>
      <div className="flex flex-1 bg-gray-200 p-8 max-h-screen overflow-y-scroll">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
