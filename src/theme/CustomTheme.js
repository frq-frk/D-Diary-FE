import { createTheme } from '@mui/material/styles';
import {colors} from './Colors'

export const customTheme = createTheme({
    palette: {
      primary: {
        main : colors.primary,
      },
      secondary : {
        main : colors.secondary,
      },
      decoratory : {
        main : colors.decoratory,
      },
      textPrimary : {
        main : colors.textPrimary,
      },
      text : {
        main : colors.text,
      }
    },
    typography: {
      fontFamily: [
        'Kalam',
      ].join(','),
    },
  });

