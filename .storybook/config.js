import { configure, addDecorator } from '@storybook/react';
import withStyles from './with-styles';

addDecorator(withStyles);

configure(require.context('../components', true, /\.stories\.(js|mdx)$/), module);
