import { kickUser } from '../redux/userReducer'
import queryString from 'query-string'
import { apexChartsLocalization } from './localization'

export const getAvatarName = (name) => {
  return name.substr(0, 2)
}

export const getTimer = (dataFinish) => {
  const current = new Date()
  const finish = new Date(dataFinish)
  // seconds accurate
  return Math.round((finish.getTime() - current.getTime()) / 1000) * 1000
}

export const getTimerString = (timer) => {
  const day = parseInt(timer / (60 * 60 * 1000 * 24))
  let hour = parseInt(timer / (60 * 60 * 1000)) % 24
  if (day !== 0) hour += day * 24
  if (hour < 10) {
    hour = '0' + hour
  }

  let min = parseInt(timer / (1000 * 60)) % 60
  if (min < 10) {
    min = '0' + min
  }

  let sec = parseInt(timer / 1000) % 60
  if (sec < 10) {
    sec = '0' + sec
  }

  return `${hour}:${min}:${sec}`
}

export const num2str = (n, textForms) => {
  n = Math.abs(n) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) {
    return textForms[2]
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1]
  }
  // eslint-disable-next-line eqeqeq
  if (n1 == 1) {
    return textForms[0]
  }
  return textForms[2]
}

export function getFormData (formData, data, previousKey) {
  if (data instanceof Object) {
    Object.keys(data).forEach(key => {
      const value = data[key]
      if (value instanceof Object && !(value instanceof File) && !Array.isArray(value)) {
        return getFormData(formData, value, key)
      }
      if (previousKey) {
        key = `${previousKey}[${key}]`
      }
      if (Array.isArray(value)) {
        value.forEach((val, index) => {
          if (val instanceof Object && !Array.isArray(val)) {
            return getFormData(formData, val, `${key}[${index}]`)
          }
          formData.append(`${key}[]`, val)
        })
      } else {
        formData.append(key, value)
      }
    })
  }
}

export const imageAcceptTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/svg+xml'
]
export const importAcceptTypes = ['text/xml']

export const downloadFile = (data, fileName) => {
  const blob = new Blob([data], { type: 'text/xml' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const changeObjectInArray = (items, itemId, objPropName, newObj) => {
  return items.map(u => {
    if (u[objPropName] === itemId) {
      return newObj
    }
    return u
  })
}

export const getDoublePaginationsUrlParams = (
  linkPageName,
  anotherPage,
  anotherPageName,
  locationPathname,
  locationSearch
) => {
  let mainPath = locationPathname
  if (anotherPage === 1) {
    linkPageName = '?' + linkPageName
  } else {
    mainPath += `?${anotherPageName}=${+queryString.parse(locationSearch)[anotherPageName]}`
    linkPageName = '&' + linkPageName
  }
  return { mainPath, linkPageName }
}

export const roundToTwo = (num) => {
  const m = Number((Math.abs(num) * 100).toPrecision(15))
  return Math.round(m) / 100 * Math.sign(num)
}

const errorInArrayOfString = errors => {
  return Object.values(errors).flat()
}

export const thunkErrorHandler = (e, dispatch) => {
  if (e?.response?.status === 401 && e.response?.config?.url === 'oauth/token/refresh') {
    console.log('refresh_token is invalid')
    kickUser(dispatch)
  } else {
    throw e
  }
}

export const validationErrorHandler = (e) => {
  if (e.response && e.response.status === 422 && e.response.data) {
    return errorInArrayOfString(e.response.data.errors)
  }
  throw e
}

export const badRequestErrorHandler = (e) => {
  if (e.response && e.response.status === 400 && e.response.data) {
    return e.response.data.message
  }
  throw e
}

export const validationErrorHandlerFormik = (e) => {
  if (e.response && e.response.status === 422 && e.response.data) {
    return Object.fromEntries(Object.entries(e.response.data.errors).map(x => {
      x[1] = x[1].join(' ')
      return x
    }))
  }
  throw e
}

export const ApexOptions = (
  theme,
  id,
  titleText,
  xaxis = {},
  yaxisTitleText = undefined,
  tooltip = {}
) => {
  return {
    options: {
      colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main],
      chart: {
        id: id,
        background: theme.palette.background.default,
        animations: {
          enabled: false
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          tools: {
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        },
        defaultLocale: 'ua',
        locales: [apexChartsLocalization]
      },
      xaxis: xaxis,
      yaxis: {
        title: {
          text: yaxisTitleText
        }
      },
      theme: {
        mode: theme.palette.type,
        palette: 'palette1'
      },
      title: {
        text: titleText,
        align: 'center'
      },
      tooltip: tooltip,
      dataLabels: {
        enabled: false
      },
      legend: {
        onItemClick: {
          toggleDataSeries: false
        }
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: theme.palette.primary.main,
            lower: theme.palette.success.main
          }
        },
        heatmap: {
          shadeIntensity: 1,
          colorScale: {
            ranges: [
              {
                from: -0.0999999,
                to: 0,
                color: theme.palette.primary.main,
                name: 'Відсутня (негативна)'
              },
              {
                from: 0,
                to: 0.0999999,
                color: theme.palette.primary.main,
                name: 'Відсутня (позитивна)'
              },
              {
                from: -0.299999,
                to: -0.1,
                color: theme.palette.primary.main,
                name: 'Низька (негативна)'
              },
              {
                from: 0.1,
                to: 0.299999,
                color: theme.palette.primary.main,
                name: 'Низька (позитивна)'
              },
              {
                from: -0.499999,
                to: -0.3,
                color: theme.palette.secondary.main,
                name: 'Середня (негативна)'
              },
              {
                from: 0.3,
                to: 0.499999,
                color: theme.palette.secondary.main,
                name: 'Середня (позитивна)'
              },
              {
                from: -1,
                to: -0.5,
                color: theme.palette.success.main,
                name: 'Висока (негативна)'
              },
              {
                from: 0.5,
                to: 1,
                color: theme.palette.success.main,
                name: 'Висока (позитивна)'
              }
            ]
          }
        }
      }
    }
  }
}

export const isObjectEmpty = (obj) => {
  return !obj ||
    (Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype)
}

export const getApexChartBarChartSeries = (seriesName, seriesData) => (
  seriesName.map((i, k) => ({
    name: i,
    data: seriesData[k]
  }))
)

export const getApexChartHeatmapSeries = (seriesData) => (
  seriesData.map(x => ({
    name: x[0],
    data: Object.entries(x[1]).map(i => ({ x: i[0], y: i[1] }))
  }))
)

export const getApexChartBoxplotSeries = (seriesBoxData, seriesOutliersData) => {
  let boxData = seriesBoxData.map((x, index) => ({
    x: index + 1,
    y: [x.min, x['25%'], x['50%'], x['75%'], x.max]
  }))

  // fix error when one box plot and multiple scatter values
  boxData = [{ x: 0, y: [] }, ...boxData, { x: seriesBoxData.length + 1, y: [] }]

  return [
    {
      name: 'box',
      type: 'boxPlot',
      data: boxData
    },
    {
      name: 'outliers',
      type: 'scatter',
      data: seriesOutliersData.map((x, index) => {
        let i = 0
        const result = []
        const outliersLength = x.length
        while (i < outliersLength) {
          result[i] = {
            x: index + 1,
            y: x[i]
          }
          i++
        }
        return result.length !== 0 ? result : []
      }).flat()
    }
  ]
}
