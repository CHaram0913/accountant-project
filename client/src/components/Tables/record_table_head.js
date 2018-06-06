import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import { TableHead, TableRow, TableCell, Checkbox, Tooltip, TableSortLabel } from 'material-ui';
import { RecordTableHeadStyle } from './../../styles';

import { columnData } from './../../resources';

class RecordTableHead extends Component {
    createSortHandler = property => e => {
        this.props.onSortRequest(e, property);
    }

    renderTableHead(data, order, orderBy) {
        let tableHead = [];
        for (let i = 0; i < data.length; i++) {
            if (i < data.length - 1) {
                tableHead.push(
                    <TableCell
                        key={data[i].id}
                        numeric={data[i].numeric}
                        padding={data[i].disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === data[i].id ? order : false}
                    >
                        <Tooltip
                            title={`Sort by ${data[i].label}`}
                            placement={data[i].numeric ? 'bottom-end': 'bottom-start'}
                            enterDelay={300}
                        >
                            <TableSortLabel
                                active={orderBy === data[i].id}
                                direction={order}
                                onClick={this.createSortHandler(data[i].id)}
                            >
                                {data[i].label}
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                )
            } else {
                tableHead.push(
                    <TableCell
                        key={data[i].id}
                        numeric={data[i].numeric}
                        padding={data[i].disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === data[i].id ? order : false}
                    >
                        {data[i].label}
                    </TableCell>
                )
            }
        }
        return tableHead;
    }

    render() {
        const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return(
            <TableHead className={classes.root}>
                <TableRow>
                    <TableCell padding='checkbox' >
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {this.renderTableHead(columnData, order, orderBy)}
                </TableRow>
            </TableHead>
        )
    }
}

export default withStyles (RecordTableHeadStyle)(RecordTableHead);