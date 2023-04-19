import { ResponseData } from '@/api'
import { host } from '@/config'

const createApi = () => {
  const get = async <TResponseData = unknown>(
    url: string = '',
  ): Promise<ResponseData<TResponseData>> => {
    const requestUrl: string = `${host}/${url}`

    try {
      const res: Response = await fetch(requestUrl)
      const data = await res.json()

      if (
        (res.status >= 200 || res.status < 300) &&
        res.ok &&
        res.statusText === 'OK'
      ) {
        return {
          data,
          error: null,
        }
      } else {
        if ('error' in data) {
          return {
            data: null,
            error: data,
          }
        }
      }

      throw new Error(data.message)
    } catch (err: unknown) {
      if (typeof err === 'string') {
        return {
          data: null,
          error: err,
        }
      }

      if (err instanceof Error) {
        return {
          data: null,
          error: err.message,
        }
      }

      return {
        data: null,
        error: 'Unknown error',
      }
    }
  }

  return {
    first: <TResponseData>() => get<TResponseData>('first'),
    firstPoll: <TResponseData>() => get<TResponseData>('first/poll'),
    second: <TResponseData>() => get<TResponseData>('second'),
    secondPoll: <TResponseData>() => get<TResponseData>('second/poll'),
    third: <TResponseData>() => get<TResponseData>('third'),
    thirdPoll: <TResponseData>() => get<TResponseData>('third/poll'),
  }
}

export default createApi()
