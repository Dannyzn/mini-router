import React, { useCallback, useState , useEffect ,createContext, useMemo  } from 'react'
import { createBrowserHistory as createHistory  } from 'history'

export const RouterContext = createContext()
export let rootHistory = null;

export default function Router(props) {
    // 缓存 history 属性
    const history = useMemo(() => {
        rootHistory = createContext();
        return rootHistory;
    }, [])

    const [location, setLocation] = useState(history.location);

    useEffect(() => {
        // 监听 location的 变化通知更新
        const unListen = history.listen(location => {
            setLocation(location)
        })
        return function() {
            // 销毁函数
            unListen && unListen()
        }
    }, [])

    return <RouterContext.Provider
        value={{
            location,
            history,
            match: { path: '/', url: '/', params: {}, isExact: location.pathname === '/'}
        }}
    >
        {props.children}
    </RouterContext.Provider>
}

