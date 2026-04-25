import { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingDoubleSpinner, LoadingSpinner } from "./Loading";

const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,
  title: "Loading Spinners",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = () => {
  return (
    <div className=" border-black border h-40 w-40 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

Default.args = {};

export const DoubleSpinner: Story = () => {
  return (
    <div className=" border-black border h-40 w-40 flex items-center justify-center">
      <LoadingDoubleSpinner />
    </div>
  );
};

DoubleSpinner.args = {};
