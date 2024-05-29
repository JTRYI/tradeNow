import React from 'react'
import CoinItem from '../CoinItem/CoinItem'
import './Coins.css'
import { Link } from 'react-router-dom'
import Coin from '../../screens/Coin/Coin'

const Coins = (props) => {
    return (
        <div className='container'>

            <div>
                <div className='heading'>
                    <p>#</p>
                    <p className='coin-name'>Coin</p>
                    <p>Price (SGD)</p>
                    <p>24H</p>
                    <p className='hide-mobile'>Volume</p>
                    <p className='hide-mobile'>Market Cap</p>
                </div>

                {props.coins.map(coins => {
                    return (
                        <Link to= {`/coin/${coins.id}`} element={<Coin/>} key={coins.id}>
                            <CoinItem coins={coins} />
                        </Link>
                    )
                })}
            </div>

        </div>
    )
}

export default Coins
