import { createVNode, render } from 'vue'

const renderComponent = ({ el, appContext, component, props }: any) => {
  const vnode = createVNode(component, props)

  return {
    render() {
      vnode.appContext = { ...appContext }
      if (vnode.props != undefined) {
        vnode.props.destroy = () => {
          render(null, el)
          // vnode = undefined
        }
        render(vnode, el)
      }
    },
  }
}

interface Options {
  text: string, 
  ok: {
    label: string,
    callback: () => void
  }, 
  cancel: {
    label: string
  }
}

const _confirm = async (instance: any, options: Options) => {
  const el = instance.root.refs['main']
  const appContext = instance.appContext
  const renderComp = renderComponent({
    el,
    appContext,
    component: (await import('@/components/common/Confirm.vue')).default,
    props: {
      options,
    },
  })

  renderComp.render()
}

const lpad = (value: string | number) => {
  if (value >= 10) {
    return value
  }

  return `0${value}`
}

const dateToStringFormat = (source = new Date(), delimiter = '.') => {
  const year = source.getFullYear()
  const month = lpad(source.getMonth() + 1)
  const day = lpad(source.getDate())

  return [year, month, day].join(delimiter)
}

const getWeekNumber = (dateFrom = new Date()) => {
  // 해당 날짜 (일)
  const currentDate = dateFrom.getDate()

  // 이번 달 1일로 지정
  const startOfMonth = new Date(dateFrom.setDate(1))

  // 이번 달 1일이 무슨 요일인지 확인
  const weekDay = startOfMonth.getDay() // 0: Sun ~ 6: Sat

  // ((요일 - 1) + 해당 날짜) / 7일로 나누기 = N 주차
  return Math.floor((weekDay - 1 + currentDate) / 7) + 1
}

const stringToDate = (str: string) => {
  if (str.includes('.')) {
    const ymds = str.split('.').map(s => Number(s))
    return new Date(ymds[0], ymds[1]-1, ymds[2])
  } else if (str.includes('-')) {
    const ymds = str.split('-').map(s => Number(s))
    return new Date(ymds[0], ymds[1]-1, ymds[2])
  }
}

export { _confirm, dateToStringFormat, getWeekNumber, stringToDate }
