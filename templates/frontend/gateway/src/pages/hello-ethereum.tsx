import { ComponentWrapperPage } from '@/components/component/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ExampleComponentPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return <>
    <p className="text-center mt-4 p-1 text-dark"> This example retrieves an Ethereum component from the NEAR Blockchain (wait while it loads...) </p>
    
    <ComponentWrapperPage
      src={components.lidoExample}
      meta={{
        title: 'Hello NEAR',
        description: '"A Page that loads a full-page Component"',
      }} />
  </>;
};

ExampleComponentPage.getLayout = useDefaultLayout;

export default ExampleComponentPage;
