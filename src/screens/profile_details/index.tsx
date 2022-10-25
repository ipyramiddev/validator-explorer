import React from 'react';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import {
  Layout,
  LoadAndExist,
  DesmosProfile,
} from '@components';
import { useStyles } from './styles';
import { Connections } from './components';
import { useProfileDetails } from './hooks';

const ProfileDetails = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    state,
  } = useProfileDetails();

  return (
    <>
      <NextSeo
        title={t('profiles:profileDetails')}
        openGraph={{
          title: t('profiles:profileDetails'),
        }}
      />
      <Layout navTitle={t('profiles:profileDetails')}>
        <LoadAndExist
          loading={state.loading}
          exists={state.exists}
        >
          {!!state.desmosProfile
          && (
          <span className={classes.root}>
            <DesmosProfile
              dtag={state.desmosProfile.dtag}
              nickname={state.desmosProfile.nickname}
              imageUrl={state.desmosProfile.imageUrl}
              bio={state.desmosProfile.bio}
              connections={[]}
              coverUrl={state.desmosProfile.coverUrl}
            />
            <Connections
              data={state.desmosProfile.connections}
            />
          </span>
          )}
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default ProfileDetails;
