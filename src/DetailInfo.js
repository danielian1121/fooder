import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import LocationOn from '@material-ui/icons/LocationOn';
import NearMe from './image/icons8-near-me-filled-100.png';
import Comment from './Comment.js'
import DistanceFormat from './DistanceFormat.js'
import RatingStar from './RatingStar.js'
import TagsMapping from './TagsMapping.js'

const styles = theme => ({
  page:{
    display: 'flex',
    flexWrap: 'wrap',
    overflow:'auto',
    padding: '2px',
    height:'calc(100vh - 116px)',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit / 2,
    width:'calc(100vw - 12px)'
  },
  gridList: {
    'white-space': 'nowrap',
    'overflow-x': 'scroll',
    'text-align':'left',
  },
  img:{
    'border-radius':'4px',
    display: 'inline-block',
    height:'200px',
    width:'auto',
    margin:'0 2px'
  },
  detail:{
    padding:'10px 20px 5px 20px',
    width: 'calc(100vw - 40px)'
  },
  star:{
    height:'18px',
    width: '18px',
    'margin-bottom':'-2px'
  },
  chip: {
    justifyContent: 'center',
    width:'80px',
    height:'26px',
    margin:'5px 10px 5px 0px'
  },
  icon:{
    width:'16px',
    height:'16px'
  },

});

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#FFF350',
        main: '#FFF350' }, 
      secondary: { main: '#FF0000' }, 
      Inherit:'#263238'
    },
  });

class RestaurantDetail extends Component{
    
    constructor(props){
        super(props)
    }

    state = {
      time_click:0,
    };

    time_clicked = ()=>{
      this.setState(state => {
        time_click: state.time_click = state.time_click==1?0:1
      })
      if(this.state.time_click == 1){
        document.getElementById("openhour").innerHTML=""
      }
      else if(this.state.time_click == 0){
        document.getElementById("openhour").innerHTML=this.props.info['openingHours'][0]+"<br>"
            +this.props.info['openingHours'][1]+"<br>"
            +this.props.info['openingHours'][2]+"<br>"
            +this.props.info['openingHours'][3]+"<br>"
            +this.props.info['openingHours'][4]+"<br>"
            +this.props.info['openingHours'][5]+"<br>"
            +this.props.info['openingHours'][6]+"<br>"
      }
    }

    render(){
        const { classes } = this.props;
        const tag = this.props.tag;
        const info = this.props.info;

        return(
            <MuiThemeProvider theme={theme}>
                <div  className={classes.page}>
                    <div className={classes.root}>
                        <div className={classes.gridList}>
                            {info["photoUrls"].map(tile => (
                                <img className={classes.img} src={tile} key={info["photoUrls"].indexOf(tile)}/>
                            ))}
                        </div>
                    </div>
                    <div className={classes.detail}>
                        <Grid container>
                            <Grid item xs={8}>
                            <Typography align="left" style={{fontWeight:'700'}}>{info['name']}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                            <Typography align="right" style={{overflow: 'hidden'}}>
                                {DistanceFormat.DistanceFormat(info['distance'])}
                            </Typography>
                            </Grid>
                        </Grid>
                        <div align="left">
                            <div align="left" style={{marginLeft:'-2px',width:'100px', display:'inline-block'}}> 
                                <RatingStar rating={info['rating']} />
                            </div>
                            <Typography align="left" style={{display:'inline-block'}}>{info['rating']}</Typography>
                        </div>

                        <Typography align="left">{'$ '+info['priceLevel']}</Typography>
                        <div style={{justifyContent:"flex-start", textAlign: 'left'}}>
                            {TagsMapping.maptags(this.props.tag,info['tags']).map(tag =>(
                                <Chip 
                                    className={classes.chip}
                                    key={this.props.tag.indexOf(tag)}
                                    label={tag}
                                    color="primary"
                                />
                            ))}
                        </div>
                        <Grid container>
                            <Grid item xs={1} />
                            <Grid item xs={11} >
                                <Typography align="left" style={{lineHeight:'25px' ,marginTop:'5px'}}
                                    color={info['isOpenNow']==true?("#000000"):("secondary")}
                                    className={classes.opentime}
                                    onClick={()=>{this.time_clicked()}}
                                >
                                    {info['isOpenNow']==true?("營業中 查看營業時間⌵"):("非營業時間 查看營業時間⌵")}
                                </Typography>
                                <Typography id="openhour" align="left" style={{lineHeight:'25px'}}> </Typography>
                            </Grid>
                        </Grid>

                        <Grid container style={{lineHeight:'25px' ,marginTop:'5px'}}>
                            <Grid item xs={1} style={{textAlign:'right'}}>
                                <LocationOn className={classes.icon}/>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography align="left">{info['location']['address']}</Typography>
                                <Typography align="left">{"電話 : "+info['phoneNumber']}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="center">導航</Typography>
                                <a href={"https://www.google.com/maps/search/?api=1&query="+info['location']['lat']+","+info['location']['long']+"&query_place_id="+info['placeId']}>
                                    <img src={NearMe} style={{height:'28px'}}/>
                                </a>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{justifyContent:"flex-start", marginTop:"8px"}}>
                        {info['reviews'].map(review =>(
                            <Comment review={review} key={info['reviews'].indexOf(review)} />
                        ))}
                        <Typography align="center" style={{paddingTop:"8px"}}>僅顯示 Google Maps 5則最佳評論</Typography>
                    </div>
                </div>    
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(RestaurantDetail);