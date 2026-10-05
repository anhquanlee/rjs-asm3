import { Form, NavLink, Outlet, useRouteLoaderData } from 'react-router-dom';
import MainNavigation from './Navbar';

function RootLayout() {
  const token = useRouteLoaderData('root');

  return (
    // <header>
    //   <nav>
    //     <ul>
    //       <li>
    //         <NavLink
    //           to='/'
    //           className={({ isActive }) => (isActive ? '' : undefined)}
    //           end>
    //           Home
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to='/events'
    //           className={({ isActive }) => (isActive ? '' : undefined)}>
    //           Events
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to='/newsletter'
    //           className={({ isActive }) => (isActive ? '' : undefined)}>
    //           Newsletter
    //         </NavLink>
    //       </li>
    //       {!token && (
    //         <li>
    //           <NavLink
    //             to='/auth?mode=login'
    //             className={({ isActive }) => (isActive ? '' : undefined)}>
    //             Authentication
    //           </NavLink>
    //         </li>
    //       )}
    //       {token && (
    //         <li>
    //           <Form action='/logout' method='post'>
    //             <button>Logout</button>
    //           </Form>
    //         </li>
    //       )}
    //     </ul>
    //   </nav>
    // </header>
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default MainNavigation;
