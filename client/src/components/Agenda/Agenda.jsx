import React from "react"
import "./Agenda.css"
import { ReactAgenda } from 'react-agenda';
 
require('moment/locale/fr.js');

const Agenda = ({ notes }) => {
    let colors = {
        'green': "#00e600"
    }

    const convertDate = (value) => {
        let rightNow = new Date(value)
        let res = rightNow.toISOString().slice(0,10).replace(/-/g,"")
        let dateString = res
        let year = dateString.substring(0,4)
        let month = dateString.substring(4,6)
        let day = dateString.substring(6,8)
        let date = new Date(year, month-1, day)
        return new Date(date)
    }

    const convertHours = (value) => {
        let text = value
        let tmp = String(text).match(/^(\d+):(\d+)$/)
        let hours = parseInt(tmp[1], 10)
        // let minutes = parseInt(tmp[2], 10)
        return hours
    }

    const convertMinutes = (value) => {
        let text = value
        let tmp = String(text).match(/^(\d+):(\d+)$/)
        // let hours = parseInt(tmp[1], 10)
        let minutes = parseInt(tmp[2], 10)
        return minutes
    }

    let now = new Date();
    
    const elems = notes.map(({_id, name, dateFrom, dateTo, timeFrom, timeTo}) => {
        const yearFrom = convertDate(dateFrom)
        const monthFrom = convertDate(dateFrom)
        const dayFrom = convertDate(dateFrom)

        const yearTo = convertDate(dateTo)
        const monthTo = convertDate(dateTo)
        const dayTo = convertDate(dateTo)

        const hoursFrom = convertHours(timeFrom)
        const hoursTo = convertHours(timeTo)

        const minutesFrom = convertMinutes(timeFrom)
        const minutesTo = convertMinutes(timeTo)

        return {
                _id           : _id,
                name          : name,
                startDateTime : new Date(yearFrom.getFullYear(), monthFrom.getMonth(), dayFrom.getDate(), hoursFrom, minutesFrom),
                endDateTime   : new Date(yearTo.getFullYear(), monthTo.getMonth(), dayTo.getDate(), hoursTo+1, minutesTo),
                classes       : 'green'
            }
    })

    console.log(elems)

    let state = {
        items: elems,
        selected: [],
        cellHeight: 20,
        locale: "en",
        rowsPerHour: 2,
        numberOfDays: 1,
        startDate: new Date()
    }

    const handleCellSelection = (item) => {
        console.log('handleCellSelection',item)
    }
    const handleItemEdit = (item) => {
        console.log('handleItemEdit', item)
    }
    const handleRangeSelection = (item) => {
        console.log('handleRangeSelection', item)
    }

    return(
        <div className="block">
            <ReactAgenda
                minDate={now}
                maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
                disablePrevButton={false}
                startDate={state.startDate}
                cellHeight={state.cellHeight}
                locale={state.locale}
                items={state.items}
                numberOfDays={state.numberOfDays}
                rowsPerHour={state.rowsPerHour}
                itemColors={colors}
                autoScale={false}
                fixedHeader={true}
                onItemEdit={() => handleItemEdit()}
                onCellSelect={() => handleCellSelection()}
                onRangeSelection={() => handleRangeSelection()} />
        </div>
    )
}

export default Agenda