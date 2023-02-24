import createStore from '../store/createStore'
import { ActionType, ContextSchema } from "./AuthenticationContextTypes";

export default createStore<ActionType, ContextSchema>({name: 'Authentication'})
