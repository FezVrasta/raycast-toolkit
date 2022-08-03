import * as React from 'react';
import { ComponentProps, useCallback } from 'react';
import { runAppleScript } from 'run-applescript';
import { Action } from '@raycast/api';

interface SelectFileProps
  extends Omit<ComponentProps<typeof Action>, 'onAction'> {
  prompt?: string;
  type?: string;
  onSelect(filePath: string): unknown;
  onError(): unknown;
}

export const SelectFile = ({
  onSelect,
  onError,
  prompt = 'Please select a file',
  type,
  ...props
}: SelectFileProps): JSX.Element => {
  const handleSelectFromFinder = useCallback(async () => {
    try {
      const path = await runAppleScript(`
        set chosenFile to choose file with prompt "${prompt}:"${
        type != null ? `of type {"${type}"}` : ''
      }
        set raycastPath to POSIX path of (path to application "Raycast")
        do shell script "open " & raycastPath
        return POSIX path of chosenFile
      `);
      if (path) {
        onSelect(path);
      } else {
        onError()
      }
    } catch(e) {
      onError()
    }
  }, []);

  return <Action {...props} onAction={handleSelectFromFinder} />;
};
