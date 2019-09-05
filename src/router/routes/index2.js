import memberRoutes from './member2'
import financeRoutes from './finance2'
import agencyRoutes from './agency2'
import reportRoutes from './report2'
import lotteryRoutes from './lottery2'
// import systemRoutes from './member'

const allRoutes = {
  member: [ ...memberRoutes ],
  finance: [ ...financeRoutes ],
  agency: [ ...agencyRoutes ],
  report: [ ...reportRoutes ],
  lottery: [...lotteryRoutes]
  // system: [...systemRoutes]
}

export default allRoutes
