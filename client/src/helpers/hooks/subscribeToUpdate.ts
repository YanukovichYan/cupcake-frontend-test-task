import { api } from '@/api'

const subscribeToFirstApi = async <TResponseData>() => {
  const { data } = await api.firstPoll<TResponseData>()

  return data
}

const subscribeToSecondApi = async <TResponseData>() => {
  const { data } = await api.secondPoll<TResponseData>()

  return data
}

const subscribeToThirdApi = async <TResponseData>() => {
  const { data } = await api.thirdPoll<TResponseData>()

  return data
}

export { subscribeToFirstApi, subscribeToSecondApi, subscribeToThirdApi }
