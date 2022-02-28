import {useContext} from "react"
import {RouterContext} from "../src/Router"

// useContext 获取 上下文中的 location 对象
export default function useLocation() {
    return useContext(RouterContext).location
}