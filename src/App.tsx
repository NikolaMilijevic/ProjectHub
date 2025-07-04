import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NewProjectForm from './components/create-new-project';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NewProjectForm></NewProjectForm>
    </QueryClientProvider>
  )
}

export default App