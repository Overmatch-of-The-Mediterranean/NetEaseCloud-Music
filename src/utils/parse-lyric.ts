
export interface ILyric {
  time: number,
  text:string
 }

 // [00:49.840]像我这样寻找的人
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString: string) {
  const lines: string[] = lyricString.split('\n')

  const lyrics:ILyric[] = []
  for (const line of lines) {
    const result = timeRegExp.exec(line)

    if (!result) continue

    const time1 = Number(result[1]) * 60 * 1000
    const time2 = Number(result[2]) * 1000
    // const time3 = result[3].length === 2 ? Number(result[3]) * 10 : Number(result[3])
     const time3 = result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10

    // 歌词对应时间（毫秒）
    const time = time1 + time2 + time3

    // 歌词文本
    const text = line.replace(timeRegExp, '')

    lyrics.push({ time, text })

  }

  return lyrics
}
