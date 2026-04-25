import type { Meta, StoryObj } from "@storybook/react-vite";

import Icon from "./Icon";
import { icon_src_array } from "./icon_src_array";

const meta = {
  title: "Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      description: "4",
      control: {
        type: "number",
        min: 0,
        max: 10,
        step: 0.5,
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: "add-to-cart.svg",
    size: 8,
  },
};

export const IconGallery: Story = {
  args: {
    src: icon_src_array[0],
    size: 8,
  },
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {icon_src_array.map((src) => (
        <div
          key={src}
          className="flex flex-col items-center text-primary gap-2"
        >
          <Icon size={8} src={src} />
          <span className="text-xs">{src}</span>
        </div>
      ))}
    </div>
  ),
};
