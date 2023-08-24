import { createTheme, hexToRgb } from '@mui/material/styles';
import colors from './materialTheme.module.scss';

export const metaFontFamily = ['Meta', 'sans-serif', 'system-ui'].join(',');
export const metaBookFontFamily = ['MetaBook', 'Meta', 'sans-serif', 'system-ui'].join(',');

const typography = {
    p: {
        fontFamily: metaBookFontFamily,
        fontSize: '14px',
    },
    a: {
        fontFamily: metaBookFontFamily,
        fontSize: '14px',
    },
    span: {
        fontFamily: metaBookFontFamily,
        fontSize: '14px',
    },
    h1: {
        fontFamily: metaFontFamily,
        fontSize: '24px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.44',
        letterSpacing: 'normal',
        color: colors.colorFilterPill,
    },
    h2: {
        fontFamily: metaFontFamily,
        fontSize: '18px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.17',
        letterSpacing: 'normal',
        color: colors.colorFilterPill,
    },
    h3: {
        fontFamily: metaFontFamily,
        fontSize: '18px',
        fontWeight: 50,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.49',
        letterSpacing: 'normal',
        color: colors.colorFilterPill,
    },
    h4: {
        fontFamily: metaFontFamily,
        fontSize: '16px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: colors.colorFilterPill,
    },
    h5: {
        fontFamily: metaFontFamily,
        fontSize: '16px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: colors.colorFilterPill,
    },
    caption: {
        fontFamily: metaFontFamily,
        fontSize: '10px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.1',
        letterSpacing: 'normal',
        color: colors.colorFilterPill,
    },
};

export const materialTheme = createTheme({
    typography: {
        fontFamily: metaBookFontFamily,
        ...typography,
    },
    palette: {
        primary: { main: hexToRgb(colors.colorFilterPill) },
        secondary: { main: hexToRgb(colors.colorDark) },
        success: { main: hexToRgb(colors.colorBluegreen) },
        warning: { main: hexToRgb(colors.colorWarningLite) },
        error: { main: hexToRgb(colors.colorWarningStrong) },
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: 'unset',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                ...typography,
                body: {
                    margin: '0',
                    fontFamily: metaFontFamily,
                    fontSize: '14px',
                },
                label: {
                    fontFamily: metaFontFamily,
                    fontSize: '12px',
                    fontWeight: 'normal',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                    letterSpacing: 'normal',
                    textAlign: 'left',
                    color: colors.colorFilterPill,
                },
            },
        },
        MuiGrid: {
            styleOverrides: {
                root: {
                    marginTop: 0,
                },
            },
        },
        MuiIcon: {
            styleOverrides: {
                colorSecondary: colors.colorDark,
            },
        },
        MuiBreadcrumbs: {
            styleOverrides: {
                root: {
                    fontFamily: metaFontFamily,
                    fontSize: '12px',
                    color: colors.colorDarker,
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                message: {
                    textAlign: 'center',
                    width: '100%',
                },
            },
        },
    },
});
