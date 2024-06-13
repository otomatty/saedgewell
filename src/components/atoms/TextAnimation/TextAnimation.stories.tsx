import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import TextAnimation, { TextAnimationProps } from "./TextAnimation";

export default {
  title: "Atoms/TextAnimation",
  component: TextAnimation,
  argTypes: {
    words: { control: { type: "object" } },
    interval: { control: { type: "number" } },
  },
} as Meta<typeof TextAnimation>;

const Template: StoryFn<TextAnimationProps> = (args) => (
  <TextAnimation {...args} />
);

export const Default = Template.bind({});
Default.args = {
  words: ["tasty.", "wonderful.", "fancy.", "beautiful.", "cheap."],
  interval: 4000,
};
