import React from "react";
import { Box, Typography, Avatar, Button, Stack, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {ContentProps} from "../../pages/ArtistPanelPage";
import StyledTextField from "../global/StyledTextField";


const AccountContent: React.FC<ContentProps> = ({ theme }) => {
    return (
        <Box sx={{ paddingTop: '15px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', }}>
            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 700, marginBottom: 4 }}>
                Můj profil
            </Typography>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                <Avatar alt="User" src="/path-to-avatar.jpg" sx={{ width: 56, height: 56 }} />
                <Button startIcon={<EditIcon />} variant="outlined" sx={{ textTransform: 'none' }}>Upravit</Button>
                <Button startIcon={<DeleteIcon />} variant="outlined" color="error" sx={{ textTransform: 'none' }}>Smazat</Button>
            </Stack>

            {/* Profile Fields */}
            <Box sx={{ width: '50%', padding: '20px', borderRadius: '12px', boxShadow: 1, marginBottom: 2, backgroundColor: theme.palette.background.default }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                    <StyledTextField fullWidth label="Uživatelské jméno" variant="outlined" defaultValue="Alul___" InputProps={{ readOnly: true }} />
                </Stack>

                <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 3, alignSelf: 'center', color: theme.palette.text.primary, width: '50%' }}>
                    Chceš změnit username? <a href="#" style={{ color: theme.palette.primary.main }}>Kontaktuj nás!</a>
                </Typography>

                <StyledTextField
                    fullWidth
                    label="Řekni o sobě více!"
                    multiline
                    rows={4}
                    defaultValue="Ahoj všichni, jmenuji se Arthur, vystupuji pod pseudonymem Alul___; přijďte studovat na ČVUT FEL, protože tady se toho hodně naučíte!"
                    variant="outlined"
                />
            </Box>

            {/* Footer Buttons */}
            <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ width: '50%', paddingTop: '10px' }}>
                {/* Save and Cancel Buttons */}
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button variant="contained" sx={{ textTransform: 'none' }}>Uložení změn</Button>
                    <Button variant="outlined" sx={{ textTransform: 'none' }}>Zrušit</Button>
                </Box>
                {/* Delete Account Button */}
                <Button variant="contained" color="error" sx={{ textTransform: 'none', marginLeft: 'auto' }}>Smazat účet</Button>
            </Stack>

        </Box>
    );
};

export default AccountContent;