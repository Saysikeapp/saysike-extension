import { z } from "zod";
import { Meta, StoryFn } from "@storybook/react-vite";
import { TFormInputProps } from "./TextInput.types";
import { Input } from "./TextInput";
import { StoryForm } from "../Form/StoryForm";

import { Icon } from "../Icon";
import { InputLabel } from "../Shared";

const meta = {
  title: "TextInput",
  component: Input.Form,
  args: {
    name: "name",
    placeholder: "This is an input for your text",
    disabled: false,
    className: "",
    iconRight: null,
    iconLeft: null,
  },
  // tags: ["autodocs"],
} satisfies Meta<typeof Input.Form>;

export default meta;

const schema = z.object({
  name: z.string().min(3, "Input must be at least 3 characters"),
});

const Template: StoryFn<TFormInputProps> = (args) => (
  <StoryForm schema={schema}>
    <Input.Form {...args} />
  </StoryForm>
);

const TightSpaceTemplate: StoryFn<TFormInputProps> = (args) => (
  <StoryForm schema={schema}>
    <div style={{ width: "100px" }}>
      <Input.Form {...args} />
    </div>
  </StoryForm>
);

export const Primary = Template.bind({});
Primary.args = {
  name: "name",
  placeholder: "Default",
  disabled: false,
  className: "",
};

export const Label = Template.bind({});
Label.args = {
  name: "name",
  placeholder: "Default",
  disabled: false,
  className: "",
};
Label.decorators = (Component) => {
  return (
    <div>
      <InputLabel htmlFor={"input"}>Label</InputLabel>
      <Component />
    </div>
  );
};

export const WithIconRight = Template.bind({});
WithIconRight.args = {
  name: "name",
  disabled: false,
  className: "",
  iconRight: <Icon src="search.svg" />,
};

export const WithIconLeft = Template.bind({});
WithIconLeft.args = {
  name: "name",
  disabled: false,
  className: "",
  iconLeft: <Icon src="add-to-cart.svg" />,
};

export const WithIconsBoth = Template.bind({});
WithIconsBoth.args = {
  name: "name",
  disabled: false,
  className: "",
  iconLeft: <Icon src="add-to-cart.svg" />,
  iconRight: <Icon src="search.svg" />,
};

export const Loading = Template.bind({});
Loading.args = {
  name: "name",
  disabled: false,
  className: "",
  iconLeft: <Icon src="add-to-cart.svg" />,
  iconRight: <Icon src="search.svg" />,
  loadingDisplayType: "spinner",
  isLoading: true,
};

export const Small = Template.bind({});
Small.args = {
  name: "name",
  disabled: false,
  className: "",
  size: "sm",
  iconLeft: <Icon src="add-to-cart.svg" />,
  iconRight: <Icon src="search.svg" />,
};

export const Large = Template.bind({});
Large.args = {
  name: "name",
  disabled: false,
  className: "",
  size: "lg",
  iconLeft: <Icon src="add-to-cart.svg" />,
  iconRight: <Icon src="search.svg" />,
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "disabled",
  disabled: true,
};

export const WithSuccess = Template.bind({});
WithSuccess.args = {
  name: "name",
  placeholder: "Type for success",
  validationStateTextProps: {
    emptyMessageSpace: true,
    showSuccessOnFormValidation: true,
    customMessage: (state) => state === "success" && "Success",
  },
};

export const WithSuccessIcon = Template.bind({});
WithSuccessIcon.args = {
  name: "name",
  placeholder: "Type for success",
  validationStateTextProps: {
    emptyMessageSpace: true,
    showSuccessOnFormValidation: true,
    customMessage: (state) => state === "success" && <Icon src="check.svg" />,
  },
};

export const TightSpace = TightSpaceTemplate.bind({});
TightSpace.args = {
  placeholder: "OVERLAP",
  iconRight: <Icon src="add-to-cart.svg" />,
  validationStateTextProps: {
    showSuccessOnFormValidation: true,
    customMessage: (state) => state === "success" && "Success",
  },
};

export const Manual: StoryFn = () => {
  return (
    <Input
      placeholder="SEARCH CUSTOMERS"
      name="customer-search"
      validationStateTextProps={{
        state: "success",
        customMessage: "Success",
      }}
      iconRight={<Icon src={"solid/search.svg"} size={4} />}
    />
  );
};
