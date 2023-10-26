import type { NetworkId } from '@/utils/types';

type Components = {
  helloExample: string
  UI: {
    profileImage: string,
    profileName: string,
    profilePage: string
  }
  lidoExample: string,
  social:{
    compose: string,
    feed: string
  },
  DIG: string,
  NUI: string
};

export const componentsByNetworkId: Record<NetworkId, Components | undefined> = {
  testnet: {
    helloExample: 'gagdiez.near/widget/HelloNear',
    UI: {
      profileImage: 'mob.near/widget/ProfileImage',
      profileName: 'patrick.near/widget/ProfileName',
      profilePage: 'near/widget/ProfilePage',
    },
    lidoExample: 'zavodil.near/widget/Lido',
    social:{
      compose: 'mob.near/widget/MainPage.N.Compose',
      feed: 'mob.near/widget/MainPage.N.Feed'
    },
    DIG: 'near/widget/DIG.OverviewPage',
    NUI: 'nearui.near/widget/index',
  },
  mainnet: {
    helloExample: 'gagdiez.near/widget/HelloNear',
    UI: {
      profileImage: 'mob.near/widget/ProfileImage',
      profileName: 'patrick.near/widget/ProfileName',
      profilePage: 'near/widget/ProfilePage',
    },
    lidoExample: 'zavodil.near/widget/Lido',
    social:{
      compose: 'mob.near/widget/MainPage.N.Compose',
      feed: 'mob.near/widget/MainPage.N.Feed'
    },
    DIG: 'near/widget/DIG.OverviewPage',
    NUI: 'nearui.near/widget/index',
  },
};
