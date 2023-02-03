import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from './../app/theme';
import createEmotionCache from './../app/createEmotionCache';
import Drawer from './../app/components/drawer'
import Grid from '@mui/material/Grid';

// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const { Component, emotionCache =
		clientSideEmotionCache, pageProps } = props;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>

				{/* CssBaseline kickstart an elegant,
				consistent, and simple baseline to
				build upon. */}

				<CssBaseline />
				<Grid container spacing={0} sx={{ backgroundColor: '#F9FAFC'}}>
					<Drawer></Drawer>
					<Grid item xs sx={{ mt: 2 }}>
						<Component {...pageProps} />
					</Grid>
				</Grid>
			</ThemeProvider>
		</CacheProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
