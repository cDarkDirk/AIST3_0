import React from "react";
import ChainListItem from "../ChainListItem";

const ChainList = ({chainTemplates, selectedChainTemplate, chainSelected}) => {
    return (<ul>
        {
            chainTemplates.map((chain, index) => {
                return <ChainListItem onClick = {()=>chainSelected(index)} chain={chain} selected = {index == selectedChainTemplate}></ChainListItem>
            })
        }
    </ul>);

}
export default ChainList;
