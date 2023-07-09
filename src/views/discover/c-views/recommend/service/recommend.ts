import hyRequest from "@/service";

export function getBanners() {
  return hyRequest.get({
    url:'/banner'
  })
}

export function getHotRecommends(limit:number) {
  return hyRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getNewAlbum() {
  return hyRequest.get({
    url:'/album/newest'
  })
}

export function getTopRanking(id: number) {
  return hyRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getArtistList(limit:number) {
  return hyRequest.get({
    url: 'artist/list',
    params: {
      limit
    }
  })
}
