import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import APIClient from 'utils/apiClient';
import numberFormatter from 'utils/numberFormatter';
import './styles.scss';
import { Spin, Button } from 'antd';
// import { Chart } from 'react-charts';
import { Chart } from "react-google-charts";
// import Chart from "chart.js";
import moment from 'moment'

const HistoryOfWallet = () => {
  const [historyOfWallet, setWallletAmount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getWalletAmount = async () => {
      let response = await APIClient.request(
        '/api/wallet/get-wallet-actions',
        {},
        'GET'
      );



      console.log(response);
      var dataSet = [];
      for (var i = 0; i < response.length; i++) {
        var a = parseInt(response[i]['remaining']);
        dataSet.push([moment(response[i]['updated_at']).format('dddd, h:mm:ss'), a]);

        // [[response[i]['remaining']],[i]];



      }

      dataSet.reverse();
      dataSet.unshift(["Date", "Amount"]);
      // console.log(data);
      setWallletAmount(dataSet);
      setIsLoading(false);


    };

    getWalletAmount();

  }, []);



  return (
    <Spin
      spinning={isLoading}
    >
      <div className='chart'>
        <Chart
          chartType="Line"
          loader={<div />}
          data={historyOfWallet}
          width="100%"
          height="400px"
          // legendToggle
          options={{
            title: 'Wallet amount',
            hAxis: { title: 'Date' },
            vAxis: { title: 'Amount' },
            legend: 'none',
            animation: {
              startup: true,
              easing: 'linear',
              duration: 3000,
            },
            enableInteractivity: false,
          }}
        />
      </div>

    </Spin>

  );


};

export default HistoryOfWallet;
