import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

import ListItem from './ListItem.js';
import ModifyUrl from './ModifyUrl.js';

const styles = theme => ({
  list:{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      height:'calc(100vh - 106px)',
      'overflow-x':'hidden',
      'overflow-y':'auto',
      alignItems:'center',
      //'margin-bottom':'56px'
  }
});
class InfiniteScrollList extends Component {
  /*componentDidMount() {
    console.log("jo")
    window.addEventListener("scroll", this.handleOnScroll);
  }

  componentWillUnmount() {
    console.log("jo2")
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    console.log(scrollTop, scrollHeight, clientHeight)
    if (scrolledToBottom) {
        console.log("jo")
      this.props.onLoadMore();
    }
  };*/
  handleScroll = (e) => {
    const bottom = Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) <= 1 &&
                 Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) > 0;
    //console.log(e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight, Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight))
    if (bottom) {  this.props.onLoadMore(); }
  }
  render() {
    if (!this.props.listdata && this.props.loading) return <p>Loading....</p>;
    const data = this.props. listdata['restaurants'] || [];
    const { classes } = this.props;
    return (
      <div className={classes.list} onScroll={this.handleScroll}>
        {data.map(d => {
            d['smallphotoUrls'] = ModifyUrl.ModifyUrl(d['photoUrls'])
            return(
                <ListItem 
                    key={data.indexOf(d)}
                    tag={this.props.tag} 
                    handleNext={this.props.handleNext} 
                    restaurantinfo={d}
                    restaurantInfo={this.props.restaurantInfo}
                /> 
            )
        })}
      </div>
    );
  }
}

export default withStyles(styles)(InfiniteScrollList);