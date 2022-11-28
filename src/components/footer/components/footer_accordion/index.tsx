import React from 'react';
import {
  createStyles, makeStyles, withStyles,
} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import useTranslation from 'next-translate/useTranslation';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  footerLink, footerExternalLink,
} from './utils';

const useStyles = makeStyles((theme) => {
  return createStyles({
    root: {
      '& .footer__privacy': {
        paddingTop: theme.spacing(6),
      },
    },
  });
});

const Accordion = withStyles({
  root: {
    backgroundColor: '#003264',
    color: '#ffffff',

    // border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#003264',
    padding: 0,
    margin: 0,
    minHeight: 56,
    '&$expanded': {
    },
    '& p': {
      fontWeight: 500,
      margin: 0,
    },
  },
  content: {
    //   margin: '8px',
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: '#003264',
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(233, 233, 233, .8)',
    display: 'block',
    '& a': {
      color: 'rgba(233, 233, 233, .8)',
    },
    '& .detail-item': {
      padding: theme.spacing(1, 0),
    },

  },
}))(MuiAccordionDetails);

const FooterAccordion = () => {
  const classes = useStyles();

  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState<number | false>(0);

  const handleChange = (panel: number) => (
    event: React.ChangeEvent<Record<string, never>>, newExpanded: boolean,
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {footerLink.map((item, index) => {
        return (
          <Accordion square expanded={expanded === index} onChange={handleChange(index)}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
              <Typography>{item.key.toUpperCase()}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {item.links.map((x) => {
                return (
                  <div className="detail-item">
                    <a
                      key={x.url}
                      href={x.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t(`common:${x.key}`)}
                    </a>
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
      <div className="footer__privacy">
        <div>
          <a target="_blank" href={footerExternalLink.privacy} rel="noopener noreferrer">Privacy Policy</a>
        </div>
        <div>
          <a target="_blank" href={footerExternalLink.terms} rel="noopener noreferrer">Terms of Use</a>
        </div>
      </div>
    </div>
  );
};

export default FooterAccordion;
