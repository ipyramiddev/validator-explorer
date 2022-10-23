import React from 'react';
import classnames from 'classnames';
import { Box } from '@material-ui/core';
import CascadiaLogoDark from '@assets/cascadia-dark.svg';
import CascadiaLogoLight from '@assets/cascadia-light.svg';
import { Networks } from '@src/components/nav/components';
import { useRecoilValue } from 'recoil';
import { readTheme } from '@recoil/settings/selectors';
import { useStyles } from './styles';

const NetworkList: React.FC<{
  className?: string;
  actionHeight?: number;
}> = ({
  className, actionHeight,
}) => {
  const classes = useStyles();
  const theme = useRecoilValue(readTheme);

  return (
    <Box
      boxShadow={3}
      className={classnames(className, classes.root)}
    >
      <div
        style={{
          height: actionHeight,
        }}
      >
        {theme === 'light' ? (
          <CascadiaLogoLight />
        ) : (
          <CascadiaLogoDark />
        )}
      </div>
      <Networks className={classes.content} />
    </Box>
  );
};

export default NetworkList;
