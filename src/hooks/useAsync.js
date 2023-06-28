import React from 'react';

export const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};

function useSafeDispatch(dispatch) {
    const mounted = React.useRef(false);
    React.useLayoutEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    }, []);
    return React.useCallback((...args) => (mounted.current ? dispatch(...args) : void 0), [dispatch]);
}

function asyncReducer(state, action) {
    switch (action.type) {
        case STATUS.PENDING: {
            return { status: STATUS.PENDING, data: null, error: null };
        }
        case STATUS.RESOLVED: {
            return { status: STATUS.RESOLVED, data: action.data, error: null };
        }
        case STATUS.REJECTED: {
            return { status: STATUS.REJECTED, data: null, error: action.error };
        }
        default: {
            throw new Error('Unhandled action type:' + action.type);
        }
    }
}

function useAsync(initialState) {
    const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
        status: STATUS.IDLE,
        data: null,
        error: null,
        ...initialState,
    });

    const dispatch = useSafeDispatch(unsafeDispatch);

    const { data, error, status } = state;

    const run = React.useCallback(
        (promise) => {
            dispatch({ type: STATUS.PENDING });
            promise.then(
                (data) => {
                    dispatch({ type: STATUS.RESOLVED, data });
                },
                (error) => {
                    dispatch({ type: STATUS.REJECTED, error });
                },
            );
        },
        [dispatch],
    );

    return {
        isIdle: status === STATUS.IDLE,
        isPending: status === STATUS.PENDING,
        isRejected: status === STATUS.REJECTED,
        isResolved: status === STATUS.RESOLVED,

        error,
        status,
        data,
        run,
    };
}

export default useAsync;
