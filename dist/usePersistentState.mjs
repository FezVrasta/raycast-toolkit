import { LocalStorage } from '@raycast/api';
import { useEffect, useState, useCallback, } from 'react';
export function usePersistentState(key, initialValue) {
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(initialValue);
    useEffect(() => {
        // FIXME In the future version, we don't need didUnmount checking
        // https://github.com/facebook/react/pull/22114
        let didUnmount = false;
        (async () => {
            const cache = await LocalStorage.getItem(key);
            if (typeof cache === 'string') {
                if (!didUnmount) {
                    setState(JSON.parse(cache));
                }
            }
            setLoading(false);
        })();
        return () => {
            didUnmount = true;
        };
    }, []);
    const setStateAndLocalStorage = useCallback((updater) => {
        setState((state) => {
            const newValue = typeof updater === 'function' ? updater(state) : updater;
            LocalStorage.setItem(key, JSON.stringify(newValue));
            return newValue;
        });
    }, []);
    return [state, setStateAndLocalStorage, loading];
}
