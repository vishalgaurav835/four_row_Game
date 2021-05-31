import React from 'react';
import { TextField, InputLabel, Avatar } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import SimpleInputBoxStyle from './SimpleInputBox.style';


const InputBox = ({ ...props }) => {
    let { classes, value, label, imagePath, ImgOfDifferentAvatar,playerStyleName } = props;
    return (
        <div style={{ margin: "6% 0%" }}>
            <InputLabel className={ classes.wrapperStyleForLabelText }>
                {label}
        </InputLabel>
            <TextField id="standard-name"  value={value} onChange={ props.handleChange } className={classes.wrapperDivForInputCls}
                InputProps={{
                    className: classes.input,
                    disableUnderline: true,
                    endAdornment: (
                        <div className={classes[playerStyleName]}>
                              <img src={imagePath} alt={imagePath} className={ ImgOfDifferentAvatar }/>
                        </div>
                    ),
                }} />
        </div>
    )
};

export default withStyles(SimpleInputBoxStyle)(InputBox);