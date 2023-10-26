import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ExampleComponentPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return <>
    <p className="text-center mt-4 p-1"> This example shows a UI library for Near components</p>
    
    <div className="container p-2">
      <VmComponent
        key="compose"
        src={components.DIG}
        props={{}}
      />

    </div>
  </>;
};

ExampleComponentPage.getLayout = useDefaultLayout;

export default ExampleComponentPage;
