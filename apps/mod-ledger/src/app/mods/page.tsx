import { WorkflowProvider } from '@/frontend/contexts/WorkflowContext';
import ModsPageClient from '@/frontend/components/ModsPageClient';

export default function ModsPage() {
  return (
    <WorkflowProvider>
      <ModsPageClient />
    </WorkflowProvider>
  );
}
