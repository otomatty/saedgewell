import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Catchphrase, { CatchphraseProps } from "./Catchphrase";

export default {
  title: "Molecules/Catchphrase",
  component: Catchphrase,
  argTypes: {
    title: { control: { type: "text" } },
    catchphrases: { control: { type: "object" } },
    interval: { control: { type: "number" } },
  },
} as Meta<typeof Catchphrase>;

const Template: StoryFn<CatchphraseProps> = (args) => <Catchphrase {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "最小限のリソースから\n最大限の成果を生み出す",
  catchphrases: [
    "Webエンジニア",
    "メンター/コーチ",
    "UXデザイナー",
    "Webマーケター",
  ],
  interval: 4000,
};
