import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          '& .MuiDialog-paper': {
            minWidth: '400px',
          },
        },
        closeIcon: {
          position: 'absolute',
          top: theme.spacing(2),
          right: theme.spacing(2),
          padding: '0px',
        },
        listItem: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: theme.spacing(1),
          '&:last-child': {
            paddingBottom: 0,
          },
          '& .label': {
            fontWeight: 600,
          },
        },
        formItem: {
          paddingTop: '10px',
          '& .form-label': {
            fontWeight: 600,
          },
          '& .form-control': {
            padding: theme.spacing(0.5, 1),
            border: '1px solid #999999',
            width: '100%',
            '& p': {
              opacity: 0.5,
            },
          },
        },
        redelegateButton: {
          color: '#e7ac06',
        },
        claimButton: {
          color: '#098735',
        },
        buttonGroup: {
          padding: '10px',
          display: 'flex',
        },
      });
    },
  )();

  return styles;
};
