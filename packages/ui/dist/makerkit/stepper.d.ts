import * as React from 'react';

type Variant = 'numbers' | 'default' | 'dots';
/**
 * Renders a stepper component with multiple steps.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - steps {string[]} - An array of strings representing the step labels.
 *   - currentStep {number} - The index of the currently active step.
 *   - variant {string} (optional) - The variant of the stepper component (default: 'default').
 **/
declare function Stepper(props: {
    steps: string[];
    currentStep: number;
    variant?: Variant;
}): React.JSX.Element | null;

export { Stepper };
