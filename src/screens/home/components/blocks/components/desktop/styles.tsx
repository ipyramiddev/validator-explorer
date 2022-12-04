import {
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = () => {
  const styles = makeStyles(
    (theme) => {
      return ({
        root: {
          overflow: 'auto',
          '& a': {
            color: theme.palette.custom.fonts.highlight,
          },
        },
        table: {
          '& .MuiTableBody-root': {
            '& .MuiTableCell-root': {
              whiteSpace: 'nowrap',
            },
          },
          '& .proposer-box': {
            width: '220px',
          },
        },

      });
    },
  )();

  return styles;
};
