import React from 'react';
import { Helmet } from 'react-helmet';

import {
  Header,
  HugeWidget,
  PrimaryButton,
  TabsBody,
  TabsHead,
  WidgetBody,
  WidgetRow,
} from '../../ui';
import { useProfile } from '../../presenter/Users';
import { Loading } from '../Loading';
import { PROFILE_TABS } from './constants';
import { GeneralTab } from './GeneralTab';
import { PasswordTab } from './PasswordTab';

export const Profile: React.FC = () => {
  const { signOut, tab, onChange, loading, data, refetch } = useProfile();

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>User profile page</title>
      </Helmet>
      <Header title="Your Profile">
        <PrimaryButton onClick={signOut}>Sign Out</PrimaryButton>
      </Header>
      <WidgetRow>
        <HugeWidget>
          <WidgetBody>
            <TabsHead value={tab} onChange={onChange} tabsList={PROFILE_TABS} />
            <TabsBody value={tab}>
              <GeneralTab data={data} refetch={refetch} />
              <PasswordTab refetch={refetch} />
            </TabsBody>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
