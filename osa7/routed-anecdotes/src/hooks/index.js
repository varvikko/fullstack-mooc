const { useState } = require("react");

export function useField(type) {
    var [value, setValue] = useState('')

    var onChange = event => setValue(event.target.value)

    var reset = () => setValue('')

    return {
        type, value, onChange, reset
    }
}