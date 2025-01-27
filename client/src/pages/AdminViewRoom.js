import React from 'react';
import Sidebar from '../components/SideBar';
import { SearchBox } from '../components/SearchBox';
import SortFilter from '../components/SortFilter';

export default function RoomManagement() {
    return (
        <div>
            <SearchBox />
            <SortFilter/>
        </div>
    );
}
 