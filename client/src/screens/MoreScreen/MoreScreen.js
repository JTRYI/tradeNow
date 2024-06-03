import React from 'react'
import './MoreScreen.css'
import MyNavbar from '../../components/MyNavbar/MyNavbar'
import News from '../../components/News/News'
import MarketStatus from '../../components/MarketStatus/MarketStatus'
import MarketHolidays from '../../components/MarketHolidays/MarketHolidays'
import BtcSocialStats from '../../components/BtcSocialStats/BtcSocialStats'
import EthSocialStats from '../../components/EthSocialStats/EthSocialStats'

const MoreScreen = () => {

    return (

        <div>
            <MyNavbar />
            <div className='more-body'>
                <News />
                <div className='right-side'>
                    <div className='market-related'>
                        <div className='marketNSocial'>
                            <MarketStatus />
                            <BtcSocialStats />
                            <EthSocialStats />
                        </div>
                        <MarketHolidays />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreScreen
