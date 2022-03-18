import * as React from 'react';
import { useCallback } from 'react';
import { runAppleScript } from 'run-applescript';
import { Action } from '@raycast/api';
export const SelectFile = ({ onSelect, prompt = 'Please select a file', type, ...props }) => {
    const handleSelectFromFinder = useCallback(async () => {
        const path = await runAppleScript(`
      set chosenFile to choose file with prompt "${prompt}:"${type != null ? `of type {"${type}"}` : ''}
      set raycastPath to POSIX path of (path to application "Raycast")
      do shell script "open " & raycastPath
      return POSIX path of chosenFile
    `);
        if (path) {
            onSelect(path);
        }
    }, []);
    return React.createElement(Action, { ...props, onAction: handleSelectFromFinder });
};
