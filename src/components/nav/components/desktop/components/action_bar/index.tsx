import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { useGetComponentDimension } from '@hooks';
import CascadiaLogoLight from '@assets/cascadia-light.svg';
import { HOME } from '@utils/go_to_page';
import { useStyles } from './styles';
import {
  // Network,
  NetworkList,
  // SettingsList,
  ConnectWallet,
} from './components';
import { SearchBar } from '../../..';

const ActionBar: React.FC<{
  isNetwork: boolean;
  className?: string;
  // toggleNetwork: () => void;
}> = ({
  // toggleNetwork,
  className,
  isNetwork,
}) => {
  const {
    ref: heightRef,
    height,
  } = useGetComponentDimension();
  const classes = useStyles();
  return (
    <div className={classnames(className, classes.root)} ref={heightRef}>
      <div className={classnames(className, classes.oneRow)} ref={heightRef}>
        <Link href={HOME}>
          <a className={classes.a}>
            <CascadiaLogoLight className={classes.logo} />
          </a>
        </Link>
        <div className={classes.actions}>
          <SearchBar className={classnames(classes.searchBar, { open: isNetwork })} />
          {/* <Network
          className={classnames(classes.network, { open: isNetwork })}
          toggleNetwork={toggleNetwork}
        /> */}
          <ConnectWallet className={classnames(classes.connectWallet)} />
          {/* <SettingsList /> */}
        </div>
        <NetworkList
          actionHeight={height}
          className={classnames(classes.networkList, {
            open: isNetwork,
          })}
        />
      </div>
    </div>
  );
};

export default ActionBar;
