import React, {useEffect, useState} from "react";
import Dashboard from "./components/dashboard/dashboard";
import Navigation from "./components/navigation/navigation";
import SpendingSlider, {MAX_SPENDING} from "./components/navigation/spending-slider";
import {DataType} from "./components/utils/utils";
import './app.css'

const App = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [selectedData, setSelectedData] = useState<DataType[]>([]);
    const [selectedName, setSelectedName] = useState<string>('');
    const [spendingLimit, setSpendingLimit] = useState<number>(MAX_SPENDING)

    const loadData = async () => {
        try {
            let response = await fetch('/data');
            let data = await response.json();
            setData(data);
        } catch (error) {
            console.log('Error', JSON.stringify(error));
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    const handleOnMenuSelection = (name: string, data: DataType[]) => {
        setSelectedData(data);
        setSelectedName(name);
    }

    const handleOnSpendingChange = (amount: number) => {
        setSpendingLimit(amount);
    }

    if (!data) return null;

    return (
        <div>
            <h1>Pharos Coding Exercise</h1>
            <div className='app-container'>

                <div className='navigation-container box-white'>
                    <Navigation data={data} onClick={handleOnMenuSelection}/>
                    <hr className='my-3 black'/>
                    <h2 className='mt-2'>Filters</h2>
                    <SpendingSlider onSpendingChange={handleOnSpendingChange}/>
                </div>

                <div className='dashboard-container box-white'>
                    <Dashboard spendingLimit={spendingLimit} name={selectedName} data={selectedData}/>
                </div>
            </div>
        </div>
    );
}

export default App;
