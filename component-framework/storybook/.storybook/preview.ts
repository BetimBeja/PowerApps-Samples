import type { Preview } from "@storybook/html";
const preview : Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  argTypes: {
    isDisabled: {
      name: "Disabled",
      control: "boolean",
      table: {
        category: "Mode",
        defaultValue: { summary: "false" },
      },
    },
    isVisible: {
      name: "Visible",
      control: "boolean",
      table: {
        category: "Mode",
        defaultValue: { summary: "true" },
      },
    },
  },
  args: {
    isDisabled: false,
    isVisible: true,
  },
};

export default preview;
