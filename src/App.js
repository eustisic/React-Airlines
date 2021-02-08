import React, { useState } from 'react';
import './App.css';
import { getAirlineById, getAirportByCode } from './data.js'
import DATA from './data.js';
import Table from './components/Table';
import Select from './components/Select';
import RouteMap from './components/Map';

const formatValue = (property, value) => {
  if (property === "airline") {
    return getAirlineById(value).name;
  } else {
    return getAirportByCode(value).name;
  }
}

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

const App = () => {
  const [selected, setSelected] = useState(DATA.routes);
  const [filteredAirports, setFilteredAirports] = useState(DATA.airports);
  const [filteredAirlines, setFilteredAirlines] = useState(DATA.airlines);
  const [airline, setAirline] = useState("all")
  const [airport, setAirport] = useState("all")

  const selectAirline = (value) => {
    setAirline(value)
    if (value === "all") {
      setSelected(DATA.routes);
      setFilteredAirports(DATA.airports)
    } else {
      setSelected(DATA.routes.filter(route => route.airline === Number(value)));
      filterAirports(Number(value));
    }
  }

  const selectAirport = (value) =>  {
    setAirport(value)
    if (value === "all") {
      setSelected(DATA.routes);
      setFilteredAirlines(DATA.airlines);
    } else {
      setSelected(DATA.routes.filter(route => route.dest === value || route.src === value))
      filterAirlines(value);
    }
    
  }

  const filterAirports = (id) => {
    let routes = DATA.routes.filter(route => route.airline === id).map(route => [route.src, route.dest]).flat();
    let airports = DATA.airports.filter(port => routes.includes(port.code));

    setFilteredAirports(airports)
  }

  const filterAirlines = (code) => {
    let routes = DATA.routes.filter(route => route.src === code || route.dest === code).map(route => route.airline);
    let airlines = DATA.airlines.filter(line => routes.includes(line.id));

    setFilteredAirlines(airlines)
  }

  const handleClear = () => {
    setSelected(DATA.routes);
    setAirline("all");
    setAirport("all")
    setFilteredAirlines(DATA.airlines);
    setFilteredAirports(DATA.airports);
  }

  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <RouteMap selected={selected}/>
    </section>
    <section>
    <Select 
      options={filteredAirlines} 
      valueKey="id" 
      titleKey="name"
      allTitle="Airlines" 
      value={airline}
      handleSelect={selectAirline} />
    <Select 
      options={filteredAirports} 
      valueKey="code" 
      titleKey="name"
      allTitle="Airports" 
      value={airport} 
      handleSelect={selectAirport} />
    <button className="clear" onClick={() => handleClear()}>Clear</button>
    </section>
    <section>
      <Table 
        className="routes-table" 
        columns={columns} 
        rows={selected} 
        format={formatValue} 
      />
    </section>
  </div>
  )
}

export default App;