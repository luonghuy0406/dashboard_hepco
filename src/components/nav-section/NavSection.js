import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, styled,
  AccordionSummary,
  Drawer,
  IconButton,
  Typography } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
      border: `none`
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "0px 16px"
}));

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info, child } = item;
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
      <Accordion sx={{background: 'unset'}} key={path+"nav"} expanded={expanded === `pannel${path}`} onChange={handleChange(`pannel${path}`)}>
        <AccordionSummary sx={{padding:'10px 0'}}  expandIcon={child?.length > 0 ? <ExpandMoreIcon /> : <></>} aria-controls={`pannel${path}d-content`} id={`pannel${path}d-header`}>
          <StyledNavItem
              component={RouterLink}
              to={path}
              sx={{
                '&.active': {
                  color: 'text.primary',
                  bgcolor: 'action.selected',
                  fontWeight: 'fontWeightBold',
                },
              }}
            >
              <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

              <ListItemText disableTypography primary={title} />

          </StyledNavItem>
        </AccordionSummary>
        <AccordionDetails>
            {
              child?.map((ch)=>{
                return (
                  <StyledNavItem
                    component={RouterLink}
                    to={`${path}${ch.path}`}
                    sx={{
                      '&.active': {
                        color: 'text.primary',
                        bgcolor: 'action.selected',
                        fontWeight: 'fontWeightBold',
                      },
                    }}
                  >
                    {/* <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon> */}
      
                    <ListItemText disableTypography primary={ch.title} />
      
                </StyledNavItem>
                )
              })
            }
        </AccordionDetails>
      </Accordion>
  );
}
