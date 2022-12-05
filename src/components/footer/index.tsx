import React from 'react';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { FooterAccordion } from './components';
import {
  footerLink, footerExternalLink,
} from './utils';
import { useStyles } from './styles';

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  // ============================
  // Footer
  // ============================

  return (
    <div className={classnames(className, classes.root)}>
      <div className={classnames('desktop-footer')}>
        <div className={classnames('footer')}>
          {/* ============================= */}
          {/* logo */}
          {/* ============================= */}
          <div className="footer__logo--container">
            <p className="logo-text">Cascadia</p>
          </div>
          {/* ============================= */}
          {/* links */}
          {/* ============================= */}
          <div className="footer__links">
            {footerLink.map((group) => {
              return (
                <div key={group.key} className={`${group.key} links__group`}>
                  <h3>{t(`common:${group.key}`)}</h3>
                  {group.links.map((x) => {
                    return (
                      <a
                        key={x.url}
                        href={x.url}
                        target="_blank"
                        rel="noreferrer"
                        className={x.url !== '' ? 'pointer-enable' : 'pointer-disable'}
                      >
                        {t(`common:${x.key}`)}
                      </a>
                    );
                  })}
                </div>
              );
            })}
          </div>
          {/* ============================= */}
          {/* privacy policy and terms of use */}
          {/* ============================= */}
        </div>
        <div className="footer__privacy">
          <div>
            <a target="_blank" href={footerExternalLink.privacy} rel="noopener noreferrer">Privacy Policy</a>
          </div>
          <div>
            <a target="_blank" href={footerExternalLink.terms} rel="noopener noreferrer">Terms of Use</a>
          </div>
        </div>
      </div>
      <div className={classnames('mobile-footer')}>
        <div className="mobile-logo">Cascadia</div>
        <div>
          <FooterAccordion />
        </div>
      </div>
    </div>
  );
};

export default Footer;
