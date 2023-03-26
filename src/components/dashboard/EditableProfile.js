import React from 'react'
import { Grid, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { Box } from '@mui/system'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function EditableProfile(props) {

    const navigate = useNavigate();

    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box>
            <Paper elevation={3} sx={{
                margin: 1,
                padding: 2
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse'
                }}>
                    <ModeEditIcon onClick={() => navigate("/updateprofile")} sx={{
                        '&:hover': {
                            cursor: 'pointer'
                        }
                    }} />
                </Box>
                <Typography variant="subtitle2" component="h6" my={3}>{`Profession : ${props.props.profession}`}</Typography>
                <Typography variant="subtitle2" component="h6" my={3}>{`Bio : ${props.props.bio}`}</Typography>
                <Typography variant="h6" component="h6">Goals</Typography>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="weekly-content"
                        id="weekly-header"
                    >
                        <Typography>Weekly</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle2" component="h6" my={3}>{props.props.weekGoal}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="monthly-content"
                        id="monthly-header"
                    >
                        <Typography>Monthly</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle2" component="h6" my={3}>{`${props.props.monthGoal}`}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="shortTerm-content"
                        id="shortTerm-header"
                    >
                        <Typography>Short Term</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle2" component="h6" my={3}>{props.props.shortTermGoal}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="longTerm-content"
                        id="longTerm-header"
                    >
                        <Typography>Long Term</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle2" component="h6" my={3}>{props.props.longTermGoal}</Typography>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </Box>
    )
}

export default EditableProfile