import React, { useRef, useEffect } from "react";

export function usePollingEffect(
    asyncCallback,
    dependencies = [],
    {
        interval = 10_000, // 10 seconds
        onCleanUp = () => { }
    } = {},
) {
    const timeoutIdRef = useRef(null)
    useEffect(() => {
        let _stopped = false
            // Side note: preceding semicolon needed for IIFEs.
            ; (async function pollingCallback() {
                try {
                    await asyncCallback()
                } finally {
                    // Set timeout after it finished, unless stopped
                    timeoutIdRef.current = !_stopped && setTimeout(
                        pollingCallback,
                        interval
                    )
                }
            })()
        // Clean up if dependencies change
        return () => {
            _stopped = true // prevent racing conditions
            clearTimeout(timeoutIdRef.current)
            onCleanUp()
        }
    }, [...dependencies, interval])
}

