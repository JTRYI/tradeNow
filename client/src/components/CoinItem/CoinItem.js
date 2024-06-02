import React from 'react'
import './CoinItem.css'
import { Stat, StatArrow } from '@chakra-ui/react'

const CoinItem = (props) => {
    return (
        <div className='coin-row'>
            <p>{props.coins.market_cap_rank}</p>
            <div className='img-symbol'>
                <img src={props.coins.image} alt='' />
                <p>{props.coins.symbol.toUpperCase()}</p>
            </div>
            <p>${props.coins.current_price.toLocaleString()}</p>
            <p>
                <Stat><StatArrow type={props.coins.price_change_percentage_24h.toFixed(1) >= 0 ? 'increase' : 'decrease'} />
                    {props.coins.price_change_percentage_24h.toFixed(1)} %
                </Stat>
            </p>
            <p className='hide-mobile'>${props.coins.total_volume.toLocaleString()}</p>
            <p className='hide-mobile'>${props.coins.market_cap.toLocaleString()}</p>

        </div>
    )
}

export default CoinItem
