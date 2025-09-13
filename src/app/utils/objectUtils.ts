/* eslint-disable @typescript-eslint/no-explicit-any */

export function mapObjectToUrlParams<T extends Record<string, any>>(
    obj: T
  ): string {
    const searchParams = new URLSearchParams()
    Object.keys(obj).forEach((key) => {
      const value = obj[key as keyof T]
      if (typeof value === 'boolean') {
        searchParams.append(key, value)
        return
      }
      if (value) {
        searchParams.append(key, value.toString())
      }
    })
  
    return searchParams.toString()
  }

  