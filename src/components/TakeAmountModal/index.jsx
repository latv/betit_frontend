import React, { useState } from 'react';
import { Modal, message } from 'antd';
import Input from 'components/Input';
import APIClient from 'utils/apiClient';

const TakeMoneyModal = ({ setWalletAmount, setIsTakeMoneyModalOpen, visible }) => {
  const [takeMoneyAmount, setTakeMoneyAmount] = useState("");
  const [inputError, setInputError] = useState(null);

  const takeAmount = async () => {
    try {
      let response = await APIClient.request(
        '/api/wallet/withdraw-amount',
        { amount: parseFloat(takeMoneyAmount) },
        'POST'
      );

      setWalletAmount(response);
      setIsTakeMoneyModalOpen(false);
      setTakeMoneyAmount("");
      message.success("Transactation successful!");
    } catch (err) {
      const errorResponse = err.response;

      if (errorResponse.status === 422) {
        const amountErrors = errorResponse.data.errors.amount;
        setInputError(amountErrors.join(", "));
      } else {
        message.error("Transaction failed!");
      }
    }
  }

  return (
    <Modal
      title="Take money"
      visible={visible}
      onOk={() => takeAmount()}
      onCancel={() => {
        setIsTakeMoneyModalOpen(false);
        setTakeMoneyAmount("");
        setInputError(null);
      }}
      okText="Take money"
    >
      <Input
        error={inputError}
        placeholder="0.00"
        value={takeMoneyAmount}
        onChange={(el) => {
          const amount = el.target.value;
          const decimalPattern = /^(\d{1,8}(\.|,)\d{0,2}|\d{1,8})$/;

          if (decimalPattern.test(amount) || amount === "") {
            setTakeMoneyAmount(el.target.value);
            setInputError(null);
          } else {
            setInputError("field must contain valid money amount");
          }
        }}
      />
    </Modal>
  )
}

export default TakeMoneyModal;
