import React from 'react';
import {Button as AntButton} from 'antd';

import './style.scss';
const Button =(props) =>{

    return(<AntButton {...props} className={"primary-button "+ props.className} />
    )
}
export default Button;