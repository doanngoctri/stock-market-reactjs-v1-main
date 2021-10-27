import React, { useEffect, useState } from "react";
import apiCaller from "../../../utils/apiCaller";
import Item from "./Item";
import List from "./List";
import Modal from './Form';
import {
  openNotificationSuccess,
  openNotificationError,
} from "components/Notification";

export default function ManagementExchanges() {
  const [list, setList] = useState([]);
  const [openModal, setOpenMoal] = useState(false);
  const [value, setValue] = useState({});

  useEffect(() => {
    FetchList();
  }, []);

  const FetchList = async () => {
    const requestUrl = `quydinhsan/hsx`;
    const res = await apiCaller(requestUrl, "GET", null);
    setList(res.data);
  };
  const onCloseModal = () => {
    setValue({});
    setOpenMoal(false);
  };
  const onClickUpdate = async (value) => {
    try {
      const requestUrl = `quydinhsan`;
      const res = await apiCaller(requestUrl, "post", {
        maQd: value.maQd,
        giaTri: value.giaTri,
      });
      if (res.status === 200) {
        openNotificationSuccess("Thành công", "Cập nhât thành công", 3);
        onCloseModal();
        FetchList();
      } else {
        openNotificationError("Thất bại", "Cập nhật thất bại", 3);
      }
    } catch (err) {
      console.log(err);
      openNotificationError("Thất bại", "Cập nhật thất bại", 3);
    }
  };
  const showList = () => {
    let result = null;
    if (list.length > 0) {
      result = list.map((value, index) => {
        return (
          <Item
            key={index}
            index={index}
            value={value}
            setOpenMoal={setOpenMoal}
            setValue={setValue}
          />
        );
      });
    }
    return result;
  };
  console.log(18, list);
  return (
    <>
      <List>{showList()}</List>
      {openModal ? (
        <Modal
          value={value}
          isVisible={openModal}
          onCloseModal={onCloseModal}
          onClickUpdate={onClickUpdate}
        />
      ) : null}
    </>
  );
}
