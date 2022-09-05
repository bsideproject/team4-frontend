import { createVNode, render } from 'vue'

const renderComponent = ({ el, appContext, component, props }) => {
  let vnode = createVNode(component, props)

  return {
    render() {
      vnode.appContext = { ...appContext }
      vnode.props.destroy = () => {
        render(null, el)
        vnode = undefined
      }
      render(vnode, el)
    },
  }
}

const _confirm = async (instance, options) => {
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

const lpad = (value) => {
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
  return parseInt((weekDay - 1 + currentDate) / 7) + 1
}

export { _confirm, dateToStringFormat, getWeekNumber }
