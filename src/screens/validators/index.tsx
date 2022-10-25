import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';
import {
  Layout,
} from '@components';
import { useStyles } from './styles';
import { List } from './components';

const Validators = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <>
      <NextSeo
        title={t('validators:validators')}
        openGraph={{
          title: t('validators:validators'),
        }}
      />
      <Layout
        navTitle={t('validators:validators')}
        className={classes.root}
      >
        <List />
      </Layout>
    </>
  );
};

export default Validators;
