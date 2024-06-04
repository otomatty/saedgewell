import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import NavigationList from './NavigationList';

export default {
  title: 'Molecules/NavigationList',
  component: NavigationList,
} as Meta<typeof NavigationList>;

const Template: StoryFn<typeof NavigationList> = (args) => (
  <NavigationList {...args} />
);

export const Default = Template.bind({});
Default.args = {};
