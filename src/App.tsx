import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, Outlet, createRoute, createRouter, createRootRoute } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import NewProjectForm from './pages/new-project';
import DashboardPage from './components/dashboard';
import { ProjectProvider } from './components/project-context';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => <Outlet />
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const newProjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/new-project',
  component: NewProjectForm
});

const routeTree = rootRoute.addChildren({
  dashboardRoute,
  newProjectRoute
});

const router = createRouter ({ routeTree });

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProjectProvider>
        <ReactQueryDevtools />
        <RouterProvider router={router} />
      </ProjectProvider>
    </QueryClientProvider>
  )
}

export default App