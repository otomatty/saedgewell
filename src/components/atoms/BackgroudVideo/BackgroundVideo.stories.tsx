import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import BackgroundVideo from "./BackgroundVideo";

export default {
  title: "Atoms/BackgroundVideo",
  component: BackgroundVideo,
} as Meta<typeof BackgroundVideo>;

const Template: StoryFn = (args) => <BackgroundVideo {...args} />;

export const Default = Template.bind({});
Default.args = {};
