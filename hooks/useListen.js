import { useEffect } from "react"
import { rootHistory } from "../src/Router"

// 监听路由的变化

function useListen(cb) {
    useEffect(() => {
        // 如果 rootHistory 不存在
        if (!rootHistory) return () => {}
        // 绑定路由事件监听器
        const unlisten = history.listen((location) => {
            cb && cb(location)
        })
        return function() {
            unlisten && unlisten()
        }
    }, [])
}

export default useListen