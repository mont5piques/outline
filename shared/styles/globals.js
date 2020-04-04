// @flow
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ${styledNormalize}

  @font-face {
    font-family: 'Lato';
    src: url('/fonts/LatoLatin-Semibold.woff') format('woff');
  }

  /* poppins-regular - latin */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/poppins-v9-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Poppins Regular'), local('Poppins-Regular'),
         url('/fonts/poppins-v9-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/poppins-v9-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/poppins-v9-latin-regular.woff') format('woff'), /* Modern Browsers */
         url('/fonts/poppins-v9-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/poppins-v9-latin-regular.svg#Poppins') format('svg'); /* Legacy iOS */
  }
  /* poppins-500 - latin */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    src: url('/fonts/poppins-v9-latin-600.eot'); /* IE9 Compat Modes */
    src: local('Poppins SemiBold'), local('Poppins-SemiBold'),
         url('/fonts/poppins-v9-latin-600.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/poppins-v9-latin-600.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/poppins-v9-latin-600.woff') format('woff'), /* Modern Browsers */
         url('/fonts/poppins-v9-latin-600.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/poppins-v9-latin-600.svg#Poppins') format('svg'); /* Legacy iOS */
  }
  /* poppins-600 - latin */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    src: url('/fonts/poppins-v9-latin-600.eot'); /* IE9 Compat Modes */
    src: local('Poppins SemiBold'), local('Poppins-SemiBold'),
         url('/fonts/poppins-v9-latin-600.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/poppins-v9-latin-600.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/poppins-v9-latin-600.woff') format('woff'), /* Modern Browsers */
         url('/fonts/poppins-v9-latin-600.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/poppins-v9-latin-600.svg#Poppins') format('svg'); /* Legacy iOS */
  }

  /* poppins-800 - latin */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 800;
    src: url('../fonts/poppins-v9-latin-800.eot'); /* IE9 Compat Modes */
    src: local('Poppins ExtraBold'), local('Poppins-ExtraBold'),
         url('/fonts/poppins-v9-latin-800.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/poppins-v9-latin-800.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/poppins-v9-latin-800.woff') format('woff'), /* Modern Browsers */
         url('/fonts/poppins-v9-latin-800.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/poppins-v9-latin-800.svg#Poppins') format('svg'); /* Legacy iOS */
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  body,
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    font-size: 16px;
    line-height: 1.5;
    color: ${props => props.theme.text};

    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    cursor: pointer;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Poppins', 'Lato',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen, Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;
    font-weight: 800;
    line-height: 1.25;
    margin-top: 1em;
    margin-bottom: 0.5em;
    color: ${props => props.theme.text};
  }
  h1 { font-size: 2.25em; }
  h2 { font-size: 1.5em; }
  h3 { font-size: 1.25em; }
  h4 { font-size: 1em; }
  h5 { font-size: 0.875em; }
  h6 { font-size: 0.75em; }

  p,
  dl,
  ol,
  ul,
  pre,
  blockquote {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  hr {
    border: 0;
    height: 0;
    border-top: 1px solid ${props => props.theme.divider};
  }
`;
