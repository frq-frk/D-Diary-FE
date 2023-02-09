import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TodayEntry from '../diary/TodayEntry';
import CreateIcon from '@mui/icons-material/Create';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import PastEntries from '../diary/PastEntries';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex', height: 500 }}
    >
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab icon={<CreateIcon />} label="T-Entry" {...a11yProps(0)} />
        <Tab icon={<AutoStoriesIcon />} label="Entries" {...a11yProps(1)} />
        <Tab icon={<ListAltIcon />} label="Todo" {...a11yProps(2)} />
        <Tab icon={<NoteAltIcon />} label="Memo" {...a11yProps(3)} />

      </Tabs>
      <TabPanel value={value} index={0}>
        <TodayEntry />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PastEntries />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Todo will be coming soon, please stay tunded, we are working to bring our best...
      </TabPanel>
      <TabPanel value={value} index={3}>
        Memo will be coming soon, please stay tunded, we are working to bring our best...
      </TabPanel>

    </Box>
  );
}
