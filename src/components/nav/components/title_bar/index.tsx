import React from 'react';
import * as R from 'ramda';
import classnames from 'classnames';
import {
  useRecoilValue,
} from 'recoil';
import { readMarket } from '@recoil/market';
import useTranslation from 'next-translate/useTranslation';
import {
  Typography, Button,
} from '@material-ui/core';
import {
  chainConfig, generalConfig,
} from '@configs';
import { readTheme } from '@recoil/settings';
import {
  useProfilesRecoil,
} from '@recoil/profiles';
import {
  readAddress,
} from '@recoil/wallet';
import { useDelegate } from '@hooks';
import { useStyles } from './styles';
import { formatMarket } from './utils';
import { useValidators } from './hooks';

const TitleBar:React.FC<{
  className?: string;
  title: string;
}> = ({
  className, title,
}) => {
  const theme = useRecoilValue(readTheme);
  const { t } = useTranslation();
  const classes = useStyles();
  const marketState = useRecoilValue(readMarket);

  const market = formatMarket(marketState);

  const logoUrl = R.pathOr(
    theme === 'light' ? chainConfig.logo.default : chainConfig.logo.dark,
    ['logo', theme], chainConfig,
  );

  const {
    state,
    sortItems,
  } = useValidators();
  const dataProfiles = useProfilesRecoil(state.items.map((x) => x.validator));
  const mergedDataWithProfiles = state.items.map((x, i) => {
    return ({
      ...x,
      validator: dataProfiles[i],
    });
  });
  const items = sortItems(mergedDataWithProfiles);
  const address = useRecoilValue(readAddress);
  const allValidators = [];
  items.map((x) => allValidators.push(x.validator.address));

  const { requestClaimAll } = useDelegate(allValidators[0], generalConfig.chain);

  const handleClick = () => {
    requestClaimAll(address, allValidators);
  };

  return (
    <div className={classnames(className, classes.root)}>
      <div className={classes.title}>
        <div>
          {
          title
            ? <Typography variant="h1">{title}</Typography>
            : <img src={logoUrl} className={classes.logo} alt="logo" />
          }
        </div>
        {title === 'Validators' && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleClick();
              }}
            >
              Claim
            </Button>
          </div>
        )}
      </div>
      <div className={classes.content}>
        {market.map((x) => (
          <div key={x.key} className={classes.item}>
            <Typography variant="body1" className="label">
              {t(`common:${x.key}`)}
              :
            </Typography>
            <Typography variant="body1" style={{ color: '#0064C8' }}>
              {x.data}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleBar;
