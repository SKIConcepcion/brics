import React from 'react';
import { Table } from './Table';

export const RegistrationRequestTable = ({columns, filterDataChanged, filteredData, filteredDataRows, renderActions, currentPage, entriesPerPage}) => {
    if(filterDataChanged){
        return(
            <Table columns={columns} data={filteredDataRows} renderActions={renderActions} currentPage={currentPage} entriesPerPage={entriesPerPage} />
        );
    } else {
        return(
            <Table columns={columns} data={filteredData} renderActions={renderActions} currentPage={currentPage} entriesPerPage={entriesPerPage} /> 
        );
    }
}