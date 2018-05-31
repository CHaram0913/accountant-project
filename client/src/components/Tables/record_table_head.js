import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import { TableHead, TableRow, TableCell, Checkbox, Tooltip, TableSortLabel } from 'material-ui';
import { RecordTableHeadStyle } from './../../styles';

import { columnData } from './../../resources';

class RecordTableHead extends Component {
    render() {
        const { classes } = this.props;

        return(
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Checkbox
                            // indeterminate={numSelected > 0 && numSelected < rowCount}
                            // checked={numSelected === rowCount}
                            // onCHange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                //sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title='Sort'
                                    placement={column.numeric ? 'bottom-end': 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        //active={orderBy === column.id}
                                        //direction={order}
                                        //onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        )
                    }, this)}
                </TableRow>
            </TableHead>
        )
    }
}

export default withStyles (RecordTableHeadStyle)(RecordTableHead);