import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ExampleComponentPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return <>
    <p className="text-center mt-4 p-1"> This example shows the social feed of <a href="https://near.social">NEAR Social</a></p>
    
    <div className="container p-2">
      <VmComponent
        key="compose"
        src={components.social.compose}
        props={{}}
      />

      <VmComponent
        key="reg-feed"
        src={components.social.feed}
        props={{}}
      />

    </div>
  </>;
};

ExampleComponentPage.getLayout = useDefaultLayout;

export default ExampleComponentPage;
