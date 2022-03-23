import { ComponentProps } from 'react';
import { Action } from '@raycast/api';
interface SelectFileProps extends Omit<ComponentProps<typeof Action>, 'onAction'> {
    prompt?: string;
    type?: string;
    onSelect(filePath: string): unknown;
}
export declare const SelectFile: ({ onSelect, prompt, type, ...props }: SelectFileProps) => JSX.Element;
export {};
