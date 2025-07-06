import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, Route, Router, RootRoute, Outlet } from '@tanstack/react-router';

import NewProjectForm from './components/create-new-project';
import DashboardPage from './components/dashboard';

const queryClient = new QueryClient();

const rootRoute = new RootRoute({
  component: () => <Outlet />
});

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const newProjectRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/new-project',
  component: NewProjectForm
});

const routeTree = rootRoute.addChildren({
  dashboardRoute,
  newProjectRoute
});

const router = new Router ({ routeTree });

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App