import React from "react";
import ChainListItem from "../ChainListItem";

const ChainList = function (props) {
    const chains = props.chains || [];
    const selectedChain = props.selectedChain;
    const chainSelected = props.chainSelected;

    return (<ul>
        {
            chains.map((chain, index) => {

                return <ChainListItem onClick = {()=>chainSelected(index)} chain={chain} selected = {index == selectedChain}></ChainListItem>
            })

        }
    </ul>);

}
export default ChainList;