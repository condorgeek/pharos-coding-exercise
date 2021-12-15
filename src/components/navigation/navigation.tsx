import React, {FC, useState} from "react";
import {buildMenuLevelFor, DataType} from "../utils/utils";


type NavigationProps = {
    data: DataType[],
    onClick: (name: string,
              data: DataType[]) => void
}
const Navigation: FC<NavigationProps> = ({data, onClick}) => {
    const [showLevel2, setShowLevel2] = useState<string | null>(null);
    const [showLevel3, setShowLevel3] = useState<string | null>(null);

    const handleLevel1Click = (key: string) => (event: any) => {
        event.preventDefault();
        console.log('2>> ', showLevel2, key)
        setShowLevel2(key);
        // setShowLevel2(showLevel2 === key && showLevel3 ? null : key);
    }

    const handleLevel2Click = (key: string) => (event: any) => {
        event.preventDefault();
        console.log('3>> ', showLevel3, key)
        setShowLevel3(key);
        // setShowLevel3(showLevel3 === key ? null : key);

    }

    const renderMenuLevel3 = (data: DataType[]) => {
        const level3 = buildMenuLevelFor('BCAP3', data);
        // @ts-ignore
        const level3Entries = [...level3.keys()].map((key, index) => {
            // @ts-ignore
            return <div key={index} className='mb-1' onClick={() => onClick(key, level3.get(key))}>
                <span className='menu-entry'><i className="arrow right mr-1"/>{key}</span>
            </div>;
        })
        return <div className='ml-3 mt-1'>
            {level3Entries}
        </div>
    }

    const renderMenuLevel2 = (data: DataType[]) => {
        const level2 = buildMenuLevelFor('BCAP2', data);
        // @ts-ignore
        const level2Entries = [...level2.keys()].map((key, index) => {
            // @ts-ignore
            return <div key={index} className='mb-1' onClick={handleLevel2Click(key)}>
                <span className='menu-entry'><i className="arrow down mr-1"/>{key}</span>
                {showLevel3 === key &&
                    // @ts-ignore
                    renderMenuLevel3(level2.get(key))}
            </div>;
        })
        return <div className='ml-3 mt-1'>
            {level2Entries}
        </div>
    }

    const renderMenuLevel1 = () => {
        const level1 = buildMenuLevelFor('BCAP1', data);
        // @ts-ignore
        return [...level1.keys()].map((key, index) => {
            // @ts-ignore
            return <div key={index} className='menu-entry-container mb-1' onClick={handleLevel1Click(key)}>
                <span className='menu-entry'><i className="arrow down mr-1"/>{key}</span>
                {showLevel2 === key &&
                    // @ts-ignore
                    renderMenuLevel2(level1.get(key))}
            </div>;
        })
    }

    return <div>
        <h2>Navigation</h2>
        <h4>Capabilities</h4>

        {renderMenuLevel1()}
    </div>

}

export default Navigation;