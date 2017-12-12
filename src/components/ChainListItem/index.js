import React from "react"
import "./style.css"

const ChainListItem = function (props) {

    const chain = props.chain;
    const chainSelected = props.selected;
    const onClick = props.onClick;
    let classes = "chain-list-item-container"

    if (chainSelected) {
        classes += " " + "chain-list-item-selected"
    }

    return <li onClick={onClick} className={classes}>{chain.name}</li>

}

export default ChainListItem;