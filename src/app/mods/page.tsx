import { WorkflowProvider } from '@/contexts/WorkflowContext';
import ModsPageClient from '@/components/ModsPageClient';

export default function ModsPage() {
  return (
    <WorkflowProvider>
      <ModsPageClient />
    </WorkflowProvider>
  );
}
