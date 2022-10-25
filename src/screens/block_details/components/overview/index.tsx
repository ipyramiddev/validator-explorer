import React from 'react';
import numeral from 'numeral';
import dayjs, { formatDayJs } from '@utils/dayjs';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { useProfileRecoil } from '@recoil/profiles';
import { readDate } from '@recoil/settings';
import {
  BoxDetails, AvatarName,
} from '@components';
import { OverviewType } from '../../types';

const Overview: React.FC<OverviewType & ComponentDefault> = (props, { className }) => {
  const proposer = useProfileRecoil(props.proposer);
  const { t } = useTranslation();
  const dateFormat = useRecoilValue(readDate);

  return (
    <BoxDetails
      className={className}
      title={t('blocks:overview')}
      details={[
        {
          label: t('blocks:height'),
          detail: (
            <Typography variant="body1" className="value">
              {numeral(props.height).format('0,0')}
            </Typography>
          ),
        },
        {
          label: t('blocks:hash'),
          detail: props.hash,
        },
        {
          label: t('blocks:proposer'),
          detail: (
            <AvatarName
              address={props.proposer}
              imageUrl={proposer.imageUrl}
              name={proposer.name}
            />
          ),
        },
        {
          label: t('blocks:time'),
          detail: formatDayJs(dayjs.utc(props.timestamp), dateFormat),
        },
        {
          label: t('blocks:txs'),
          detail: numeral(props.txs).format('0,0'),
        },
      ]}
    />
  );
};

export default Overview;
