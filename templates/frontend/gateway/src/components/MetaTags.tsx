import Head from 'next/head';

type Props = {
  title: string;
  description: string;
  image?: string | null;
};

export function MetaTags(props: Props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:type" content="website" />
      <meta content={props.image || `${process.env.NEXT_PUBLIC_HOSTNAME}/bos-meta.png`} property="og:image" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@NEARProtocol" />
    </Head>
  );
}
