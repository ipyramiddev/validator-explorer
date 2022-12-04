import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          padding: theme.spacing(4),
          background: theme.palette.primary.main,
          borderRadius: theme.shape.borderRadius,
          height: '80px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: theme.palette.custom.fonts.fontFive,
          '& .label': {
            fontSize: '18px',
          },
          '& .content': {
            // width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          },
          '& .description': {
            display: 'none',
            [theme.breakpoints.up('md')]: {
              display: 'block',
            },
          },
        },
      });
    },
  )();

  return styles;
};
