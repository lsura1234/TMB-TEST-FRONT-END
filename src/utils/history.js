import { createBrowserHistory } from 'history'
import packageJSON from '../../package.json'

const history = createBrowserHistory({
  basename: packageJSON.homepage
})
export default history
