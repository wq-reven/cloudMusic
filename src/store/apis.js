
import reauest from '../utils/request'

export async function getBanner () {
  const result = await reauest.get({
    url: 'banner?type=1'
  })
  return result
}

/**
 * 推荐歌单
 *
 * @export
 * @returns
 */
export async function getPersonalized () {
  const result = await reauest.get({
    url: 'personalized?limit=6'
  })
  return result
}

/**
 * 榜单摘要
 *
 * @export
 * @returns
 */
export async function getToplist () {
  const result = await reauest.get({
    url: 'toplist/detail'
  })
  return result
}

/**
 *榜单详情
 *
 * @export
 * @param {*} type
 * @returns
 */
export async function getToplistDetail (type) {
  const result = await reauest.get({
    url: 'top/list?idx=' + type
  })
  return result
}

/**
 *榜单详情
 *
 * @export
 * @param {*} type
 * @returns
 */
export async function getPlayListDetail (id) {
  const result = await reauest.get({
    url: 'playlist/detail?id=' + id
  })
  return result
}

/**
 *榜单详情
 *
 * @export
 * @param {*} type
 * @returns
 */
export async function getSongUrl (id) {
  const result = await reauest.get({
    url: 'song/url?id=' + id
  })
  return result
}
