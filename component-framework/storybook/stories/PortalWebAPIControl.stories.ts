import type { Meta, StoryObj } from '@storybook/html';
import type { IInputs, IOutputs } from './Components/PortalWebAPIControl';

import { useArgs, useEffect } from '@storybook/preview-api';
import { PortalWebAPIControl as Component } from './Components/PortalWebAPIControl';
import { AttributeType, ComponentFrameworkMockGenerator, ShkoOnline, StringPropertyMock } from '@shko.online/componentframework-mock';
import '../../../portals/PortalWebAPIControl/PortalWebAPIControl/css/PortalWebAPIControl.css';

export default {
    title: "PowerApps Samples/Portal WebAPI Control",
} as Meta<StoryArgs>;

interface StoryArgs {
    isDisabled: boolean;
    isVisible: boolean;
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
            [],
        );
        if (!container) {
            container = document.createElement('div');
            container.className = 'SampleNamespace.PortalWebAPIControl';
            mockGenerator = new ComponentFrameworkMockGenerator(
                Component,
                {
                    stringProperty: StringPropertyMock,
                },
                container,
            );

            mockGenerator.metadata.initMetadata([
                { LogicalName: 'account', EntitySetName: 'accounts', PrimaryIdAttribute: 'accountid', PrimaryNameAttribute: 'name', Attributes: [
                    {
                        AttributeType: AttributeType.Uniqueidentifier,
                        LogicalName: 'accountid',
                        SchemaName: 'AccountId'
                    } as ShkoOnline.AttributeMetadata,
                    {
                        AttributeType: AttributeType.String,
                        LogicalName: 'name',
                        SchemaName: 'Name'
                    } as ShkoOnline.StringAttributeMetadata,
                    {
                        AttributeType: AttributeType.Money,
                        LogicalName: 'revenue',
                        SchemaName: 'revenue'
                    } as ShkoOnline.AttributeMetadata
                ] },
            ]);

            mockGenerator.context.mode.isControlDisabled = args.isDisabled;
            mockGenerator.context.mode.isVisible = args.isVisible;
            mockGenerator.context._SetCanvasItems({
                stringProperty: '',
            });

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

export const PortalWebAPIControl = {
    render: renderGenerator(),
} as StoryObj<StoryArgs>;
