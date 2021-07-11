import React from 'react';
import { Switch, Route } from 'react-router-dom';

// HOC and hooks
import WithAuth from './hoc/withAuth';
import WithNoAuth from './hoc/withNoAuth';
// import WithAdminAuth from './hoc/withAdminAuth';
// import useAuthListener from './hooks/useAuthListener';

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
// import NotificationsPage from './pages/Notifications';
// import Chat from './pages/Chat';
// import Search from './pages/Search';

//layouts
import MainLayout from './layouts/MainLayout';
import Container from './layouts/ContainerLayout';

//style
import './default.scss';

function App() {
  return (
    <Switch>
      <WithAuth exact path='/'>
        <MainLayout>
          <Home />
        </MainLayout>
      </WithAuth>
      <Route path='/login'>
        <Container>
          <WithNoAuth>
            <Login />
          </WithNoAuth>
        </Container>
      </Route>
      <Route path='/signup'>
        <Container>
          <WithNoAuth>
            <Signup />
          </WithNoAuth>
        </Container>
      </Route>
      {/* <WithAuth path='/chat/:sender/:receiver'>
          <MainLayout>
            <Chat />
          </MainLayout>
        </WithAuth>  */}
      {/* <WithAuth path='/notification'>
          <MainLayout>
            <NotificationsPage />
          </MainLayout>
        </WithAuth> */}
      {/* <WithAuth path='/search'>
          <MainLayout>
            <Search />
          </MainLayout>
        </WithAuth>
        <WithAuth path='/admin'>
          <WithAdminAuth>
            <h1>Admin</h1>
          </WithAdminAuth>
        </WithAuth>
        <WithAuth path='/profile/:id'>
          <MainLayout>
            <Profile />
          </MainLayout>
        </WithAuth> */}
      <Route path='*'>
        <Container>
          <NotFound />
        </Container>
      </Route>
    </Switch>
  );
}

export default App;
