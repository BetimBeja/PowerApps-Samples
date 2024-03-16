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
  argTypes: {
    displayNameId: {
      name: "Id",
      control: "text",
      table: {
        category: "Parameters",
        subcategory: "Metadata - Column Display Names",
      },
    },
    displayNameAlias: {
      name: "Alias",
      control: "text",
      table: {
        category: "Parameters",
        subcategory: "Metadata - Column Display Names",
      },
    },
    displayNameAlias2: {
      name: "Alias2",
      control: "text",
      table: {
        category: "Parameters",
        subcategory: "Metadata - Column Display Names",
      },
    },
    items: {
      name: "Items",
      control: "object",
      table: {
        category: "Parameters",
      },
    },
  },
} as Meta<StoryArgs>;

interface StoryArgs {
  isDisabled: boolean;
  isVisible: boolean;
  items: {
    id: string;
    alias: string;
    alias2: string;
  }[];

  displayNameId: string;
  displayNameAlias: string;
  displayNameAlias2: string;
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
      mockGenerator.metadata.UpdateValue<string>(
        args.displayNameId,
        `!!simpleTableGrid@columns`,
        "displayName",
        "id"
      );
      mockGenerator.metadata.UpdateValue<string>(
        args.displayNameAlias,
        `!!simpleTableGrid@columns`,
        "displayName",
        "alias"
      );
      mockGenerator.metadata.UpdateValue<string>(
        args.displayNameAlias2,
        `!!simpleTableGrid@columns`,
        "displayName",
        "alias2 "
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
    displayNameAlias: "First Mocked Column",
    displayNameAlias2: "Second Mocked Column",
    displayNameId: "Record Id",
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
