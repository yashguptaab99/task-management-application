import { MantineThemeOverride } from '@mantine/core'

import { customComponents } from '@/theme/theme-components'

import { themeOverrides } from './theme-overrides'

const baseTheme: MantineThemeOverride = {
    // white: findColor('Base', 'white'),
    // black: findColor('Base', 'black'),
    colors: {
        brand: [
            '#EEEEFF',
            '#D8DAFA',
            '#AFB0EC',
            '#8385E0',
            '#5F60D6',
            '#4749D0',
            '#3A3DCE',
            '#2C30B7',
            '#2529A4',
            '#1A2392',
        ],
        gray: [
            '#F9FAFB',
            '#F2F4F7',
            '#EAECF0',
            '#D0D5DD',
            '#98A2B3',
            '#667085',
            '#475467',
            '#344054',
            '#182230',
            '#101828',
        ],
        grayDark: [
            '#F5F5F6',
            '#F0F1F1',
            '#ECECED',
            '#CECFD2',
            '#94969C',
            '#85888E',
            '#61646C',
            '#333741',
            '#1F242F',
            '#161B26',
        ],
        error: [
            '#FEF3F2',
            '#FEE4E2',
            '#FECDCA',
            '#FDA29B',
            '#F97066',
            '#F04438',
            '#D92D20',
            '#B42318',
            '#912018',
            '#7A271A',
        ],
        warning: [
            '#FFFAEB',
            '#FEF0C7',
            '#FEDF89',
            '#FEC84B',
            '#FDB022',
            '#F79009',
            '#DC6803',
            '#B54708',
            '#93370D',
            '#7A2E0E',
        ],
        success: [
            '#ECFDF3',
            '#DCFAE6',
            '#ABEFC6',
            '#75E0A7',
            '#47CD89',
            '#17B26A',
            '#079455',
            '#067647',
            '#085D3A',
            '#074D31',
        ],
        grayBlue: [
            '#F8F9FC',
            '#EAECF5',
            '#D5D9EB',
            '#B3B8DB',
            '#717BBC',
            '#4E5BA6',
            '#3E4784',
            '#363F72',
            '#293056',
            '#101323',
        ],
        grayCool: [
            '#F9F9FB',
            '#EFF1F5',
            '#DCDFEA',
            '#B9C0D4',
            '#7D89B0',
            '#5D6B98',
            '#4A5578',
            '#404968',
            '#30374F',
            '#111322',
        ],
        grayModern: [
            '#F8FAFC',
            '#EEF2F6',
            '#E3E8EF',
            '#CDD5DF',
            '#9AA4B2',
            '#697586',
            '#4B5565',
            '#364152',
            '#202939',
            '#121926',
        ],
        grayNeutral: [
            '#F9FAFB',
            '#F3F4F6',
            '#E5E7EB',
            '#D2D6DB',
            '#9DA4AE',
            '#6C737F',
            '#4D5761',
            '#384250',
            '#1F2A37',
            '#111927',
        ],
        grayIron: [
            '#FAFAFA',
            '#F4F4F5',
            '#E4E4E7',
            '#D1D1D6',
            '#A0A0AB',
            '#70707B',
            '#51525C',
            '#3F3F46',
            '#26272B',
            '#1A1A1E',
        ],
        grayTrue: [
            '#FAFAFA',
            '#F5F5F5',
            '#E5E5E5',
            '#D6D6D6',
            '#A3A3A3',
            '#737373',
            '#525252',
            '#424242',
            '#292929',
            '#141414',
        ],
        grayWarn: [
            '#FAFAF9',
            '#F5F5F4',
            '#E7E5E4',
            '#D7D3D0',
            '#A9A29D',
            '#79716B',
            '#57534E',
            '#44403C',
            '#292524',
            '#1C1917',
        ],
        moss: [
            '#F5FBEE',
            '#E6F4D7',
            '#CEEAB0',
            '#ACDC79',
            '#86CB3C',
            '#669F2A',
            '#4F7A21',
            '#3F621A',
            '#335015',
            '#2B4212',
        ],
        greenLight: [
            '#F3FEE7',
            '#E3FBCC',
            '#D0F8AB',
            '#A6EF67',
            '#85E13A',
            '#66C61C',
            '#4CA30D',
            '#3B7C0F',
            '#326212',
            '#2B5314',
        ],
        green: [
            '#EDFCF2',
            '#D3F8DF',
            '#AAF0C4',
            '#73E2A3',
            '#3CCB7F',
            '#16B364',
            '#099250',
            '#087443',
            '#095C37',
            '#084C2E',
        ],
        teal: [
            '#F0FDF9',
            '#CCFBEF',
            '#99F6E0',
            '#5FE9D0',
            '#2ED3B7',
            '#15B79E',
            '#0E9384',
            '#107569',
            '#125D56',
            '#134E48',
        ],
        cyan: [
            '#ECFDFF',
            '#CFF9FE',
            '#A5F0FC',
            '#67E3F9',
            '#22CCEE',
            '#06AED4',
            '#088AB2',
            '#0E7090',
            '#155B75',
            '#164C63',
        ],
        blueLight: [
            '#F0F9FF',
            '#E0F2FE',
            '#B9E6FE',
            '#7CD4FD',
            '#36BFFA',
            '#0BA5EC',
            '#0086C9',
            '#026AA2',
            '#065986',
            '#0B4A6F',
        ],
        blue: [
            '#EFF8FF',
            '#D1E9FF',
            '#B2DDFF',
            '#84CAFF',
            '#53B1FD',
            '#2E90FA',
            '#1570EF',
            '#175CD3',
            '#1849A9',
            '#194185',
        ],
        blueDark: [
            '#EFF4FF',
            '#D1E0FF',
            '#B2CCFF',
            '#84ADFF',
            '#528BFF',
            '#2970FF',
            '#155EEF',
            '#004EEB',
            '#0040C1',
            '#00359E',
        ],
        indigo: [
            '#EEF4FF',
            '#E0EAFF',
            '#C7D7FE',
            '#A4BCFD',
            '#8098F9',
            '#6172F3',
            '#444CE7',
            '#3538CD',
            '#2D31A6',
            '#2D3282',
        ],
        violet: [
            '#F5F3FF',
            '#ECE9FE',
            '#DDD6FE',
            '#C3B5FD',
            '#A48AFB',
            '#875BF7',
            '#7839EE',
            '#6927DA',
            '#5720B7',
            '#491C96',
        ],
        purple: [
            '#F4F3FF',
            '#EBE9FE',
            '#D9D6FE',
            '#BDB4FE',
            '#9B8AFB',
            '#7A5AF8',
            '#6938EF',
            '#5925DC',
            '#4A1FB8',
            '#3E1C96',
        ],
        fuchsia: [
            '#FDF4FF',
            '#FBE8FF',
            '#F6D0FE',
            '#EEAAFD',
            '#E478FA',
            '#D444F1',
            '#BA24D5',
            '#9F1AB1',
            '#821890',
            '#6F1877',
        ],
        pink: [
            '#FDF2FA',
            '#FCE7F6',
            '#FCCEEE',
            '#FAA7E0',
            '#F670C7',
            '#EE46BC',
            '#DD2590',
            '#C11574',
            '#9E165F',
            '#851651',
        ],
        rose: [
            '#FFF1F3',
            '#FFE4E8',
            '#FECDD6',
            '#FEA3B4',
            '#FD6F8E',
            '#F63D68',
            '#E31B54',
            '#C01048',
            '#A11043',
            '#89123E',
        ],
        orangeDark: [
            '#FFF4ED',
            '#FFE6D5',
            '#FFD6AE',
            '#FF9C66',
            '#FF692E',
            '#FF4405',
            '#E62E05',
            '#BC1B06',
            '#97180C',
            '#771A0D',
        ],
        orange: [
            '#FEF6EE',
            '#FDEAD7',
            '#F9DBAF',
            '#F7B27A',
            '#F38744',
            '#EF6820',
            '#E04F16',
            '#B93815',
            '#932F19',
            '#772917',
        ],
        yellow: [
            '#FEFBE8',
            '#FEF7C3',
            '#FEEE95',
            '#FDE272',
            '#FAC515',
            '#EAAA08',
            '#CA8504',
            '#A15C07',
            '#854A0E',
            '#713B12',
        ],
    },
    primaryColor: 'brand',
    breakpoints: {
        xs: '30em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
        xxl: '120em',
    },
    spacing: {
        // 3.Spacing
        none: '0px',
        xxs: '2px',
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xl2: '20px',
        xl3: '24px',
        xl4: '32px',
        xl5: '40px',
        xl6: '48px',
        xl7: '64px',
        xl8: '80px',
        xl9: '96px',
        xl10: '128px',
        xl11: '160px',
    },
    radius: {
        // 2.Radius
        none: '0px',
        xxs: '2px',
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '10px',
        xl: '12px',
        xl2: '16px',
        xl3: '20px',
        xl4: '24px',
        full: '9999px',
    },
    fontSizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
    },
    lineHeights: {
        xs: '18px',
        sm: '20px',
        md: '24px',
        lg: '28px',
        xl: '30px',
    },
    shadows: {
        xs: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        sm: '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)',
        md: '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.1)',
        lg: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
        xl: '0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)',
        xl2: '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
        xl3: '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
    },
    headings: {
        sizes: {
            h1: { fontSize: '72px', fontWeight: 'Bold', lineHeight: '90px' },
            h2: { fontSize: '60px', fontWeight: 'Bold', lineHeight: '72px' },
            h3: { fontSize: '48px', fontWeight: 'Bold', lineHeight: '60px' },
            h4: { fontSize: '36px', fontWeight: 'Bold', lineHeight: '44px' },
            h5: { fontSize: '30px', fontWeight: 'Bold', lineHeight: '38px' },
            h6: { fontSize: '24px', fontWeight: 'Bold', lineHeight: '32px' },
        },
    },
    fontFamily: "'Inter', sans-serif",
    defaultRadius: 'md',
    respectReducedMotion: true,
    components: customComponents,
}

export const theme: MantineThemeOverride = { ...baseTheme, ...themeOverrides(baseTheme) }
