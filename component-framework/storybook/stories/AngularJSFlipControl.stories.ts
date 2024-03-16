import type { Meta, StoryObj } from "@storybook/html";
import type { IInputs, IOutputs } from "./Components/AngularJSFlipControl";

import resource from "raw-loader!!../../AngularJSFlipControl/AngularJSFlipControl/strings/AngularJSFlipControl.1033.resx";

import { useArgs, useEffect } from "@storybook/preview-api";
import { AngularJSFlipControl as Component } from "./Components/AngularJSFlipControl";
import {
  ComponentFrameworkMockGenerator,
  TwoOptionsPropertyMock,
} from "@shko.online/componentframework-mock";
import "../../AngularJSFlipControl/AngularJSFlipControl/css/AngularJSFlipControl.css";

export default {
  title: "PowerApps Samples/AngularJS Flip Control",
  argTypes: {
    flipModel: {
      name: "Flip Model",
      control: "boolean",
      table: {
        category: "Parameters",
        defaultValue: { summary: "false" },
      },
    },
  },
} as Meta<StoryArgs>;

interface StoryArgs {
  isDisabled: boolean;
  isVisible: boolean;
  flipModel: boolean;
}

const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;

  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    useEffect(
      () => () => {
        container = null;
        mockGenerator.control.destroy();
      },
      []
    );
    if (!container) {
      container = document.createElement("div");
      container.className = "SampleNamespace.JSAngularJSFlipControl";
      mockGenerator = new ComponentFrameworkMockGenerator(
        Component,
        {
          flipModel: TwoOptionsPropertyMock,
        },
        container
      );
      mockGenerator.SetControlResource(resource);
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context._SetCanvasItems({
        flipModel: args.flipModel,
      });

      mockGenerator.onOutputChanged.callsFake(({ flipModel }) => {
        updateArgs({ flipModel });
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context._parameters.flipModel._SetValue(args.flipModel);

      mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};

export const AngularJSFlipControl = {
  render: renderGenerator(),
  args: {
    flipModel: false,
  },
} as StoryObj<StoryArgs>;
