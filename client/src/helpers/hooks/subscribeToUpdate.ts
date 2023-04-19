import { api } from '@/api'

const subscribeToUpdateFirstApi = () => api.firstPoll()

const subscribeToUpdateSecondApi = () => api.secondPoll()

const subscribeToUpdateThirdApi = () => api.thirdPoll()

export { subscribeToUpdateFirstApi, subscribeToUpdateSecondApi, subscribeToUpdateThirdApi }
