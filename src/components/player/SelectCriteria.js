import { useState } from 'react';
import Style from './SpellWords.css';
import CardSelect from '../ui/CardSelect';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FindWords from '../tabs/FindWords';
import Practise from '../tabs/Practise';
import AudioTest from '../tabs/AudioTest';


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index + 1}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index + 1 && (
        <Box sx={{ p: 2.9, color: '#e5e5e5', pb: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}


const SelectCriteria = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <section className='options'>
      <CardSelect>

        <Box sx={{ borderBottom: 1, borderColor: '#e5e5e5' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="i"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#ffffff"
              }
            }}
            aria-label="tabs"
          >
            <Tab value={1} label="Find Words" sx={{ width: 130 }} />
            <Tab value={2} label="Practice" sx={{ width: 130 }} />
            <Tab value={3} label="Audio Test" sx={{ width: 130 }} />
          </Tabs>
        </Box>
        
        <TabPanel value={value} index={0}>
          <FindWords />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Practise />
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <AudioTest />
        </TabPanel>
        
      </CardSelect>
    </section>
  );
}

export default SelectCriteria;
