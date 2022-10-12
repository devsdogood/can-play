import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid"
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import * as _ from "lodash";

type TableProps = {
    columns: GridColDef[];
    rows: any[];
    model: Omit<keyof PrismaClient, "$on" | "$connect" | "$disconnect" | "$use" | "$transaction" | "$runCommandRaw">
}
const Table: React.FC<TableProps> = ({ columns, rows, model }) => {
    const saveEdits = (newRow: any) => {
        const id = newRow.id;
        
        // remove uneditable fields from update
        const filtered = _.pickBy(newRow, (_, k) => (
          columns.find(r => r.field === k)?.editable
        ));
    
        axios.post(`/api/${model}`, {
          id,
          data: filtered,
        });
    
        return newRow;
    }
    
    return (
        <Box sx={{ height: 400 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                editMode="row"
                processRowUpdate={saveEdits}
                components={{
                Toolbar: GridToolbarQuickFilter,
                }}
                componentsProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                },
                }}
            />
        </Box>
    )
}

export default Table;
