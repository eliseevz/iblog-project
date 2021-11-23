export function validator(data, config) {
    const errors = {}

    const validate = (method, data, config) => {
        let statusValidate
        switch (method) {
            case "isRequired": {
                statusValidate = data.trim() === ""
                break
            }
            case "hasNumber": {
                const digitRexExp = /\d+/g
                statusValidate = !digitRexExp.test(data)
                break
            }
            case "min": {
                statusValidate = data.length < config.value
                break
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g
                statusValidate = !emailRegExp.test(data)
                break
            }
            default:
                break
        }
        if (statusValidate) return config.message
    }

    for (const fieldName in data) {
        for (const method in config[fieldName]) {
            const error = validate(method, data[fieldName], config[fieldName][method])
            if (error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        }
    }

    return errors
}