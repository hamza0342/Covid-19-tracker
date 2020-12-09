import React from 'react';
import numeral from 'numeral';

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000
    }, 
};
export const sortData = data => {
    const sortedData = [...data]
    sortedData.sort((a,b) => {
        if (a.cases > b.cases){
            return -1
        }
        else
        {return 1}
    })
    return sortedData;
}

export const prettyPrint = (stat) => 
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";
