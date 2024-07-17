import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import MessageAnimation from "./MessageAnimation";

export default {
  title: "Atoms/MessageAnimation",
  component: MessageAnimation,
} as Meta<typeof MessageAnimation>;

const Template: StoryFn<typeof MessageAnimation> = (args) => (
  <MessageAnimation {...args} />
);

export const Default = Template.bind({});
Default.args = {};
