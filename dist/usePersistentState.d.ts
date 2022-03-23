import type { Dispatch, SetStateAction } from 'react';
export declare function usePersistentState<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>, boolean];
