import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import BackgroundAnimation from './BackgroundAnimation';

export default {
  title: 'Atoms/BackgroundAnimation',
  component: BackgroundAnimation,
} as Meta<typeof BackgroundAnimation>;

const Template: StoryFn = (args) => <BackgroundAnimation {...args} />;

export const Default = Template.bind({});
Default.args = {};
