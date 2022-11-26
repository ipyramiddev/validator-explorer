import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
// import { ExpandMore } from '@material-ui/icons';
import { useRecoilValue } from 'recoil';
// import { readSelectedNetwork } from '@recoil/big_dipper_networks';
import CascadiaLogoDark from '@assets/cascadia-dark.svg';
import CascadiaLogoLight from '@assets/cascadia-light.svg';
import { HOME } from '@utils/go_to_page';
import { readTheme } from '@recoil/settings';
import { ConnectWallet } from '/src/components/nav/components/desktop/components/action_bar/components';
import { useStyles } from './styles';
import { NavbarProps } from './types';

const Navbar = (props:NavbarProps) => {
  const classes = useStyles();
  const theme = useRecoilValue(readTheme);
  // const selected = useRecoilValue(readSelectedNetwork);
  const {
    isOpen,
    // openNetwork,
    toggleNavMenus,
  } = props;

  return (
    <div className={classes.root}>
      <Link href={HOME}>
        <a className={classes.a}>
          {theme === 'light' ? (
            <CascadiaLogoLight className={classes.logo} />
          ) : (
            <CascadiaLogoDark className={classes.logo} />
          )}
        </a>
      </Link>
      <div className={classes.actions}>
        {/* =================================== */}
        {/* Network */}
        {/* =================================== */}
        {/* <div
          className={classes.network}
          onClick={openNetwork}
          role="button"
        >
          <p className="text">
            {selected}
          </p>
          <ExpandMore fontSize="small" />
        </div> */}
        <ConnectWallet />
        {/* =================================== */}
        {/* Hamburger */}
        {/* =================================== */}
        <div
          role="button"
          onClick={toggleNavMenus}
          className={classnames(classes.hamburger, {
            active: isOpen,
          })}
        >
          <div className="hamburger-content" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
