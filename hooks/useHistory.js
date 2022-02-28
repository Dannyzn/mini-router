import {useContext} from "react"
import { RouterContext } from "../src/Router"

// useContext 获取上下文中的 history 对象
export default function useHistory() {
    return useContext(RouterContext)
}