import { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

import { TButtonProps } from "./Button.types";
import Icon from "../Icon/Icon";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = (args: TButtonProps) => <Button {...args} />;
Primary.args = {
  children: "Button",
  onClick: (): void => console.log("you clicked the button"),
};

export const Disabled: Story = (args: TButtonProps) => <Button {...args} />;
Disabled.args = {
  children: "Button",
  disabled: true,
  onClick: (): void => console.log("this shouldnt appear"),
};

export const WithIcon: Story = (args: TButtonProps) => <Button {...args} />;
WithIcon.args = {
  children: (
    <>
      <Icon src="mail.svg" className="mr-2 flex"></Icon> Button
    </>
  ),
};

export const IconOnly: Story = (args: TButtonProps) => <Button {...args} />;
IconOnly.args = {
  children: <Icon src="add-to-cart.svg"></Icon>,
  size: "icon",
  variant: "outline",
};

export const Secondary: Story = (args: TButtonProps) => <Button {...args} />;
Secondary.args = {
  children: "Button",
  variant: "secondary",
};

export const Destructive: Story = (args: TButtonProps) => <Button {...args} />;
Destructive.args = {
  children: "Button",
  variant: "destructive",
};

export const Outline: Story = (args: TButtonProps) => <Button {...args} />;
Outline.args = {
  children: "Button",
  variant: "outline",
};

export const Link: Story = (args: TButtonProps) => <Button {...args} />;
Link.args = {
  children: "Link",
  variant: "link",
};

export const Ghost: Story = (args: TButtonProps) => <Button {...args} />;
Ghost.args = {
  children: "Button",
  variant: "ghost",
};

export const Small: Story = (args: TButtonProps) => <Button {...args} />;
Small.args = {
  children: "Small",
  size: "sm",
};

export const Large: Story = (args: TButtonProps) => <Button {...args} />;
Large.args = {
  children: "Large",
  size: "lg",
};
