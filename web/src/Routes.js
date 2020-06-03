// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/attendances/new" page={NewAttendancePage} name="newAttendance" />
      <Route path="/attendances/{id}/edit" page={EditAttendancePage} name="editAttendance" />
      <Route path="/attendances/{id}" page={AttendancePage} name="attendance" />
      <Route path="/attendances" page={AttendancesPage} name="attendances" />
      <Route path="/schedules/new" page={NewSchedulePage} name="newSchedule" />
      <Route path="/schedules/{id}/edit" page={EditSchedulePage} name="editSchedule" />
      <Route path="/schedules/{id}" page={SchedulePage} name="schedule" />
      <Route path="/schedules" page={SchedulesPage} name="schedules" />
      <Route path="/activities/new" page={NewActivityPage} name="newActivity" />
      <Route path="/activities/{id}/edit" page={EditActivityPage} name="editActivity" />
      <Route path="/activities/{id}" page={ActivityPage} name="activity" />
      <Route path="/activities" page={ActivitiesPage} name="activities" />
      <Route path="/groups/new" page={NewGroupPage} name="newGroup" />
      <Route path="/groups/{id}/edit" page={EditGroupPage} name="editGroup" />
      <Route path="/groups/{id}" page={GroupPage} name="group" />
      <Route path="/groups" page={GroupsPage} name="groups" />
      <Route path="/users/new" page={NewUserPage} name="newUser" />
      <Route path="/users/{id}/edit" page={EditUserPage} name="editUser" />
      <Route path="/users/{id}" page={UserPage} name="user" />
      <Route path="/users" page={UsersPage} name="users" />
      <Route path="/profiles/new" page={NewProfilePage} name="newProfile" />
      <Route path="/profiles/{id}/edit" page={EditProfilePage} name="editProfile" />
      <Route path="/profiles/{id}" page={ProfilePage} name="profile" />
      <Route path="/profiles" page={ProfilesPage} name="profiles" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
