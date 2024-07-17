import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import MainVisual from './MainVisual';

export default {
  title: 'Organisms/MainVisual',
  component: MainVisual,
} as Meta<typeof MainVisual>;

const Template: StoryFn<typeof MainVisual> = (args) => <MainVisual {...args} />;

export const Default = Template.bind({});
Default.args = {};
