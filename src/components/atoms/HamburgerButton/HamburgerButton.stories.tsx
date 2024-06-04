import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import HamburgerButton, { HamburgerButtonProps } from "./HamburgerButton";

export default {
  title: "Atoms/HamburgerButton",
  component: HamburgerButton,
} as Meta;

const Template: StoryFn<HamburgerButtonProps> = (args) => (
  <HamburgerButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onClick: () => alert("Hamburger button clicked"),
};
