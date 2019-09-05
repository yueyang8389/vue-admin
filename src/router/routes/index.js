import memberRoutes from './member'
import financeRoutes from './finance'
import agencyRoutes from './agency'
import reportRoutes from './report'
import lotteryRoutes from './lottery'
// import systemRoutes from './member'

const allRoutes = {
    member: {...memberRoutes },
    finance: {...financeRoutes },
    agency: {...agencyRoutes },
    report: {...reportRoutes },
    lottery: {...lotteryRoutes }
    // system: [...systemRoutes]
}

export default allRoutes