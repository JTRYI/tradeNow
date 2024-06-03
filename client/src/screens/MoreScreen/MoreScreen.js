import React from 'react'
import './MoreScreen.css'
import MyNavbar from '../../components/MyNavbar/MyNavbar'
import News from '../../components/News/News'

const MoreScreen = () => {

    return (
        <div className='more-screen'>
            <MyNavbar />
            <News/>
        </div>
    )
}

export default MoreScreen
