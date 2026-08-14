import type { Meta, StoryFn } from "@storybook/react-vite";
import { TTooltipRootProps, Tooltip } from "./index";

const meta = {
  title: "Tooltip",
  component: () => <Tooltip.Root />,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Tooltip>;

export default meta;

const Template: StoryFn<TTooltipRootProps> = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <div>Tooltip trigger (Hover on me)</div>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <div className="w-[400px]">
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </div>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
