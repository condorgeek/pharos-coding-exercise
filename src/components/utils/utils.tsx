// @ts-nocheck

export type DataType = {
    BCAP1: string,
    BCAP2: string,
    BCAP3: string,
    id: string,
    name: string,
    spend: number
}

export const buildMenuLevelFor = (levelKey: string, data: DataType[]) => {
    const level = new Map<string, DataType[]>();
    data.forEach(entry => {
        let caps = level.get(entry[levelKey]);
        if (caps) {
            caps.push(entry);
        } else {
            level.set(entry[levelKey], [entry])
        }
    })
    return new Map([...level.entries()].sort());
}