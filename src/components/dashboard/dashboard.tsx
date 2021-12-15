import {DataType} from "../utils/utils";
import {FC} from "react";


const ApplicationCard: FC<{ card: DataType }> = ({card}) => {

    return <div className='dashboard-card mr-2 mb-2'>
        <div>
            <div className='mb-1'><b>{card.name}</b></div>
            <div>Total spend: {card.spend}</div>
        </div>
    </div>
}

type DashboardProps = {
    name: string,
    spendingLimit: number,
    data: DataType[],
}
const Dashboard: FC<DashboardProps> = ({name, spendingLimit, data}) => {

    const renderApplicationData = () => {
        const cards = [...data]
            .filter(entry => entry.spend <= spendingLimit)
            .map((entry, index) => {
                return <div key={index}>
                    <ApplicationCard card={entry}/>
                </div>
            });

        return <div className='dashboard-card-container'>
            {cards}
        </div>
    }

    return <div>
        <h2>Dashboard</h2>
        <h3 className='mb-2'>{name}</h3>
        {renderApplicationData()}
    </div>
}

export default Dashboard;