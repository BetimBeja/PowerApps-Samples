import type { Meta, StoryObj } from "@storybook/html";
import type { IInputs, IOutputs } from "./Components/ReactStandardControl";

import resource from "raw-loader!!../../ReactStandardControl/ReactStandardControl/strings/ReactStandardControl.1033.resx";

import { useArgs, useEffect } from "@storybook/preview-api";
import { ReactStandardControl as Component } from "./Components/ReactStandardControl";
import {
  ComponentFrameworkMockGenerator,
  WholeNumberPropertyMock,
} from "@shko.online/componentframework-mock";
import "../../ReactStandardControl/ReactStandardControl/css/ReactStandardControl.css";

export default {
  title: "PowerApps Samples/ReactStandardControl",
  argTypes: {
    numberOfFaces: {
      options: [1, 2, 3, 4, 5], // iterator,
      control: "select",
    },
  },
} as Meta<StoryArgs>;

interface StoryArgs {
  isDisabled: boolean;
  isVisible: boolean;
  numberOfFaces: number;
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
      container.className = "SampleNamespace.ReactStandardControl";
      mockGenerator = new ComponentFrameworkMockGenerator(
        Component,
        {
          numberOfFaces: WholeNumberPropertyMock,
        },
        container
      );
      mockGenerator.SetControlResource(resource);
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context.mode.isVisible = args.isVisible;

      mockGenerator.onOutputChanged.callsFake(({ numberOfFaces }) => {
        updateArgs({ numberOfFaces });
      });

      mockGenerator.context._SetCanvasItems({
        numberOfFaces: args.numberOfFaces,
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context._parameters.numberOfFaces._SetValue(
        args.numberOfFaces
      );
      mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};

export const ReactStandardControl = {
  render: renderGenerator(),
  args: {
    numberOfFaces: 2,
  },
} as StoryObj<StoryArgs>;
