import React from "react";
import ChainListItem from "../ChainListItem";

const ChainList = ({chainTemplates, selectedChain, chainSelected}) => {
    return (<ul>
        {
            chainTemplates.map((chain, index) => {
                return <ChainListItem onClick = {()=>chainSelected(index)} chain={chain} selected = {index == selectedChain}></ChainListItem>
            })
        }
    </ul>);

}
export default ChainList;
