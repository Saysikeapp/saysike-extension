import { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import { Typography } from "./index";
import { HelperTextProps } from "./subcomponents/HelperText.types";

import { Icon } from "../Icon";

const meta = {
  title: "Typography",
  parameters: {
    layout: "centered",
  },

  argTypes: {},
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryFn<typeof meta>;

export const Primary: Story = () => {
  return (
    <div>
      <Typography.Header>Saysike Header</Typography.Header>
      <Typography.RowTitle>Row Title</Typography.RowTitle>
      <Typography.RowHeader>Row Header</Typography.RowHeader>
      <Typography.SubProduct>Sub Product</Typography.SubProduct>
      <Typography.Description>Description</Typography.Description>
      <Typography.SmallDescription>Smol</Typography.SmallDescription>
      <Typography.Price>Price $67.42</Typography.Price>

      <Typography.HelperText>This is some helper text.</Typography.HelperText>
      <Typography.HelperText state="success">
        <Icon src="check.svg" className="mr-1" /> This is some success text.
      </Typography.HelperText>
      <Typography.HelperText state="warning">
        <Icon src="priority-warning.svg" className="mr-1" /> This is some
        warning text.
      </Typography.HelperText>
      <Typography.HelperText state="error">
        <Icon src="priority-warning.svg" className="mr-1" /> This is some ERROR
        text.
      </Typography.HelperText>
    </div>
  );
};

type HelperTextStory = StoryObj<typeof Typography.HelperText>;

export const HelperTextError: HelperTextStory = (args: HelperTextProps) => (
  <Typography.HelperText {...args}></Typography.HelperText>
);
HelperTextError.args = {
  children: "This is error text.",
  state: "error",
};

export const HelperTextSuccess: HelperTextStory = (args: HelperTextProps) => (
  <Typography.HelperText {...args}></Typography.HelperText>
);
HelperTextSuccess.args = {
  children: "This is success text.",
  state: "success",
};

export const HelperTextWarning: HelperTextStory = (args: HelperTextProps) => (
  <Typography.HelperText {...args}></Typography.HelperText>
);
HelperTextWarning.args = {
  children: "This is warning text.",
  state: "warning",
};
