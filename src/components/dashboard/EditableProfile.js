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
                padding: 2,
                backgroundColor: "decoratory.main"
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
                <Typography variant="subtitle2" component="h6" my={3}>{`Profession : ${props.props.profession ? props.props.profession : "to be alive" }`}</Typography>
                <Typography variant="subtitle2" component="h6" my={3}>{`Bio : ${props.props.bio ? props.props.bio : "human being"}`}</Typography>
                <Typography variant="h6" component="h6">Goals</Typography>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{
                    backgroundColor: "decoratory.main"
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="weekly-content"
                        id="weekly-header"
                    >
                        <Typography>Weekly</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle2" component="h6" my={3}>{props.props.weekGoal ? props.props.weekGoal : "your weekly goal goes here"}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{
                    backgroundColor: "decoratory.main"
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="monthly-content"
                        id="monthly-header"
                    >
                        <Typography>Monthly</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle2" component="h6" my={3}>{`${props.props.monthGoal ? props.props.monthGoal : "your monthly goal goes here"}`}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{
                    backgroundColor: "decoratory.main"
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="shortTerm-content"
                        id="shortTerm-header"
                    >
                        <Typography>Short Term</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle2" component="h6" my={3}>{props.props.shortTermGoal ? props.props.shortTermGoal : "your short term goal goes here"}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{
                    backgroundColor: "decoratory.main"
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="longTerm-content"
                        id="longTerm-header"
                    >
                        <Typography>Long Term</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle2" component="h6" my={3}>{props.props.longTermGoal ? props.props.longTermGoal : "your long term goal goes here"}</Typography>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </Box>
    )
}

export default EditableProfile