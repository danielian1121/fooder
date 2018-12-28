import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
//import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Star from '@material-ui/icons/Star';
import StarHalf from '@material-ui/icons/StarHalf';
import StarBorder from '@material-ui/icons/StarBorder';

import ModifyUrl from './ModifyUrl.js'
import DistanceFormat from './DistanceFormat.js'

const styles = theme => ({
  root: {
    //display: 'flex',
   // flexWrap: 'wrap',
    //justifyContent: 'space-around',
    //overflow: 'auto',
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
      'line-height':'24px',
      padding:'0 5px',
      width:'calc(100vw - 10px)',
  },
  content:{
      padding:'0px 13px 6px 13px'
  },
  star:{
      height:'18px',
      width: '18px',
  },
  img:{
      'border-radius':'4px',
      display: 'inline-block',
      height:'104px',
      width:'auto',
      margin:'0 2px'
  }
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

    next = (handleNext,restaurantDetail,props) =>{
        handleNext("");
        restaurantDetail(props);
    }
    generateStar = (rating) =>{
        const { classes } = this.props;
        if(rating>=1){
            return <Star  style={{'margin-bottom':'-3px'}}className={classes.star} color="secondary"/>
        }
        else if(rating>0){
          if(rating<=0.3){
            return <StarBorder  style={{'margin-bottom':'-3px'}}className={classes.star} color="secondary"/>
          }
          else if(rating<=0.7){
            return <StarHalf  style={{'margin-bottom':'-3px'}}className={classes.star} color="secondary"/>
          }
          else{
            return <Star  style={{'margin-bottom':'-3px'}}className={classes.star} color="secondary"/>
          }
        }
        else if(rating<=0){
            return <StarBorder  style={{'margin-bottom':'-3px'}}className={classes.star} color="secondary"/>
        }
    }
    maptags = (querytag, storetag) =>{
        var temp = [];
        for(var i=0;i<querytag.length;i++){
            for(var j=0;j<storetag.length;j++){
                if(querytag[i] == storetag[j]['id']){
                    temp.push(storetag[j]['text'])
                }
            }
        }
        return temp
    }
    
    render(){
        const { classes } = this.props;
        const info = this.props.restaurantinfo;
        var handleNext =   this.props.handleNext;
        var restaurantDetail =   this.props.restaurantDetail;

        return(
            <div>
                <div className={classes.root}>
                <div className={classes.gridList}>
                    {this.props.restaurantinfo["smallphotoUrls"].map(tile => (
                        <img className={classes.img} src={tile} key={this.props.restaurantinfo["smallphotoUrls"].indexOf(tile)}/>
                    ))}
                </div>
                </div>
                <div onClick={() => this.next(handleNext,restaurantDetail,info)} className={classes.detail}>
                    <div className={classes.content}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography align="left">{info['name']}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="right" style={{overflow: 'hidden'}}>
                                    {DistanceFormat.DistanceFormat(info['distance'])}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography align="left">
                        <Typography align="left" style={{width:'100px', display:'inline-block'}}> {this.generateStar(info['rating'])}
                            {this.generateStar(info['rating']-1)}
                            {this.generateStar(info['rating']-2)}
                            {this.generateStar(info['rating']-3)}
                            {this.generateStar(info['rating']-4)}</Typography>
                        <Typography align="left" style={{display:'inline-block'}}>{info['reviewCount'] + "個評語"}</Typography>
                        </Typography>

                        <Typography align="left">{'$ '+info['priceLevel']}</Typography>
                        <Typography align="left">{this.maptags(this.props.tag,info["tags"]).map(tag =>(tag + " "))}</Typography>
                    </div>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(ListItem);
