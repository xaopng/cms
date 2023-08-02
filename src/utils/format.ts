import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function formatUTC(utcStr: string, format = 'YYYY/MM/DD HH:mm:ss') {
  const resTime = dayjs.utc(utcStr).utcOffset(8).format(format)
  return resTime
}
