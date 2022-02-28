import React , { useContext } from 'react'
import { matchPath } from 'react-router'
import { RouterContext } from './Router'

function Route(props) {
    const context = useContext(RouterContext);
    // 获取 location 对象
    const location = props.location || context.location;
    // 是否匹配当前的路由 如果父元素有switch 就会传入 computedMatch 来精确匹配渲染此路由 ???
    const match = props.computedMatch ? props.computedMatch
                  : props.path ? matchPath(location.pathname.props) : context.match
    
   // 这个 props 用于传递给路由组件
   const newRouterProps = {...context, location, match}
   let {children, component, render} = props
   // 有没有子路由
   if (Array.isArray(children) && children.length === 0) children = null;
   let renderChildren = null;
   if (newRouterProps.match) {
       if (children) {
            // 当 router 是 props children的形式  或者 render props
            renderChildren = typeof children === 'function' ? children(newRouterProps) : children;
        } else if (component) {
            // 当router 有 component 属性
            renderChildren = React.createElement(component, newRouterProps)
        } else if (render) {
            renderChildren = render(newRouterProps)
        } 
   }
   // 逐层传递上下文 
   return <RouterContext.Provider value={newRouterProps}>{renderChildren}</RouterContext.Provider>
}

export default Route;