import { makeStyles } from '@material-ui/core/styles';
import Color from 'color';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          fontFamily: 'Manrope',
          background: '#003264',
          padding: theme.spacing(8, 3, 0),
          color: '#FFFFFF',
          fontSize: '1rem',
          '& .fill-blue': {
            fill: '#003264',
          },
          '& .logo-text': {
            fontSize: '1.5rem',
          },
          '& .footer__closing--container': {
            '& a': {
              color: theme.palette.custom.fonts.highlight,
            },
          },
          '& .MuiDivider-root': {
            margin: theme.spacing(4, 0),
          },
          '& p': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
          },
          '& .footer__logo--container': {
            '& p': {
              marginTop: 0,
              marginBottom: theme.spacing(2),
              fontWeight: 400,
              fontFamily: 'Montserrat',
            },
          },
          '& .footer__logo': {
            width: '180px',
          },
          '& .footer__closing--text': {
            color: theme.palette.custom.fonts.fontThree,
          },
          '& .footer__links': {
            // marginTop: '1rem',
          },
          '& h3': {
            color: '#FFFFFF',
            fontWeight: 600,
            marginBottom: theme.spacing(2),
            fontFamily: 'Manrope',
            // marginTop: theme.spacing(2),
          },
          '& .links__group': {
            fontFamily: 'Manrope',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            '& a': {
              margin: '0.125rem 0',
              color: '#B0B3B8',
              textDecoration: 'none',
              paddingBottom: '1rem',
              borderBottom: `solid 1px ${theme.palette.custom.fonts.fontFour}`,
              transition: '0.2s',
              width: '100%',
              '&:hover': {
                color: '#FFFFFF',
              },
            },
            '& .pointer-disable': {
              pointerEvents: 'none',
            },
            '&.forbole': {
              '& a:last-child': {
                paddingBottom: '0',
                borderBottom: 'none',
              },
            },
            '&.media': {
              display: 'none',
            },
            [theme.breakpoints.up('md')]: {
              '& a': {
                borderBottom: 'none',
                padding: 0,
                width: 'auto',
              },
              '&.media': {
                display: 'grid',
              },
            },
          },
          '& .footer__privacy': {
            fontFamily: 'Manrope',
            display: 'flex',
            '& a': {
              color: '#B0B3B8',
              paddingRight: theme.spacing(3),
            },
            paddingBottom: theme.spacing(3),
          },
          // [theme.breakpoints.up('md')]: {
          //   '& .MuiDivider-root': {
          //     marginBottom: 0,
          //   },
          //   '& .footer__closing--container': {
          //     display: 'flex',
          //     alignItems: 'center',
          //     justifyContent: 'space-between',
          //     padding: theme.spacing(1, 0),
          //   },
          // },
          [theme.breakpoints.down('sm')]: {
            // padding: theme.spacing(8, 8, 0),
            '& .desktop-footer': {
              display: 'none',
            },
            '& .mobile-footer': {
              display: 'block',
            },
            '& .mobile-logo': {
              fontSize: '1.5rem',
              fontFamily: 'Montserrat',
              fontWeight: 400,
              paddingBottom: theme.spacing(4),
            },
          },
          [theme.breakpoints.up('md')]: {
            padding: theme.spacing(8, 5, 0),
            '& .desktop-footer': {
              display: 'block',
            },
            '& .mobile-footer': {
              display: 'none',
            },
            '& .MuiDivider-root': {
              marginTop: theme.spacing(5),
            },
            '& .footer': {
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              paddingBottom: theme.spacing(10),
            },
            '& .footer__links': {
              gridColumn: '2/6',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              marginTop: 0,
            },
            '& h3': {
              fontSize: '1rem',
              marginTop: 0,
              fontWeight: '600',
            },
            '& .footer__social': {
              justifyContent: 'flex-end',
            },
          },
          [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(8, 16, 0),
          },
        },
      });
    },
  )();

  return styles;
};
