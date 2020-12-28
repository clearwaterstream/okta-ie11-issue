import useDebounce from 'Util/UseDebounce';
import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

function withOnChangeDebounced(Component, opts) {
    if(!opts) {
        opts = {
            timeout: 2000
        };
    }
    
    function ComponentExtended(props) {
        const { forwardedRef, ...passThroughProps } = props;

        const [event, setEvent] = useState();

        const debouncedEvent = useDebounce(event, opts.timeout);

        const originalOnChange = props.onChange;

        useEffect(
            () => {
                let isCancelled = false;

                function onUnload() {
                    isCancelled = true;
                }

                if (debouncedEvent && !isCancelled) {
                    originalOnChange(event);
                }

                return onUnload;
            },
            [debouncedEvent]
        );

        function handleChangeInterceptor(ev) {
            ev.persist();

            setEvent(ev);
        }

        if (passThroughProps.onChange) {
            passThroughProps.onChange = handleChangeInterceptor;
        }

        return <Component ref={forwardedRef} {...passThroughProps} />;
    }

    function forwardRefBody(props, ref) {
        return <ComponentExtended {...props} forwardedRef={ref} />;
    }

    const name = Component.displayName || Component.name;
    forwardRefBody.displayName = `${withOnChangeDebounced.name}(${name})`;

    return React.forwardRef(forwardRefBody);
}

const TextFieldDebounced = withOnChangeDebounced(TextField);
const CurrencyTextFieldDebounced = withOnChangeDebounced(CurrencyTextField);

export { withOnChangeDebounced, TextFieldDebounced, CurrencyTextFieldDebounced };