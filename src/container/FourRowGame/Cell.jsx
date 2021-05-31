import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Style from './cell.style';
import AvtarOne from '../../assests/imgs/avatar01.png';
import AvtarTwo from '../../assests/imgs/avatar02.png';

const cell = ({...props}) => {
    let { classes } = props;
    let color = null;
    if (props.value === 1) {
      color = ( <div className={classes.playerOne} >
        <img src={AvtarOne} alt={AvtarOne} style={{ width: "26px" }} />
    </div>)
    } else if (props.value === 2) {
      color = ( <div className={classes.playerTwo} >
        <img src={AvtarTwo} alt={AvtarTwo} style={{ width: "30px" }} />
    </div>)
    }
      
    return (
      <td>
        <div className={ classes.cellStyle } onClick={() => {props.play(props.columnIndex)}}>
          <div className={ classes.whiteCellStyle }>
            { color }
          </div>
        </div>
      </td>
    );
  };

  export default withStyles(Style)(cell);