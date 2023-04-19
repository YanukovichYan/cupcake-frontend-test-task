import { MarketsResponseData } from '@/api'
import { host } from '@/config'

const createApi = () => {
  // const get = async <TResponseData = unknown>(url = ''): Promise<TResponseData> => {
  const get = async <TResponseData = unknown>(url = ''): Promise<any> => {
    const requestUrl = `${host}/${url}`

    try {
      const res = await fetch(requestUrl)

      if ((res.status >= 200 || res.status < 300) && res.ok && res.statusText === 'OK') {
        return (await res.json()) as TResponseData
      }

      throw new Error(res.statusText)
    } catch (err: unknown) {
      console.error(err)
    }
  }

  return {
    first: <TResponseData>() => get<TResponseData>('first'),
    firstPoll: () => get<MarketsResponseData>('first/poll'),
    second: <TResponseData>() => get<TResponseData>('second'),
    secondPoll: () => get<MarketsResponseData>('second/poll'),
    third: <TResponseData>() => get<TResponseData>('third'),
    thirdPoll: () => get<MarketsResponseData>('third/poll'),
  }
}

export default createApi()
