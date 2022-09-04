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

export { _confirm, dateToStringFormat }
