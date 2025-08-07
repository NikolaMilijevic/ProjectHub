import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, Outlet, createRoute, createRouter, createRootRoute } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import NewProjectForm from './pages/new-project';
import DashboardPage from './pages/dashboard';
import NotFoundPage from './pages/not-found';
import ViewProject from './pages/view-project';
import {Toaster} from 'react-hot-toast'

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFoundPage />
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

export const viewProjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/view-project/$projectId",
  component: ViewProject
})

const routeTree = rootRoute.addChildren({
  dashboardRoute,
  newProjectRoute,
  viewProjectRoute
});


const router = createRouter ({ routeTree });

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={router} />
        <Toaster position='top-center' />
    </QueryClientProvider>
  )
}

export default App