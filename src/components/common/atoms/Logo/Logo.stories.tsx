import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Logo from "./Logo";

export default {
  title: "Atoms/Logo",
  component: Logo,
} as Meta;

const Template: StoryFn = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {};
