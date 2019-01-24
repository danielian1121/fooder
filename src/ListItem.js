import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import DistanceFormat from './DistanceFormat.js'
import RatingStar from './RatingStar.js'
import TagsMapping from './TagsMapping.js'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit / 2,
    width:'100vw'
  },
  gridList: {
    'white-space': 'nowrap',
    'overflow-x': 'scroll',
    'text-align':'left',
  },
  detail:{
      padding:'0 5px',
      width:'calc(100vw - 10px)',
      'margin-bottom':'10px',
  },
  content:{
      padding:'0px 0 6px 13px'
  },
  img:{
      'border-radius':'4px',
      display: 'inline-block',
      height:'104px',
      width:'auto',
      margin:'0 2px'
  },
  chip: {
    justifyContent: 'center',
    width:'56px',
    height:'17px',
    'font-size':'10px',
    margin:'5px 10px 5px 0px',
    backgroundColor:'#FFF350',
    color:'#263238'
  },
});

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#FFF350',
        main: '#FFF350' }, 
      secondary: { main: '#CC0000' }, 
    },
  });

class ListItem extends Component{
    
    constructor(props){
        super(props)
    }

    next = (handleNext,props,restaurantInfo) =>{
        handleNext("");
        restaurantInfo(props)
    }

    render(){
        const { classes } = this.props;
        const info = this.props.restaurantinfo;
        var handleNext =   this.props.handleNext;
        var restaurantInfo = this.props.restaurantInfo;
        return(
            <div>
                <div className={classes.root} onClick={() => this.next(handleNext,info,restaurantInfo)}>
                <div className={classes.gridList}>
                    {this.props.restaurantinfo["smallphotoUrls"].map(tile => (
                        <img className={classes.img} src={tile} key={this.props.restaurantinfo["smallphotoUrls"].indexOf(tile)}/>
                    ))}
                </div>
                </div>
                <div onClick={() => this.next(handleNext,info,restaurantInfo)} className={classes.detail}>
                    <div className={classes.content} >
                        <Grid container>
                            <Grid item xs={9} style={{height:'20px'}}>
                                <Typography align="left" style={{fontWeight:'700'}}>{info['name']}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography align="right" style={{overflow: 'hidden'}}>
                                    {DistanceFormat.DistanceFormat(info['distance'])}
                                </Typography>
                            </Grid>
                        </Grid>
                        <div align="left" style={{paddingLeft:'4px'}}>
                            <Typography align="left" style={{display:'inline-block',paddingRight:'4px', fontSize:'12px'}}>
                                {info['rating'].toFixed(1)}
                            </Typography>
                            <div align="left" style={{width:'87px', display:'inline-block'}}> 
                                <RatingStar rating={info['rating']} />
                            </div>
                            <Typography align="left" style={{display:'inline-block', fontSize:'12px'}}>{'$ '+info['priceLevel']}</Typography>
                        </div>
                        <div style={{justifyContent:"flex-start", textAlign: 'left'}}>
                            {TagsMapping.sametags(this.props.tag,info['tags']).map(tag =>(
                                    <Chip 
                                        className={classes.chip}
                                        key={this.props.tag.indexOf(tag)}
                                        label={tag}
                                        color="primary"
                                    />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(ListItem);
