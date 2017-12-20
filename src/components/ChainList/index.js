import React from "react";
import ChainListItem from "../ChainListItem";

const ChainList = ({chainTemplates, selectedChainTemplate, selectChainTemplate}) => {
    return (<ul>
        {
            chainTemplates.map((chain, index) => {
                return <ChainListItem onClick = {()=>selectChainTemplate(index)} chain={chain} selected = {index === selectedChainTemplate}/>
            })
        }
    </ul>);

}
export default ChainList;
