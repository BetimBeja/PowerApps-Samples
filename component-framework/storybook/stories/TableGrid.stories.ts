import type { Meta, StoryObj } from "@storybook/html";
import type { IInputs, IOutputs } from "./Components/TableGrid";

import resource from "raw-loader!!../../TableGrid/TableGrid/strings/TableGrid.1033.resx";

import { useArgs, useEffect } from "@storybook/preview-api";
import { TableGrid as Component } from "./Components/TableGrid";
import {
  ComponentFrameworkMockGenerator,
  DataSetMock,
} from "@shko.online/componentframework-mock";
import "../../TableGrid/TableGrid/css/TableGrid.css";

export default {
  title: "PowerApps Samples/TableGrid",
} as Meta<StoryArgs>;

interface StoryArgs {
  isDisabled: boolean;
  isVisible: boolean;
  items: {
    id: string;
    alias: string;
    alias2: string;
  }[];

  Columns: {
    alias: string;
    dataType: "string";
    displayName: string;
    name: string;
    order: number;
    visualSizeFactor: number;
  }[];
}

const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;

  return function () {
    const [args] = useArgs<StoryArgs>();
    useEffect(
      () => () => {
        container = null;
        mockGenerator.control.destroy();
      },
      []
    );
    if (!container) {
      container = document.createElement("div");
      container.className = "SampleNamespace.TableGrid";
      mockGenerator = new ComponentFrameworkMockGenerator(
        Component,
        {
          simpleTableGrid: DataSetMock,
        },
        container
      );
      mockGenerator.SetControlResource(resource);
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context._parameters.simpleTableGrid._InitItems(
        args.items || []
      );
    

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

      mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};

export const TableGrid = {
  render: renderGenerator(),
  args: {
    Columns: [
      {
        alias: "alias1",
        dataType: "string",
        displayName: "First Mocked Column",
        name: "alias",
        order: 1,
        visualSizeFactor: 200,
      },
      {
        alias: "alias2",
        dataType: "string",
        displayName: "Second Mocked Column",
        name: "alias2",
        order: 2,
        visualSizeFactor: 200,
      },
    ],
    items: [
      {
        id: "1",
        alias: "First Item",
        alias2: "Second Item",
      },
      {
        id: "2",
        alias: "First Item 2",
        alias2: "Second Item 2",
      },
      {
        id: "3",
        alias: "First Item 3",
        alias2: "Second Item 3",
      },
    ],
  },
} as StoryObj<StoryArgs>;
