import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import NavigationMenu from './NavigationMenu';

export default {
  title: 'Organisms/NavigationMenu',
  component: NavigationMenu,
} as Meta<typeof NavigationMenu>;

const Template: StoryFn<typeof NavigationMenu> = (args) => (
  <NavigationMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {};
