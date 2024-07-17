import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import NavigationModal from './NavigationModal';

export default {
  title: 'Molecules/NavigationModal',
  component: NavigationModal,
} as Meta<typeof NavigationModal>;

const Template: StoryFn<typeof NavigationModal> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleModal}>Toggle Modal</button>
      <NavigationModal {...args} isOpen={isOpen} onClose={toggleModal} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
};
