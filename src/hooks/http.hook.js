import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method, body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok){
                throw new Error(data.message || "Something go wrong")
            }

            setLoading(false)

            return data
        } catch (err) {
            setLoading(false)
            setError(err.message)
            throw err
        }
    }, [])

    const clearErrors = () => setError(null)

    return {loading, request, error, clearErrors}
}