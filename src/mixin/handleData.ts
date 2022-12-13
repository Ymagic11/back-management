import { getuserInfo, getBusInfo, getfoodInfo } from '../server/Interface'

let data = {
    limit: 10,
    offset: 0
}

let tableData = []

let total = 0

export async function getUserList(currentpage: number,flag?: number) {
    data.offset = (currentpage - 1) * 10
    if (flag === 1) {
        const res = await getuserInfo(data) as any[]
        tableData = res[0]
        total = res[1][0].total
        return { tableData, total }
    } else if(flag === 2) {
        const res = await getBusInfo(data) as any[]
        tableData = res[0]
        total = res[1][0].total
        return { tableData, total }
    } else {
        const res = await getfoodInfo(data) as any[]
        tableData = res[0]
        total = res[1][0].total
        return { tableData, total }
    }
}

