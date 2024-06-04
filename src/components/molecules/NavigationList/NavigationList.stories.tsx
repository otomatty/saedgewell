import React, { useRef } from "react";
import { Meta, StoryFn } from "@storybook/react";
import NavigationList from "./NavigationList";

export default {
  title: "Molecules/NavigationList",
  component: NavigationList,
} as Meta;

const Template: StoryFn = (args) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const simulateScroll = (direction: "up" | "down") => {
    if (containerRef.current) {
      const event = new Event("scroll");
      if (direction === "down") {
        window.scrollTo(0, 100);
      } else {
        window.scrollTo(0, 0);
      }
      window.dispatchEvent(event);
    }
  };

  return (
    <div ref={containerRef} style={{ height: "200px", overflow: "auto" }}>
      <button onClick={() => simulateScroll("down")}>Scroll Down</button>
      <button onClick={() => simulateScroll("up")}>Scroll Up</button>
      <NavigationList {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
