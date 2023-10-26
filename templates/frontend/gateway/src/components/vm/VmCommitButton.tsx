import { useVmStore } from '@/stores/vm';

import { Spinner } from '../lib/Spinner';

type Props = {
  className?: string;
  data: Record<string, unknown>;
  handleCommit?: () => void;
  onCommit?: () => void;
};

export function VmCommitButton(props: Props) {
  const { near, CommitButton } = useVmStore();

  if (!near || !CommitButton) {
    return <Spinner />;
  }

  return <CommitButton near={near} {...props} />;
}
