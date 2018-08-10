import request from '@/axios'

export function luckies (network) {
  return request.axiosRequset({
    url: `/fp3d/luckies`,
    method: 'get'
  })
    .then(_rsp => {
      const data = _rsp
      if (data.code !== 0) {
        return Promise.reject(data.code)
      } else {
        return Promise.resolve(data.data)
      }
    })
}

export function players(network) {
  return request.axiosRequset({
    url: `/fp3d/random_players`,
    method: 'get'
  })
    .then(_rsp => {
      const data = _rsp
      if (data.code !== 0) {
        return Promise.reject(data.code)
      } else {
        return Promise.resolve(data.data)
      }
    })
}
