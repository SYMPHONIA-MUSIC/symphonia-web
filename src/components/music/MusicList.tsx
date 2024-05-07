import React from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import MusicItem, {MusicShortUserInfo} from './MusicItem';

interface MusicListProps {
    showHeaders?: boolean;
    dataToShow: MusicShortUserInfo[];
}

const MusicList: React.FC<MusicListProps> = ({ showHeaders = true, dataToShow }) => {
    const handlePlay = (id: string) => {
        console.log(`Playing track with ID: ${id}`);
    };

    const handleLike = (id: string) => {
        console.log(`Liking track with ID: ${id}`);
    };

    const handleOpenInfo = (id: string) => {
        console.log(`Opening info for track with ID: ${id}`);
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table stickyHeader aria-label="music tracks">
                {showHeaders && (
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '5%' }}>ID</TableCell>
                            <TableCell style={{ width: '25%' }}>Název</TableCell>
                            <TableCell style={{ width: '20%' }}>Hodnocení</TableCell>
                            <TableCell style={{ width: '20%' }}>Poslechnuto</TableCell>
                            <TableCell style={{ width: '10%' }}>Délka</TableCell>
                            <TableCell style={{ width: '20%' }}></TableCell>
                        </TableRow>
                    </TableHead>
                )}
                <TableBody>
                    {dataToShow.map((music, index) => (
                        <MusicItem
                            key={music.id}
                            music={music}
                            position={index + 1}
                            onPlay={handlePlay}
                            onLike={handleLike}
                            onOpenInfo={handleOpenInfo}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MusicList;
