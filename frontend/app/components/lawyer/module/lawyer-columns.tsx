import { Link, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { PG } from "../../common/enums/PG";
import { LawyerColumn } from "../model/lawyers-column";
import { deleteLawyerById } from "../service/lawyer-service";
import { useDispatch } from "react-redux";

interface CellType {
    row: LawyerColumn
}

export default function LawyerColumns(): GridColDef[] {
    const dispatch = useDispatch()

    return [
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id',
            headerName: 'No.',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.id}</Typography>
        }
        ,
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'username',
            headerName: '아이디',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>
                <Link href={`${PG.LAWYER}/update/${row.id}`} className="underline">{row.username}</Link>
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
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.name}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'phone',
            headerName: '전화번호',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.phone}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'law',
            headerName: '담당분야',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.law}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'lawyerNo',
            headerName: '자격번호',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.lawyerNo}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'office',
            headerName: '사무소',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.office}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'address',
            headerName: '주소',
            renderCell: ({ row }: CellType) => <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>{row.address}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'delete',
            headerName: 'DELETE',
            renderCell: ({ row }: CellType) =>(
            <div className="flex items-center justify-center">
            <button 
                    onClick={() => {
                        console.log("delete lawyer id : {}", row.id)
                        dispatch(deleteLawyerById(row.id))
                        location.reload();
                    }}>DELETE</button>
                    </div>)
        },

    ]
}