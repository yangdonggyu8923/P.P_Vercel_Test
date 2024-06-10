import { Link, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { UserColumn } from "../model/users-column";
import { PG } from "../../common/enums/PG";
import { deleteUserById } from "../service/user-service";
import { useDispatch } from "react-redux";

interface CellType{
    row : UserColumn
}

export default function UserColumns(): GridColDef[] {
    const dispatch = useDispatch()
    

    return [
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id',
            headerName: 'No.',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.id}</Typography>
            }
        ,
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'username',
            headerName: '아이디',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>
                <Link href={`${PG.USER}/update/${row.id}`} className="underline">{row.username}</Link>
            </Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'password',
            headerName: '비밀번호',
            renderCell: () => <>********</>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'name',
            headerName: '이름',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.name}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'phone',
            headerName: '전화번호',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.phone}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'delete',
            headerName: 'DELETE',
            renderCell: ({ row }: CellType) =><button
                    onClick={() => {
                        console.log("delete user id : {}", row.id)
                        dispatch(deleteUserById(row.id))
                        location.reload();
                    }}>DELETE</button>
        },
        // {
        //     flex: 0.04,
        //     minWidth: 30,
        //     sortable: false,
        //     field: 'job',
        //     headerName: '직업',
        //     renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.job}</Typography>
        // },
        // {
        //     flex: 0.04,
        //     minWidth: 30,
        //     sortable: false,
        //     field: 'regrDate',
        //     headerName: '작성일자',
        //     renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.regDate}</Typography>
        // },
        // {
        //     flex: 0.04,
        //     minWidth: 30,
        //     sortable: false,
        //     field: 'modDate',
        //     headerName: '수정일자',
        //     renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.modDate}</Typography>
        // }
    ]
}