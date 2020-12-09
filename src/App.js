import React, {useState, useEffect} from 'react';
import { Select, FormControl, MenuItem, Card, CardContent, Typography } from '@material-ui/core';
import './App.css';
import DenseAppBar from './components/NavBar';
import Cards from './components/Cards';
import Table from './components/Table';
import { sortData, prettyPrint } from './util';
import Graph from './components/Graph';

function App() {

const [countries, setCountries] = useState([]);
const [country, setCountry] = useState('worldwide');
const [countryInfo, setCountryInfo] = useState({});
const [tableData, setTableData] = useState([]);
const [casesType, setCasesType] = useState("cases");

useEffect(()=>{
  fetch('https://disease.sh/v3/covid-19/all')
  .then(response => response.json())
  .then(data=> {
    setCountryInfo(data)
  });
},[])

useEffect(()=>{
    const getCountriesdata = async ()=> {
        const response = await fetch('https://disease.sh/v3/covid-19/countries');
        const data = await response.json();
        const countries = data.map((country)=> (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        let sortedData = sortData(data)
        setCountries(countries); 
        setTableData(sortedData);
    }

    getCountriesdata();
},[]);

const countryChange = async (event)=> {
  const countryCode = event.target.value;
  //setCountry(countryCode);

  const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

  const response = await fetch(url);
  const data= await response.json();
  setCountryInfo(data); 
  setCountry(countryCode);
}
  return (
    
    <div className="App">
      <div className="app_left">
{/* Header */}
<DenseAppBar />
      
      
      <div className="app_header">
        <FormControl className='app_dropdown'>
          <Select variant="outlined" 
          className="select"
          onChange={countryChange}
          value={country}>
          <MenuItem value="worldwide">worldwide</MenuItem>
            {
              countries.map(country=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              )
                )
            }

          </Select>
        </FormControl>
      </div>
     {/* Cards */}
      <div className="app_info">
        <Cards isRed active={casesType === "cases"} onClick={e => setCasesType('cases')} title="Infected cases" total={prettyPrint( countryInfo.cases)} cases= {prettyPrint(countryInfo.todayCases) }/>

        <Cards active={casesType === "recovered"} onClick={e => setCasesType('recovered')} title="Recovered" total={prettyPrint(countryInfo.recovered)} cases= {prettyPrint(countryInfo.todayRecovered) }/>

        <Cards isRed active={casesType === "deaths"} onClick={e => setCasesType('deaths')} title="Deaths" total={prettyPrint( countryInfo.deaths)} cases= {prettyPrint(countryInfo.todayDeaths)}/>
      </div>

     

      
    
      {/* Country dropdown */}

      {/* Charts */}
      <div className="graph">
      <h3>Worldwide new {casesType}</h3>
      <Graph casesType= {casesType}/>

      </div>
          

      </div>
       <Card className="app_right">
         <CardContent>
           <h3>Live cases by country</h3>
           <Table countries = {tableData}></Table>
         </CardContent>
       </Card>
    </div>
  );
}

export default App;
