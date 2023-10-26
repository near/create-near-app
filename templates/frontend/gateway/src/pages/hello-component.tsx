import { ComponentWrapperPage } from '@/components/component/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ExampleComponentPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return <>
    <p className="text-center mt-4 p-1"> This example retrieves the <code><a href="https://near.org/near/widget/ComponentDetailsPage?src=gagdiez.near/widget/HelloNear&tab=source">Hello Near component</a></code> from the NEAR Blockchain (please wait while it loads...) </p>
    
    <ComponentWrapperPage
      src={components.helloExample}
      meta={{
        title: 'Hello NEAR',
        description: '"A Page that loads a full-page Component"',
      }} />
  </>;
};

ExampleComponentPage.getLayout = useDefaultLayout;

export default ExampleComponentPage;
