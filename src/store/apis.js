
import reauest from '../utils/request'

export async function getBanner () {
  const result = await reauest.get({ url: 'banner?type=1' })
  return result
}

/**
 * 推荐歌单
 *
 * @export
 * @returns
 */
export async function getPersonalized () {
  const result = await reauest.get({ url: 'personalized?limit=6' })
  return result
}

/**
 * 榜单摘要
 *
 * @export
 * @returns
 */
export async function getToplist () {
  const result = await reauest.get({url: 'toplist/detail'})
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
  const result = await reauest.get({url: 'top/list?idx=' + type})
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
  const result = await reauest.get({url: 'playlist/detail?id=' + id})
  return result
}

/**
 *
 * 获取歌曲内容
 * @export
 * @param {*} type
 * @returns
 */
export async function getSongDetail (idsArr) {
  const ids = idsArr.join(',')
  const result = await reauest.get({
    url: 'song/detail?ids=' + ids
  })
  return result
}
/**
 *
 * 获取专辑内容
 * @export
 * @param {*} type
 * @returns
 */
export async function getAlbumDetail (id) {
  const result = await reauest.get({
    url: 'album?id=' + id
  })
  return result
}
/**
 *获取歌曲url
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

/**
 *获取歌曲歌词
 *
 * @export
 * @param {*} type
 * @returns
 */
export async function getSongLyric (id) {
  const result = await reauest.get({
    url: 'lyric?id=' + id
  })
  return result
}

/**
 *获取歌曲评论
 *
 * @export
 * @param {*} type
 * @returns
 */
export async function getComment (id, limit = 20, offset) {
  let param = 'id=' + id + '&limit=' + limit
  if (offset) {
    param = 'id=' + id + '&limit=' + limit + '&offset=' + offset
  }
  const result = await reauest.get({
    url: 'comment/music?' + param
  })
  return result
}
/**
 *获取歌曲热评
 *
 * @export
 * @param {*} type
 * @returns
 */
export async function getHotComment (id, type = 0, limit = 20, offset = 1) {
  const result = await reauest.get({
    url: 'comment/hot?id=' + id + '&type=' + type + '&limit=' + limit + '&offset=' + offset
  })
  return result
}
