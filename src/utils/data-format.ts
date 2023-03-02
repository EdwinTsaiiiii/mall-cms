import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATA_FORMAT_DEFAULT = 'YYYY-MM-DD hh:mm:ss'

export function formatUTCString(
  UTCString: string,
  format: string = DATA_FORMAT_DEFAULT
) {
  return dayjs.utc(UTCString).utcOffset(8).format(format)
}

export function formatTimeStamp(
  timeStamp: string,
  format: string = DATA_FORMAT_DEFAULT
) {
  return ' '
}
